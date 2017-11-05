import React, { Component } from 'react'

import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import { NavLink, Redirect } from 'react-router-dom'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ActionExit from 'material-ui/svg-icons/action/exit-to-app'

import UserService from '../service/UserService'

import './style/SideBar.css'

export default class SideBar extends Component {

  constructor () {
    super()

    this.state = {
      redirectToLogin: false,
      user: {
        name: 'Convidado'
      }
    }
  }

  componentDidMount () {
    this.getUser()
  }

  getUser () {
    UserService.getUser()
      .then(user => this.setState({ user }))
      .catch(user => this.setState({ redirectToLogin: true }))
  }

  render () {
    if (this.state.redirectToLogin) {
      return <Redirect to='/logout' />
    }

    return (
      <div className='side-bar'>
        <h1 className='sb-title'>Smartata</h1>

        <div className='sb-user-name'>
          <Avatar size={60} className='sb-avatar' >
            { this.state.user
              ? this.state.user.name.charAt(0).toUpperCase()
              : 'Convidado'}
          </Avatar>

          <span>
            Olá { this.state.user
                      ? this.state.user.name
                      : 'Convidado'
                }
          </span>
        </div>

        <Divider />

        <List>
          <NavLink to='/topics' activeClassName='selected'>
            <ListItem
              primaryText='Todos os tópicos'
              leftIcon={<ContentInbox />} />
          </NavLink>

          <NavLink to='/favorites' activeClassName='selected'>
            <ListItem
              primaryText='Favoritos'
              leftIcon={<ActionGrade />} />
          </NavLink>

          <NavLink to='/published' activeClassName='selected'>
            <ListItem
              primaryText='Publicados'
              leftIcon={<ContentSend />} />
          </NavLink>

          <NavLink to='/logout' activeClassName='selected'>
            <ListItem
              primaryText='Sair'
              leftIcon={<ActionExit />} />
          </NavLink>
        </List>
      </div>
    )
  }

}
