require('envdotjs').load();
const fetch = require('isomorphic-fetch');
const middy = require('middy');
const { jsonBodyParser, httpErrorHandler, cors } = require('middy/middlewares');

const connectToDatabase = require('../utils/db');
const Sheet = require('../models/Sheet');

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
  await connectToDataBase();

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
      body: JSON.stringify(require('../utils/config.json'))
    }).then(res => res.json());

    await Sheet.create({
      sheetId: res.id,
      url: null,
      status: res.status
    });
    sheetId = res.id;
  }

  const resWithId = await fetch(`${options.url}/${sheetId}`, {
    method: 'GET',
    headers: options.headers
  }).then(res => res.json());

  if (resWithId.status === 'completed') {
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
