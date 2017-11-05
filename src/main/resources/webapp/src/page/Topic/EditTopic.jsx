import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress'

import SideBar from '../../ui/SideBar'
import TopicForm from '../../ui/TopicForm'

import TopicService from '../../service/TopicService'
import UserService from '../../service/UserService'

export default class EditTopic extends Component {

  constructor (props) {
    super(props)

    this.state = {
      allowEdition: true,
      topic: {}
    }
  }

  componentDidMount () {
    this.getTopic()
  }

  getTopic () {
    const { id } = this.props.match.params
    TopicService.getTopic(id)
    .then(topic => {
      UserService.getUser().then(u => this.setState({
        topic,
        allowEdition: topic.createdBy.id === u.id
      }))
    })
  }

  render () {
    const { topic, allowEdition } = this.state

    if (!allowEdition) {
      if (topic.id === undefined) return <Redirect to='/topics' />
      return <Redirect to={'/topic/' + topic.id} />
    }

    if (topic.id === undefined) {
      return (
        <div>
          <SideBar />

          <div className='container-right'>
            <CircularProgress size={80} thickness={5} />
          </div>
        </div>
      )
    }

    return <TopicForm topic={topic} />
  }

}
