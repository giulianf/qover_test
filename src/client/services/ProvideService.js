import { SIMULATE_API } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';
import ApiService from './ApiService';

var _ = require('lodash');

class ProvideService {

    /**
     * calculate - description
     *
     * @param  {type} calculateData description
     * @return {type}              description
     */
    calculate(calculateData) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
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
}

export default new ProvideService()
