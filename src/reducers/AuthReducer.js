import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS, LOGIN_FAIL, LOGGING_IN } from '../actions/types';

const INITIAL_STATE = { email: '', password: '', token: '', loginfail: false, loggingin: false };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
       return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
    case LOGIN_SUCCESS:
        return { ...state, token: action.payload, loggingin: false };
    case LOGIN_FAIL:
        return { ...state, ...INITIAL_STATE, loginfail: true, loggingin: false };
    case LOGGING_IN:
        return { ...state, loggingin: true, loginfail: false };
    default:
        return state;
  }
};
