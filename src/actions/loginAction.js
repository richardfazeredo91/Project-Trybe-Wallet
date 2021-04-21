import { LOGIN_ACTION } from './actionTypes';

export default (email) => ({ type: LOGIN_ACTION, payload: { email } });
