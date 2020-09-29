import * as mock from '../MockData'
import BaseController from './BaseController'

class AppointmentController extends BaseController {
  getPath () {
    return '/appointments'
  }

  getHandlers () {
    return [
      {
        path: '',
        handler: (vars, params) => {
          return mock.getAppointments({...vars, ...params})
        }
      },
      /* {
          path: '/:appointmentId',
          handler: (vars, params) => {
            return mock.getAppointmentDetails({...vars, ...params})
          }
      },
      {
          path: '/count',
          handler: (vars, params) => {
            return mock.getAppointmentCount({...vars, ...params})
          }
      }, */
    ]
  }
}

export default new AppointmentController()