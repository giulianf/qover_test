import _ from 'lodash';
import BasicDao from './BasicDao';
import { SimulateurResultInfo } from '../model/SimulateurResultInfo';

export class SimulatorDao extends BasicDao {

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
