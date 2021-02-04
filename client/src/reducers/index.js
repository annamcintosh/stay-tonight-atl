import { combineReducers } from "redux";
import siteReducer from './siteReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'


export default combineReducers({
    site: siteReducer,
    error: errorReducer,
    auth: authReducer
})