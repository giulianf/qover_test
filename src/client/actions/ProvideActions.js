import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import ActionTypes from '../constants/ActionTypes';
import ProvideService from '../services/ProvideService';


export default {
    calculate: (profile, pageKey) => {
        let promise = ProvideService.calculate(profile, pageKey);

        dispatchAsync(promise, {
          request: ProvideConstants.CALCULATE,
          success: ProvideConstants.CALCULATE_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    }
}
