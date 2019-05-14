import { combineReducers } from 'redux'
import * as userReducer from './userReducer'

export default combineReducers({
    ...userReducer
})
