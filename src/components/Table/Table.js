import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'

import './Table.scss'

const NO_DATA_TEXT = 'Данных нет'

export default class Table extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object), // дескрипторы столбцов таблицы
    data: PropTypes.arrayOf(PropTypes.object), // данные таблицы
    keyField: PropTypes.string, // имя уникального столбца
    noDataText: PropTypes.string,

    hasHover: PropTypes.bool,
    hasOptions: PropTypes.bool,
    hasBorders: PropTypes.bool,

    isStriped: PropTypes.bool,

    expandRow: PropTypes.object,

    className: PropTypes.string,
    containerClass: PropTypes.string,

    getRowStyle: PropTypes.func
  }

  static defaultProps = {
    data: [],
    columns: [],
    keyField: 'id',
    noDataText: NO_DATA_TEXT,

    isRemote: true,
    isStriped: true,
    isLoading: false,

    hasHover: false,
    hasHeader: false,
    hasBorders: false,

    getRowStyle: function() { return null }
  }

  getRowStyle = (row, rowIndex) => {
    return this.props.getRowStyle(row, rowIndex)
  }

  render() {
    const {
      data,
      columns,
      keyField,
      expandRow,
      className,
      containerClass,
      isStriped,
      hasBorders,
      hasHover,
      noDataText,
    } = this.props

    return (
      <div className={cn('TableContainer', containerClass)}>
        <BootstrapTable
          expandRow={expandRow}
          data={data}
          columns={columns}
          keyField={keyField}
          classes={cn('Table', className)}
          headerClasses={'Table-Header'}
          striped={isStriped}
          hover={hasHover}
          bordered={hasBorders}
          rowStyle={this.getRowStyle}
          noDataIndication={noDataText}
        />
      </div>
    )
  }
}