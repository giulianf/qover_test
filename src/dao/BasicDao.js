import moment from 'moment';

let winston = require('winston');
winston.level = 'debug';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp':function() {return getLogDate(); },'colorize':true});

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
   
    getLogDate() {
        return moment().format('DD/MM/YYYY HH:mm:ss');
    }

    getVersion() {
        return VERSION;
    }

    
}
