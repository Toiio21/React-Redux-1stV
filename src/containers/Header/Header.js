import React, { Component } from 'react'

import cn from 'classnames'

import {connect} from 'react-redux'

import './Header.scss'

function mapStateToProps (state) {
    return state
}

class Header extends Component {

  render () {
    const {
      title,
      userName,
      className,
      bodyClassName,
      renderIcon
    } = this.props

    return (
      <div className={cn('Header', className)}>
        <div className={cn('Header-Body', bodyClassName)}>
          <div className='flex-1 d-flex flex-row justify-content-start align-items-center'>
            {renderIcon && renderIcon()}
            <div className='Header-Title'>
              {title}
            </div>
          </div>
          <div className='flex-1 d-flex flex-row justify-content-end align-items-center'>
            {userName && (
              <div className='Header-UserName'>
                {userName}
              </div>
            )}
            <a className='btn btn-primary Header-ExitBtn'>
              Выйти
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(Header)
