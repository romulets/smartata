import React, { Component } from 'react'

import { withCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

class Logout extends Component {

  constructor (props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount () {
    const { cookies } = this.props
    cookies.remove('authorizationToken')
    this.setState({ redirect: true })
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/' />
    } else {
      return <div />
    }
  }

}

export default withCookies(Logout)
