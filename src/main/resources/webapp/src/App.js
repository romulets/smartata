import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './page/Login/Login'
import Topic from './page/Topic/Topic'
import Register from './page/Register/Register'
import AllTopics from './page/Topic/AllTopics'
import Favorites from './page/Topic/Favorites'
import Published from './page/Topic/Published'

import './App.css'

class App extends Component {

  render () {
    return (
      <CookiesProvider>
        <MuiThemeProvider>
          <Router>
            <div>
              <Route exact path='/' component={Login} />
              <Route path='/topic/:id' component={Topic} />
              <Route path='/topics' component={AllTopics} />
              <Route path='/register' component={Register} />
              <Route path='/favorites' component={Favorites} />
              <Route path='/published' component={Published} />
            </div>
          </Router>
        </MuiThemeProvider>
      </CookiesProvider>
    )
  }

}

export default App
