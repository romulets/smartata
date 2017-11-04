import React, { Component } from 'react'

import { withCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

class Logout extends Component {

  componentDidMount () {
    const { cookies } = this.props
    cookies.remove('authorizationToken')
  }

  render () {
    return (
      <Redirect to='/' />
    )
  }

}

export default withCookies(Logout)
