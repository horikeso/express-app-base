const log4js = require('log4js');
log4js.configure('config/applog.json');
const errorLogger = log4js.getLogger('error');
const infoLogger = log4js.getLogger('info');
const httpStatusesComApi = require('../app_modules/httpStatusesComApi.js');

exports.helloWorld = function(string) {
  return 'Hello World ' + string;
}

exports.asyncHelloWorld = function(string, callback) {
  callback('Hello World ' + string);
}

exports.throwTypeError = function() {
  throw new TypeError('type error');
}

exports.throwSyntaxError = function() {
  throw new SyntaxError('syntax error');
}

exports.httpStatusesComApi = async function() {
  const responses = [];

  responses.push(httpStatusesComApi.post({}, '/200'));

  let results = [];
  await Promise.all(responses).then(valueList => {
      valueList.forEach(value => {
        results.push({
            status: value.status,
            statusText: value.statusText
            // data: value.data
        });
      });
  });

  return results;
}
