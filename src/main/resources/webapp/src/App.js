import React, { Component } from 'react'
import './App.css'
import Login from './page/Login/Login'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {

  render () {
    return (
      <MuiThemeProvider>
        <Login />
      </MuiThemeProvider>
    )
  }

}

export default App
