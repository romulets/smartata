import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './page/Login/Login'
import Topic from './page/Topic/Topic'
import Logout from './page/Login/Logout'
import AddTopic from './page/Topic/AddTopic'
import EditTopic from './page/Topic/EditTopic'
import Register from './page/Register/Register'
import AllTopics from './page/Topic/AllTopics'
import Favorites from './page/Topic/Favorites'
import Published from './page/Topic/Published'
import TopicsInCategory from './page/Topic/TopicsInCategory'
import TopicsTagged from './page/Topic/TopicsTagged'

import './App.css'

class App extends Component {

  render () {
    return (
      <CookiesProvider>
        <MuiThemeProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/logout' component={Logout} />
              <Route path='/register' component={Register} />
              <Route path='/topic/add' component={AddTopic} />
              <Route path='/favorites' component={Favorites} />
              <Route path='/published' component={Published} />
              <Route exact path='/topics' component={AllTopics} />

              <Route path='/topic/edit/:id' component={EditTopic} />
              <Route path='/topic/:id' component={Topic} />
              <Route path='/category/:id' component={TopicsInCategory} />
              <Route path='/tag/:key' component={TopicsTagged} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </CookiesProvider>
    )
  }

}

export default App
