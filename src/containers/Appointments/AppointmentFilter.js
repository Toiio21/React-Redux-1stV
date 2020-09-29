import React, { Component } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Moment from 'react-moment'
import { map, filter } from 'underscore'
import { Form, Button } from 'reactstrap'

import Table from '../../components/Table/Table'
import TextField from '../../components/Form/TextField/TextField'
import DateField from '../../components/Form/DateField/DateField'
import CheckboxField from '../../components/Form/CheckboxField/CheckboxField'

import './Appointments.scss'

import Header from '../Header/Header'

import * as appointmentListActions from '../../redux/appointment/list/appointmentListActions'

import { ReactComponent as Search } from '../../images/search.svg'
import { ReactComponent as Appointment } from '../../images/appointment.svg'

const TITLE = 'Приёмы'

const USER = 'Иванов Иван Иванович'

// маппинг состояния приложения в свойства компонента-контейнера
function mapStateToProps (state) {
    return {
        error: state.appointment.list.error,
        isFetching: state.appointment.list.isFetching,
        dataSource: state.appointment.list.dataSource,
        shouldReload: state.appointment.list.shouldReload
    }
}

// подключение генераторов действий к компоненту-контейнеру
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(appointmentListActions, dispatch)
        }
    }
}

class AppointmentFilter extends Component {

  componentDidMount() {
    this.load()
  }

  onChangeField = (name, value) => {
    this.changeFilterField(name, value)
  }

  onChangeDateField = (name, value) => {
    this.changeFilterField(name, value && value.getTime(), )
  }

  onSearch = () => {
    this.change()
  }

  change (changes, shouldReload) {
    this.props
            .actions
            .changeFilter(changes, shouldReload)
  }

  changeField (name, value, shouldReload) {
        this.props
            .actions
            .changeFilterField(name, value, shouldReload)
  }

  // разметка
  render() {}
}

// объявляем контейнер
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentFilter)