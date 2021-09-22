const log4js = require('log4js');

log4js.configure({
  appenders: { debug: { type: 'file', filename: 'log/debug.log', flags: 'w' } },
  categories: { default: { appenders: ['debug'], level: 'info' } },
});

export const logger = log4js.getLogger('debug');
