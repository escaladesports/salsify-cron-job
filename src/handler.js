require('envdotjs').load();
import fetch from 'isomorphic-fetch';
import middy from 'middy';
import { jsonBodyParser, httpErrorHandler, cors } from 'middy/middlewares';

import { connectToDatabase } from '../utils/db';
import Sheet from '../models/Sheet';
import config from '../utils/config';

module.exports.salsifyCron = middy(async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let sheetId;
  const options = {
    url: `https://app.salsify.com/api/orgs/${
      process.env.SALSIFY_ORG_ID
    }/export_runs`,
    headers: {
      Authorization: `Bearer ${process.env.SALSIFY_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  await connectToDatabase();

  const storedData = await Sheet.find({});
  if (
    storedData[0] &&
    storedData[0].status === 'completed' &&
    storedData[0].url !== null
  ) {
    console.log(
      'There is already a completed sheet in the DB: \n' +
        `Sheet ID: ${storedData[0].sheetId}, \nSheet status: ${
          storedData[0].status
        }, \nSheet url: ${storedData[0].url}`
    );
    await fetch(
      'https://api.netlify.com/build_hooks/5afaedde3672df6aad36f62b',
      {
        method: 'POST'
      }
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
  }
  if (resWithId.status === 'completed') {
    console.log('completed cron job');
    await Sheet.findByIdAndUpdate(
      storedData[0],
      { status: resWithId.status, url: resWithId.url },
      { new: true }
    );
  }
})
  .use(cors())
  .use(jsonBodyParser())
  .use(httpErrorHandler());
