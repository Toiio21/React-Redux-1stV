import List from './list/AppointmentListInitialState'

const { Record } = require('immutable')

export default Record({
   list: List()
})