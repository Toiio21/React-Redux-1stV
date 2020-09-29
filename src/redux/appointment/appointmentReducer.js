import InitialState from './AppointmentInitialState'

import listReducer from './list/appointmentListReducer'

const initialState = new InitialState()

export default function (state = initialState, action) {
   let nextState = state

   const list = listReducer(state.list, action)
   if (list !== state.list) nextState = nextState.setIn(['list'], list)

   return nextState
}
