import React, { Component } from 'react'

import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'
import { Redirect } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'

import Tag from './Tag'
import SideBar from './SideBar'
import TopicContent from './TopicContent'

import TopicService from '../service/TopicService'
import CategoryService from '../service/CategoryService'

import './style/TopicForm.css'

class TopicForm extends Component {

  constructor (props) {
    super(props)
    this.handleMethodsBinds()

    this.state = {
      actionFinished: false,
      showErrorSnackbar: false,
      categories: [],
      topic: {
        title: null,
        content: null,
        tags: [],
        category: {
          id: null
        }
      }
    }
  }

  componentDidMount () {
    this.getCategories()
  }

  getCategories () {
    CategoryService.getAllCategories()
      .then(categories => this.setState({ categories }))
  }

  handleMethodsBinds () {
    this.handleTopicChange = this.handleTopicChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  handleTopicChange (e) {
    const target = e.target
    const value = target.value
    const name = target.name

    const { topic } = this.state
    topic[name] = value

    this.setState({
      topic,
      showErrorSnackbar: false
    })
  }

  handleCategoryChange (e, index, value) {
    const { topic } = this.state
    topic.category.id = value

    this.setState({
      topic,
      showErrorSnackbar: false
    })
  }

  handleTagsChange (e, value) {
    const { topic } = this.state
    const tags = value.split(' ')
                  .map(s => s.trim().replace(/[^0-9a-zA-Z]/g, ''))
                  .filter(s => s.length > 0)

    const uniqueTags = new Set(tags)
    topic.tags = Array.from(uniqueTags).map(s => { return {name: s} })

    this.setState({
      topic,
      showErrorSnackbar: false
    })
  }

  submit () {
    const { topic } = this.state

    let promise
    if (topic.id) {
      promise = TopicService.putTopic(topic.id, topic)
    } else {
      promise = TopicService.postTopic(topic)
    }

    promise.then(topic => this.setState({
      topic,
      actionFinished: true
    }))
        .catch(() => this.setState({showErrorSnackbar: true}))
  }

  render () {
    const { topic } = this.state

    if (this.state.actionFinished) {
      if (topic.id) return <Redirect to={'/topic/' + topic.id} />
      return <Redirect to='/topics' />
    }

    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2> { topic.title ? topic.title : 'Novo Tópico' } </h2>

          <div className='topic-form'>
            <form onSubmit={this.submit}>
              <TextField
                name='title'
                floatingLabelText='Titulo'
                onChange={this.handleTopicChange}
                fullWidth />

              <br />

              <SelectField
                name='category'
                value={topic.category.id}
                floatingLabelText='Categoria'
                onChange={this.handleCategoryChange}
                fullWidth >

                {
                  this.state.categories
                    .map(c => <MenuItem key={c.id} value={c.id} primaryText={c.name} />)
                }

              </SelectField>

              <br />

              <TextField
                name='tags'
                floatingLabelText='Tags'
                onChange={this.handleTagsChange}
                fullWidth />

              <div className='topic-tags'>
                { topic.tags.map(t => <Tag key={t.name} tag={t} />) }
              </div>

              <TextField
                name='content'
                floatingLabelText='Conteúdo'
                multiLine
                onChange={this.handleTopicChange}
                fullWidth />

              <br />

              <a className='foot-note' target='_blank' href='https://guides.github.com/features/mastering-markdown/'>
                Github markdown style
              </a>

              <RaisedButton
                label='Salvar'
                secondary
                fullWidth
                className='topic-submit'
                onClick={this.submit} />

            </form>
          </div>

          <div className='topic-preview'>
            <TopicContent content={topic.content || ''} />
          </div>

          <Snackbar
            open={this.state.showErrorSnackbar}
            message='Problemas ao salvar tópico'
            autoHideDuration={4000} />

        </div>
      </div>
    )
  }

}

export default TopicForm
