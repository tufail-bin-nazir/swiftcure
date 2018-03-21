import { combineReducers } from 'redux';
import reducer from './AuthReducer';

export default combineReducers({
    auth: reducer
});
