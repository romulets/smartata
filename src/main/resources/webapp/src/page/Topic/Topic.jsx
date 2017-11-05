import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import Tag from '../../ui/Tag'
import FABBar from '../../ui/FABBar'
import SideBar from '../../ui/SideBar'
import TopicContent from '../../ui/TopicContent'

import TopicService from '../../service/TopicService'
import UserService from '../../service/UserService'

import './style/Topic.css'

class Topic extends Component {

  constructor (props) {
    super(props)

    this.state = {
      allowEdition: false,
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
    const { topic } = this.state

    return (
      <div>
        <SideBar />

        <div className='container-right'>
          { topic.id === undefined
            ? <CircularProgress size={80} thickness={5} />
          : this.renderPageBody(topic) }
        </div>

        <FABBar editMode={this.state.allowEdition} topicId={topic.id || -1} />
      </div>
    )
  }

  renderPageBody (topic) {
    return (
      <div>
        <h2 className='topic-title'>

          <ArrowBack hoverColor='#ccc'
            className='topic-back'
            onClick={this.props.history.goBack} />

          <span className='topic-title-text'>{topic.title}</span>
        </h2>

        <Link to={'/category/' + topic.category.id}>
          <h4 className='topic-category'>
            { topic.category.name }
          </h4>
        </Link>

        <div className='topic-tags'>
          { topic.tags.map(t => <Tag key={t.key} tag={t} />) }
        </div>

        <TopicContent content={topic.content} />
      </div>
    )
  }

}

export default Topic
