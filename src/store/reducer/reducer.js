import { combineReducers } from 'redux'
import * as userReducer from './userReducer'
import * as pageTabsReducer from './pageTagsReducer'

export default combineReducers({
    ...userReducer,
    ...pageTabsReducer
})
