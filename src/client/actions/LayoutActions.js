import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import ProvideService from '../services/ProvideService';

export default {
    logUserOut: () => {
        dispatch(ProvideConstants.LOGOUT_USER, {});
    }

}
