import { combineReducers } from 'redux'
import ticketReducer from './actionsAndReducers/ticketReducer'

alert(JSON.stringify(ticketReducer,null,3))

export default combineReducers({
    ticketReducer
})