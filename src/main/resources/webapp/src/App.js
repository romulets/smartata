import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './page/Login/Login'
import AllTopics from './page/Topic/AllTopics'

import './App.css'

class App extends Component {

  render () {
    return (
      <CookiesProvider>
        <MuiThemeProvider>
          <Router>
            <div>
              <Route path='/' component={Login} />
              <Route path='/topics' component={AllTopics} />
            </div>
          </Router>
        </MuiThemeProvider>
      </CookiesProvider>
    )
  }

}

export default App
