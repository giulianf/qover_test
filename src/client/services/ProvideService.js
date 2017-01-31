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
     * @param  {type} calculateData description
     * @return {type}              description
     */
    calculate(calculateData) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
             SIMULATE_API + JSON.stringify(simulateData),
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
