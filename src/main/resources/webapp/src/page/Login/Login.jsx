import React, { Component } from 'react'

import { withCookies } from 'react-cookie'
import { Redirect, Link } from 'react-router-dom'

import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { LOGIN_URL } from '../../helper/UrlHelper'

import '../../ui/style/Box.css'

class Login extends Component {

  constructor (props) {
    super(props)

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

    if (cookies.get('authorizationToken')) {
      this.setState({
        successfullAuthentication: true
      })
    }
  }

  submit () {
    const { cookies } = this.props
    const { credentials } = this.state

    fetch(LOGIN_URL, this.mountRequestParams(credentials))
      .then(response => {
        const token = response.headers.get('Authorization')
        if (response.status === 200 && token) {
          return token
        } else {
          throw response
        }
      })
      .then(token => cookies.set('authorizationToken', token))
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
      window.location.href = '/topics'
      return <Redirect to='/topics' />
    }

    return (
      <div>
        <div className='container'>

          <div className='box'>

            <h1 className='box-header'> Login Smartata </h1>

            <div className='box-body'>

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
                  secondary
                  fullWidth
                  className='box-button'
                  onClick={this.submit} />

              </form>

              <p className='text-center'>Ou</p>

              <Link to='/register'>
                <RaisedButton
                  label='Criar Novo Cadastro'
                  fullWidth />
              </Link>

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
