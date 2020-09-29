import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import appointment from './appointment/appointmentReducer'

const rootReducer = (history) => combineReducers({
   router: connectRouter(history),
   appointment
})

export default rootReducer