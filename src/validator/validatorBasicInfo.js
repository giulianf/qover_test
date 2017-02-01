import _ from 'lodash';

export default {
    CAR_MINIMUM : 5000,
    CAR_MAXIMUM : 75000,
  validateSimulator(simulatorInfo, carList) {
      if (_.isNil(simulatorInfo)) {
          throw new Error("Impossible to validate the calculator.");
      }

      if (!this.validateName(simulatorInfo.name)) {
          throw new Error("The family name is not valid");
      }

      if (!this.validateCarName(carList, simulatorInfo.carName)) {
          throw new Error("The car name is not valid");
      }

      if (!this.validateCarValue(simulatorInfo.carValue)) {
          throw new Error("The car value is not valid.");
      }

  },

  validateName(name) {
      return !_.isNil(name) && !_.isEmpty(name) && _.size(name) >= 5 ? true : false;
  },

  validateCarName(carList, carNameSelected) {
      if (!_.isNil(carList) && !_.isNil(carNameSelected) ) {
         return _.find(carList, {value: carNameSelected});
      }
      return false;
  },

  validateCarValue(carValue) {
      if (!_.isNil(carValue)) {
          if ( carValue > this.CAR_MINIMUM && carValue < this.CAR_MAXIMUM) {
              return true;
          }
      }

      return false;
  }
};
