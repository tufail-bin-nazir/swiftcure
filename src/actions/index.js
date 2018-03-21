import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGGING_IN } from './types';
import { appUrl } from './ServiceUrls';

export const emailChanged = (text) => {
 return {
   type: EMAIL_CHANGED,
   payload: text
  };
};

export const passwordChanged = (text) => {
 return {
   type: PASSWORD_CHANGED,
   payload: text
  };
};

export const login = ({ email, pasword }) => {
 return (dispatch) => {
   dispatch({ type: LOGGING_IN });
   const user = {
      username: email,
     password: pasword
   };
 axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios({
      method: 'post',
      url: `${appUrl}login`,
      data: JSON.stringify(user)
      })
    .then((response) => {
       dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
       Actions.home();
      })
    .catch((error) => {
          if (error.response) {
              if (error.response.status === 401) {
                dispatch({ type: LOGIN_FAIL });
              }
           }
      });
   };
  };
