import { ACTION_TYPES } from '../../../lib/Constants'

import service from '../../../services/AppointmentService'

const {
  CLEAN_APPOINTMENT_LIST_ERROR,

  CLEAN_APPOINTMENT_LIST,

  CLEAN_APPOINTMENT_LIST_FILTER,
  CHANGE_APPOINTMENT_LIST_FILTER,
  CHANGE_APPOINTMENT_LIST_FILTER_FIELD,

  LOAD_APPOINTMENT_LIST_REQUEST,
  LOAD_APPOINTMENT_LIST_SUCCESS,
  LOAD_APPOINTMENT_LIST_FAILURE
} = ACTION_TYPES

// очистить список
export function clean () {
    return { type: CLEAN_APPOINTMENT_LIST }
}

// очистить ошибку
export function cleanError () {
  return { type: CLEAN_APPOINTMENT_LIST_ERROR }
}

// очистить фильтр
export function cleanFilter () {
  return { type: CLEAN_APPOINTMENT_LIST_FILTER }
}

// применить фильтр: сразу несколько полей в объекте changes
export function changeFilter (changes, shouldReload) {
  return {
      type: CHANGE_APPOINTMENT_LIST_FILTER,
      payload: { changes, shouldReload }
  }
}

// применить фильтр: только одно поле
export function changeFilterField (name, value, shouldReload) {
  return {
      type: CHANGE_APPOINTMENT_LIST_FILTER_FIELD,
      payload: { name, value, shouldReload }
  }
}

// загрузить данные для списка с сервера
export function load (params) {
  return dispatch => {
      dispatch({ type: LOAD_APPOINTMENT_LIST_REQUEST })

      return service.find(params).then(response => {
          dispatch({
            type: LOAD_APPOINTMENT_LIST_SUCCESS,
            payload: response.data
          })

          return response
      }).catch(error => {
          dispatch({ type: LOAD_APPOINTMENT_LIST_FAILURE, payload: error })
      })
  }
}