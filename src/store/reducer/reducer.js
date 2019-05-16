import { combineReducers } from 'redux'
import * as userReducer from './userReducer'
import * as pageTabsReducer from './pageTabsReducer'

export default combineReducers({
    ...userReducer,
    ...pageTabsReducer
})
