import path from 'path';
import { Server } from 'http';
import Express from 'express';
import cors from 'cors';
let bodyParser = require('body-parser');
import _ from 'lodash';
const jwt = require('express-jwt');
import { SimulatorDao } from './dao/SimulatorDao';
import { BasicDao } from './dao/BasicDao';

const basicUitlity = new BasicDao();

let f = require('util').format;

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
require('dotenv').config({
    path: path.join(__dirname, 'config', `.env.${process.env.NODE_ENV}`),
    // path: './config/.env.${process.env.NODE_ENV}',
    silent: true
});

app.use(bodyParser.json({limit: '50mb'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
     origin: f('http://%s:%s', process.env.SERVER_CORS_HOST, process.env.SERVER_CORS_PORT),
    credentials: true
}) );


/******************************************/
/********** START SIMULATOR API ***********/
/******************************************/

/**
 * Calculate Simulator
 */
app.post('/api/calculate', (req, res) => {
    basicUitlity.debug("/api/calculate with user id: " + req.body.userId);

    const calculateData = req.body.simulatorInfo;
    const userId = req.body.userId;

    const simulatorDao = new SimulatorDao();

    simulatorDao.calculateData(res, calculateData, userId);
});

app.get('/api/getCarList', (req, res) => {
    basicUitlity.debug("/api/getCarList");

    const simulatorDao = new SimulatorDao();

    simulatorDao.getCarNameList(res);
});


// start the server
const port = process.env.SERVER_PORT ;
const host = process.env.SERVER_HOST;
const env = process.env.NODE_ENV;
const version = basicUitlity.getVersion();
server.listen(port, err => {
  if (err) {
    return basicUitlity.error(err);
  }
   basicUitlity.info(`*************************************************`);
   basicUitlity.info(`Server running on http://${host}:${port} [${env}]`);
   basicUitlity.info(`Version of QOVER TEST: ${version}`);
   basicUitlity.info(`*********************************`);
});
