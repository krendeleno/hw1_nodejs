const path = require('path');
const express = require('express');
const { PORT } = require('./config');
const { apiRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// setup other
setupMiddlewares(app);

// api routes
app.use('/', apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
