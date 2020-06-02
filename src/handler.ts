import { AzureFunction } from "@azure/functions";
// 'use strict';

// module.exports.cron = function(context, req) {
export const cron: AzureFunction = (context, timerObj) => {
  context.log('function context: ', context)
  context.log('function timer: ', timerObj)
  context.log(`Timer ran at ${new Date().toISOString()}`);
  context.done();
};

// module.exports.hello = async function(context, req) {
export const hello: AzureFunction = async (context, req) => {
  console.log("context", JSON.stringify(context));
  console.log("req", JSON.stringify(req));

  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Hello ' + (req.query.name || req.body.name),
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
    }
  }
}

// module.exports.goodbye = async function(context, req) {
export const goodbye: AzureFunction = async (context, req) => {
  console.log("context", JSON.stringify(context));
  console.log("req", JSON.stringify(req));

  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Goodbye ' + (req.query.name || req.body.name),
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
    };
  }
};
