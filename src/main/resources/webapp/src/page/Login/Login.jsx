import './Login.css'

import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'

export default class Login extends Component {

  render () {
    return (
      <div>
        <AppBar title='Smartata' />

        <div className='container'>
          <div className='login'>

            <h1 className='login-header'> Login </h1>

            <div className='login-body'>

              <TextField
                hintText='Usuário'
                floatingLabel='Usuário' />

              <br />

              <TextField
                hintText='Senha'
                floatingLabel='Senha'
                type='password' />

            </div>

          </div>
        </div>

      </div>
    )
  }

}
