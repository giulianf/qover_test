import _ from 'lodash';
import moment from 'moment';

export function createDateMongo() {
    return moment().utc().locale("fr").toISOString();
}



