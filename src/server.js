import path from 'path';
import { Server } from 'http';
import Express from 'express';
import cors from 'cors';
let bodyParser = require('body-parser');
import _ from 'lodash';
const jwt = require('express-jwt');
import { error, debug, info, getVersion } from './common/UtilityLog';
import { SimulatorDao } from './dao/SimulatorDao';
import { ProfileDao } from './dao/ProfileDao';


// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
require('dotenv').config({
    path: path.join(__dirname, '..' ,'config', `.env.${process.env.NODE_ENV}`),
    // path: './config/.env.${process.env.NODE_ENV}',
    silent: true
});
const MongoDb =  require('mongodb');
const MongoClient = MongoDb.MongoClient,
  f = require('util').format;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
     origin: f('http://%s:%s', process.env.SERVER_CORS_HOST, process.env.SERVER_CORS_PORT),
    credentials: true
}) );

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer(process.env.AUTH_SECRET, 'base64'),
  audience: process.env.AUTH_AUDIENCE
});

let _mongodb;

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const localhostDB = process.env.DB_HOST;
const portDB = process.env.DB_PORT;
const authSource = process.env.DB_DB;

// Connection URL
const url = f('mongodb://%s:%s@%s:%s/%s', user, password, localhostDB, portDB, authSource);

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    if (err) {
        error('MongoDb is not connected.');
        return;
    }

    info("Mongo db connected successfully to server");
    _mongodb =  db;
});


/******************************************/
/********** START SIMULATOR API ***********/
/******************************************/

/**
 * Calculate Simulator
 */
app.post('/api/calculate/:calculateData', (req, res) => {
    debug("/api/calculate/:calculateData");
    debug("Receive data calculateData: " + req.params.calculateData);

    const calculateData = JSON.parse(req.params.calculateData);

    const simulatorDao = new SimulatorDao();

    simulatorDao.calculateData(res, calculateData);
});


// start the server
const port = process.env.SERVER_PORT ;
const host = process.env.SERVER_HOST;
const env = process.env.NODE_ENV;
const version = getVersion();
server.listen(port, err => {
  if (err) {
    return error(err);
  }
   info(`*************************************************`);
   info(`Server running on http://${host}:${port} [${env}]`);
   info(`Version of Katapulta: ${version}`);
   info(`*********************************`);
});
