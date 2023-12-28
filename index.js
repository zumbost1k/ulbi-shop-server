//dotenv acess server to read env variables
require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUploud = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
//acess app to send files to the front
app.use(express.static(path.resolve(__dirname, 'static')));
//acess app to load files
app.use(fileUploud({}));
app.use('/api', router);
//the error handler should always come at the end
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log('server started on port ' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
