import { SIMULATE_API , CAR_LIST_API } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';
import ApiService from './ApiService';

var _ = require('lodash');

class ProvideService {

    updateSimulator(newValue) {
        dispatch(ProvideConstants.UPDATE_SIMULATOR, { newValue });
    }
    /**
     * calculate - description
     *
     * @param  {type} profile description
     * @param  {type} simulatorInfo description
     * @return {type}              description
     */
    calculate(profile, simulatorInfo) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
             `SIMULATE_API${JSON.stringify(simulateData)}/${profile.user_id}`,
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }



    getCarList() {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
             CAR_LIST_API ,
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }
}

export default new ProvideService()
