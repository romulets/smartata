import React, { Component } from 'react'

import { withCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import './Login.css'

class Login extends Component {

  constructor (props) {
    super(props)

    this.LOGIN_URL = '/smartata/api/login'
    this.handleMethodsBinds()

    this.state = {
      successfullAuthentication: false,
      showErrorSnackbar: false,
      credentials: {
        username: '',
        password: ''
      }
    }
  }

  handleMethodsBinds () {
    this.onChangeCredential = this.onChangeCredential.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    const { cookies } = this.props

    if (cookies.get('authenticationToken')) {
      this.setState({
        successfullAuthentication: true
      })
    }
  }

  submit () {
    const { cookies } = this.props
    const { credentials } = this.state

    fetch(this.LOGIN_URL, this.mountRequestParams(credentials))
      .then(response => {
        if (response.status === 200) {
          return response.headers.get('Authorization')
        } else {
          throw response
        }
      })
      .then(token => cookies.set('authenticationToken', token))
      .then(r => this.setState({
        successfullAuthentication: true
      }))
      .catch(r => this.setState({
        showErrorSnackbar: true
      }))
  }

  mountRequestParams (credentials) {
    return {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(credentials)
    }
  }

  onChangeCredential (e) {
    const target = e.target
    const value = target.value
    const name = target.name

    const { credentials } = this.state
    credentials[name] = value

    this.setState({
      credentials,
      showErrorSnackbar: false
    })
  }

  render () {
    if (this.state.successfullAuthentication) {
      return (
        <Redirect to='/topics' />
      )
    }

    return (
      <div>
        <AppBar title='Smartata' />

        <div className='container'>
          <div className='login'>

            <h1 className='login-header'> Login </h1>

            <div className='login-body'>

              <form onSubmit={this.submit}>

                <TextField
                  name='username'
                  floatingLabelText='Usuário'
                  fullWidth
                  onChange={this.onChangeCredential} />

                <TextField
                  name='password'
                  floatingLabelText='Senha'
                  type='password'
                  fullWidth
                  onChange={this.onChangeCredential} />

                <RaisedButton
                  label='Entrar'
                  primary
                  fullWidth
                  className='login-button'
                  onClick={this.submit} />

              </form>

            </div>

          </div>
        </div>

        <Snackbar
          open={this.state.showErrorSnackbar}
          message='Usuário e/ou Senha inválidos'
          autoHideDuration={4000} />

      </div>
    )
  }

}

export default withCookies(Login)
