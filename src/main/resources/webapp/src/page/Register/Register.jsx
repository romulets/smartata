import React, { Component } from 'react'

import { withCookies } from 'react-cookie'
import { Redirect, Link } from 'react-router-dom'

import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import '../../ui/style/Box.css'

class Register extends Component {

  constructor (props) {
    super(props)

    this.REGISTER_URL = '/smartata/api/users'
    this.handleMethodsBinds()

    this.state = {
      redirectToLogin: false,
      successfullAuthentication: false,
      successfullRegistration: false,
      showErrorSnackbar: false,
      user: {
        name: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      }
    }
  }

  handleMethodsBinds () {
    this.onChangeInput = this.onChangeInput.bind(this)
    this.submit = this.submit.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
    const { user } = this.state

    fetch(this.REGISTER_URL, this.mountRequestParams(user))
      .then(response => {
        if (response.status === 200) {
          return response
        } else {
          throw response.json()
        }
      })
      .then(r => this.setState({ successfullRegistration: true }))
      .catch(r => this.setState({ showErrorSnackbar: true }))
  }

  mountRequestParams (user) {
    return {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(user)
    }
  }

  onChangeInput (e) {
    const target = e.target
    const value = target.value
    const name = target.name

    const { user } = this.state
    user[name] = value

    this.setState({
      user,
      showErrorSnackbar: false
    })
  }

  handleClose () {
    this.setState({
      successfullRegistration: false,
      successfullAuthentication: false,
      showErrorSnackbar: false,
      redirectToLogin: true
    })
  }

  render () {
    if (this.state.redirectToLogin) {
      return <Redirect to='/' />
    }

    if (this.state.successfullRegistration) {
      const actions = [
        <FlatButton
          label='Ok'
          primary
          onClick={this.handleClose}
           />
      ]

      return (
        <Dialog
          actions={actions}
          modal={false}
          open
          onRequestClose={this.handleClose} >

          Cadastro criado com sucesso
        </Dialog>
      )
    }

    if (this.state.successfullAuthentication) {
      return <Redirect to='/topics' />
    }

    return (
      <div>
        <div className='container'>

          <div className='box'>

            <h1 className='box-header'> Cadastro Smartata </h1>

            <div className='box-body'>

              <form onSubmit={this.submit}>

                <TextField
                  name='name'
                  floatingLabelText='Nome'
                  fullWidth
                  onChange={this.onChangeInput} />

                <TextField
                  name='lastName'
                  floatingLabelText='Sobrenome'
                  fullWidth
                  onChange={this.onChangeInput} />

                <TextField
                  name='email'
                  floatingLabelText='E-mail'
                  type='email'
                  fullWidth
                  onChange={this.onChangeInput} />

                <TextField
                  name='username'
                  floatingLabelText='Usuário'
                  fullWidth
                  onChange={this.onChangeInput} />

                <TextField
                  name='password'
                  floatingLabelText='Senha'
                  type='password'
                  fullWidth
                  onChange={this.onChangeInput} />

                <RaisedButton
                  label='Cadastrar'
                  secondary
                  fullWidth
                  className='box-button'
                  onClick={this.submit} />

              </form>

              <p className='text-center'>Ou</p>

              <Link to='/'>
                <RaisedButton
                  label='Já Possuo cadastro'
                  fullWidth />
              </Link>

            </div>

          </div>
        </div>

        <Snackbar
          open={this.state.showErrorSnackbar}
          message='Dados inválidos'
          autoHideDuration={4000} />

      </div>
    )
  }

}

export default withCookies(Register)
