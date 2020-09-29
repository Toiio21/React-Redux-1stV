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
function mapStateToProps (state) { //отображение необх. части
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

class Appointments extends Component {

  componentDidMount() {
    this.load()
  }

  onChangeFilterField = (name, value) => {
    this.changeFilterField(name, value)
  }

  onChangeFilterDateField = (name, value) => {
    this.changeFilterField(name, value && value.getTime())
  }

  onSearch = () => {
    this.load()
  }

  load() {
    const {
      actions,
      dataSource: ds
    } = this.props // доступ к состоянию приложения

    actions.load({
        ...ds.filter.toJS()
    })
  }

  changeFilterField (name, value, shouldReload) {
        this.props
            .actions
            .changeFilterField(name, value, shouldReload)
  }

  render() {

    // берём данные из состояния приложения используя свойства props
    const {
      isFetching,
      dataSource: ds
    } = this.props

    const {
      startDate,
      endDate,
      clientName,
      onlyMe
    } = ds.filter

    return (
      <div className='Appointments'>
        <Header
                title={TITLE}
                userName={USER}
                className='Appointments-Header'
                bodyClassName='Appointments-HeaderBody'
                renderIcon={() => (
            <Appointment className='Header-Icon' />
          )}
        />
        <div className='Appointments-Body'>
          <div className='Appointments-Filter'>
            <Form className='Appointments-FilterForm'>
              <DateField
                      hasTime
                      name='startDate'
                      value={startDate}
                      dateFormat='dd/MM/yyyy HH:mm'
                      timeFormat='HH:mm'
                      placeholder='С'
                      className='Appointments-FilterField'
                      onChange={this.onChangeFilterDateField}
              />
              <DateField
                      hasTime
                      name='endDate'
                      value={endDate}
                      dateFormat='dd/MM/yyyy HH:mm'
                      timeFormat='HH:mm'
                      placeholder='По'
                      className='Appointments-FilterField'
                      onChange={this.onChangeFilterDateField}
              />
              <TextField
                      name='clientName'
                      value={clientName}
                      placeholder='Клиент'
                      className='Appointments-FilterField'
                      onChange={this.onChangeFilterField}
              />
              <CheckboxField
                      name='onlyMe'
                      label='Только я'
                      value={onlyMe}
                      className='Appointments-FilterField'
                      onChange={this.onChangeFilterField}
              />
              <Button
                      className='Appointments-SearchBtn'
                      onClick={this.onSearch}>
                <Search className='Appointments-SearchBtnIcon'/>
              </Button>
            </Form>
          </div>
          <Table
                  data={ds.data}
                  isLoading={isFetching}
                  className='AppointmentList'
                  columns={[
                  {
                  dataField: 'date',
                  text: 'Дата',
                  headerStyle: {
                    width: '150px'
                  },
                  formatter: (v, row) => {
                    return (
                      <Moment date={v} format='DD.MM.YYYY HH.mm' />
                    )
                  }
                },
                {
                  dataField: 'clientName',
                  text: 'Клиент',
                  headerStyle: {
                    width: '300px'
                  }
                },
                {
                  dataField: 'status',
                  text: 'Статус'
                },
                {
                  dataField: 'holderName',
                  text: 'Принимающий',
                  headerStyle: {
                    width: '300px'
                  }
                },
                {
                  dataField: 'compliences',
                  text: 'Жалобы',
                  headerStyle: {
                    width: '200px'
                  }
                },
                {
                  dataField: 'diagnosis',
                  text: 'Диагноз',
                  headerStyle: {
                    width: '200px'
                  }
                }
              ]}
            />
        </div>
      </div>
    )
  }
}

// объявляем контейнер
export default connect(mapStateToProps, mapDispatchToProps)(Appointments)