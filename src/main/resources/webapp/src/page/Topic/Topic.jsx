import React, { Component } from 'react'

import { markdown } from 'markdown'
import { Link } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import SideBar from '../../ui/SideBar'
import Tag from '../../ui/Tag'

import TopicService from '../../service/TopicService'

import './style/Topic.css'

class Topic extends Component {

  constructor (props) {
    super(props)

    this.state = {
      topic: undefined
    }
  }

  componentDidMount () {
    this.getTopic()
  }

  getTopic () {
    const { id } = this.props.match.params
    TopicService.getTopic(id).then(topic => this.setState({ topic }))
  }

  render () {
    const { topic } = this.state

    return (
      <div>
        <SideBar />

        <div className='container-right'>
          { topic === undefined
            ? <CircularProgress size={80} thickness={5} />
          : this.renderPageBody(topic) }
        </div>
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

        <div
          className='topic-content'
          dangerouslySetInnerHTML={{
            __html: markdown.toHTML(topic.content)
          }} />
      </div>
    )
  }

}

export default Topic
