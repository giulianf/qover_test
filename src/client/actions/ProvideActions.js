import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import ProvideService from '../services/ProvideService';


export default {
    calculate: (profile, pageKey) => {
        let promise = ProvideService.calculate(profile, pageKey);

        dispatchAsync(promise, {
          request: ProvideConstants.CALCULATE,
          success: ProvideConstants.CALCULATE_SUCCESS,
          failure: ProvideConstants.DATA_ERROR
        }, { });

    },
    getCarList: () => {
        let promise = ProvideService.getCarList();

        dispatchAsync(promise, {
          request: ProvideConstants.GET_CAR_LIST,
          success: ProvideConstants.GET_CAR_LIST_SUCCESS,
          failure: ProvideConstants.DATA_ERROR
        }, { });

    }
}
