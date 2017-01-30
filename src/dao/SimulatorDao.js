import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { getYear, addYear, getBelgiumDate} from '../common/Utility';
import { SimulateurResultInfo } from '../model/SimulateurResultInfo';
import { SimulateurResultListInfo } from '../model/SimulateurResultListInfo';

export class SimulatorDao {

    constructor() {
    }

    getSimulatorResult(res, simulateData) {
        info('Entering getSimulatorResult() data: ' + JSON.stringify( simulateData ));

         try {
            res.end( JSON.stringify( this.getSimulatorResultInfo(simulateData) ) );
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la simulation.');
        }
    }

    
}
