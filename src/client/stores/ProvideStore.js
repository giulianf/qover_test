import AppDispatcher from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import BaseStore from './BaseStore';
import LayoutStore from './LayoutStore';
import { SimulatorInfo } from '../../model/SimulatorInfo';
import Validator from '../../validator/validatorBasicInfo';
import Toastr from 'toastr';

import _ from 'lodash';
import moment from 'moment';

const simulator = new SimulatorInfo( '', '', 0, 0);


class ProvideStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._simulator = simulator;
      this._carOptionList = [];
    }

    /**************************/
    /***** START SIMULATOR ****/
    /*************************/


    /**
     * populateSimulator - to receive the price
     *
     * @param  {type} simulatData description
     * @return {type}             description
     */
    populateSimulator(simulatData) {
        this._simulator = simulatData;
    }
    /**
     * updateSimulator - Change the simulator form
     *
     * @param  {type} newValue description
     * @return {type}          description
     */
    updateSimulator(newValue) {
        _.assign(this._simulator, newValue);
    }

    getCarList(carList) {
        this._carOptionList = carList;
    }


    /**************************/
    /***** END SIMULATOR ****/
    /*************************/

    _registerToActions(action) {
    switch(action.type){
       // Respond to CALCULATE_SUCCESS action
      case ProvideConstants.CALCULATE_SUCCESS:
        this.calculateSimulator(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
       // Respond to UPDATE_SIMULATOR action
      case ProvideConstants.UPDATE_SIMULATOR:
        this.updateSimulator(action.newValue);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.GET_CAR_LIST_SUCCESS:
         this.getCarList(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      default:
        break;
    }

  }

  get stateSimulator() {
    return {
        simulateur : this.getSimulateur,
        carOptionList : this.getCarOptionList
    };
   }


  /**
   * getSimulateur - Object to display simulator information
   *
   * @return {object}  description
   */
  get getSimulateur() {
      return this._simulateur;
  }

  /**
   * get - getCarList
   *
   * @return {array}  description
   */
  get getCarOptionList() {
      return this._carOptionList;
  }

}
export default new ProvideStore();
