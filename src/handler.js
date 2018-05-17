require('envdotjs').load();
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import middy from 'middy';
import { jsonBodyParser, httpErrorHandler, cors } from 'middy/middlewares';

import { connectToDatabase } from '../utils/db';
import Sheet from '../models/Sheet';
import config from '../utils/config';

module.exports.salsifyCron = middy(async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let sheetId;
  const options = {
    url: `https://app.salsify.com/api/orgs/s-9c2a072b-2f59-495e-b089-121deba82448/export_runs`,
    headers: {
      Authorization: `Bearer f2653e0a682e8f524222533233bad7c54a0f5377d3920ddd302353bdb3652f42`,
      'Content-Type': 'application/json'
    }
  };
  await connectToDatabase();

  const storedData = await Sheet.find({});
  if (
    storedData.length > 0 &&
    storedData[0] &&
    storedData[0].status === 'completed' &&
    storedData[0].url !== null
  ) {
    console.log('Trigger WebHook');
    await axios.post(
      'https://api.netlify.com/build_hooks/5afd9ca03672df1c2a63961a'
    );
    process.exit(0);
    return;
  }
  if (storedData[0]) {
    sheetId = storedData[0].sheetId;
  }
  if (storedData.length === 0) {
    const res = await fetch(options.url, {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify(config)
    }).then(res => res.json());
    if (res.id && res.status) {
      await Sheet.create({
        sheetId: res.id,
        url: null,
        status: res.status
      });
      sheetId = res.id;
    } else {
      console.log(res);
      process.exit(1);
    }
  }

  const resWithId = await fetch(`${options.url}/${sheetId}`, {
    method: 'GET',
    headers: options.headers
  }).then(res => res.json());

  if (resWithId.status === 'running') {
    console.log('running cron job');
    console.log(resWithId.estimated_time_remaining);
    process.exit(0);
  }
  if (resWithId.status === 'completed') {
    console.log('completed cron job');
    await Sheet.findByIdAndUpdate(
      storedData[0],
      { status: resWithId.status, url: resWithId.url },
      { new: true }
    );
    if (resWithId.status === 'completed' && resWithId.url !== null) {
      console.log('Trigger WebHook');
      await axios.post(
        'https://api.netlify.com/build_hooks/5afd9ca03672df1c2a63961a'
      );
      process.exit(0);
      return;
    }
    process.exit(0);
  }
})
  .use(cors())
  .use(jsonBodyParser())
  .use(httpErrorHandler());
