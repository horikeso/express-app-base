const express = require('express');
const router = express.Router();
const _ = require('underscore');
const log4js = require('log4js');
log4js.configure('config/applog.json');
const errorLogger = log4js.getLogger('error');
const infoLogger = log4js.getLogger('info');
const demoModel = require('../models/demo.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  errorLogger.info('info');
  errorLogger.error('error');
  infoLogger.info('info');
  infoLogger.error('error');
  const title = demoModel.helloWorld('Express');

  (async () => {
    return await demoModel.httpStatusesComApi();
  })().then(result => {
    infoLogger.info(result);
    res.render('index', { title: title });
  }).catch(next);// show error page
});

module.exports = router;
