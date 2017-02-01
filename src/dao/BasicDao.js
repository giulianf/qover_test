import moment from 'moment';
import sqlite3 from 'sqlite3';
import _ from 'lodash';

let winston = require('winston');
winston.level = 'debug';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp':function() {return BasicDao.getLogDate(); },'colorize':true});

const VERSION = 'qvr-1.0.0';

export class BasicDao {

    constructor() {
    }

    info(message) {
        winston.log('info', message);
    }

    debug(message) {
        winston.log('debug', message);
    }

    error(message, error) {
        winston.log('error', message, error);
    }

    static getLogDate() {
        return moment().format('DD/MM/YYYY HH:mm:ss');
    }

    getVersion() {
        return VERSION;
    }

    get getDbQover() {
            return this._db;
    }

    responseError(message, e, res) {
        this.error(message , e);
        return res.status(500).json(message);
    }

    setdb() {
        this.debug('Entering setdb()');
        this._dbName = 'db/qvr';

        this._db = new sqlite3.Database(_.toString(this._dbName));
        this._db.exec("PRAGMA foreign_keys = ON;");
    }


    closeDb() {
        this.info("closeDb.");
        this._db.close();
    }
}
