import React, { Component } from 'react'

import Snackbar from 'material-ui/Snackbar'
import { Link, Redirect } from 'react-router-dom'
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
    this.handleMethodsBinds()

    this.state = {
      showFavoriteSnackBar: false,
      favoriteMessage: '',
      topicDeleted: false,
      allowEdition: false,
      topic: {}
    }
  }

  handleMethodsBinds () {
    this.deleteTopic = this.deleteTopic.bind(this)
    this.favoriteTopic = this.favoriteTopic.bind(this)
  }

  deleteTopic () {
    const { topic } = this.state

    if (topic.id === undefined) return

    TopicService.deleteTopic(topic.id)
      .then(() => this.setState({ topicDeleted: true }))
      .catch(console.error)
  }

  favoriteTopic () {
    const { topic } = this.state

    if (topic.id === undefined) return

    TopicService.favoriteTopic(topic.id)
      .then(r => {
        topic.favorited = r.favorite

        let message
        if (topic.favorited) {
          message = 'Tópico adicionado aos favoritos'
        } else {
          message = 'Tópico removido dos favoritos'
        }

        this.setState({
          topic,
          showFavoriteSnackBar: true,
          favoriteMessage: message
        })
      })
      .catch(console.error)
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
        allowEdition: topic.createdBy.id === u.id,
        showFavoriteSnackBar: false
      }))
    })
  }

  render () {
    const { topic, topicDeleted } = this.state

    if (topicDeleted) {
      return <Redirect to='/topics' />
    }

    return (
      <div>
        <SideBar />

        <div className='container-right'>
          { topic.id === undefined
            ? <CircularProgress size={80} thickness={5} />
          : this.renderPageBody(topic) }
        </div>

        <FABBar
          editMode={this.state.allowEdition}
          topic={topic.id ? topic : undefined}
          onConfirmDelete={this.deleteTopic}
          onFavoritePressed={this.favoriteTopic} />
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

        <Snackbar
          open={this.state.showFavoriteSnackBar}
          message={this.state.favoriteMessage}
          autoHideDuration={6000} />

      </div>
    )
  }

}

export default Topic
