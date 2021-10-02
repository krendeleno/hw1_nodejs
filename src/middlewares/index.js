const { json } = require('express');
const disablePoweredBy = require('./disablePoweredBy');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const slowDown = require('express-slow-down');

module.exports = (app) => {
  app.use(json());

  app.use(disablePoweredBy);

  app.use(
    cors({
      origin: 'svdom.com',
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: [
            "'self'",
            'https://cdn.jsdelivr.net',
            'https://code.jquery.com',
          ],
        },
      },
    })
  );

  const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 120,
  });

  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 100,
    delayMs: 1000,
  });

  app.use(speedLimiter);
  app.use(limiter);

};
