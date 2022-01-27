import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import applyDatabaseSetup from './utils/db';

const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

applyDatabaseSetup();

// app.use('/api/v1', routes);

//for error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({success: false, error: err});
});

export default app;
