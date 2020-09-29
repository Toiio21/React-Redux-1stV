import React, { Component } from 'react'

import { Form } from 'reactstrap'
import Moment from 'react-moment'
import { map, filter } from 'underscore'
import { Button } from 'reactstrap'

import './Appointments.scss'

import Table from '../Table/Table'
import Header from '../Header/Header'
import Loader from '../Loader/Loader'
import TextField from '../Form/TextField/TextField'
import DateField from '../Form/DateField/DateField'
import CheckboxField from '../Form/CheckboxField/CheckboxField'

import service from '../../services/AppointmentService'

import { ReactComponent as Search } from '../../images/search.svg'
import { ReactComponent as Appointment } from '../../images/appointment.svg'

const TITLE = 'Приёмы'

const USER = 'Иванов Иван Иванович'

export default class Appointments extends Component {

  state = {
    data: null,
    isLoading: false,
    
    filter: {
      startDate: null,
      endDate: null,
      clientName: '',
      onlyMe: false
    }
  }

  componentDidMount() {
    this.load()
  }

  onChangeFilterField = (name, value) => {
    const { filter } = this.state

    this.setState({
      filter: { ...filter, ...{ [name]: value } }
    })
  }

  onChangeFilterDateField = (name, value) => {
    const { filter } = this.state

    this.setState({
      filter: { ...filter, ...{ [name]: value && value.getTime() } }
    })
  }

  onSearch = () => {
    this.load()
  }

  load() {
    this.setState({ isLoading: true })

    service
      .find({ filter: this.state.filter })
      .then(({ success, data }) => {
        if (success) {
          this.setState({
            data, isLoading: false
          })
        }
      })
  }

  render() {
    const {
      data,
      isLoading,
      filter: {
        startDate,
        endDate,
        clientName,
        onlyMe,
      }
    } = this.state

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
          {isLoading ? (
            <Loader />
          ) : data ? (
            <Table
              data={data}
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
          ) : 'Нет данных'}
        </div>
      </div>
    )
  }
}