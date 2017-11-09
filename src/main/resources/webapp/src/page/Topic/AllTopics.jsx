import React, { Component } from 'react'

import FABBar from '../../ui/FABBar'
import SideBar from '../../ui/SideBar'
import queryString from 'query-string'
import SearchBar from '../../ui/SearchBar'
import CollapsedTopic from '../../ui/CollapsedTopic'

import TopicService from '../../service/TopicService'

import './style/AllTopics.css'

class AllTopics extends Component {

  constructor (props) {
    super(props)
    this.bindMethods()

    const { search } = queryString.parse(this.props.location.search)

    this.state = {
      search: search || '',
      topics: []
    }
  }

  bindMethods () {
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    const { search } = this.state

    if (this.state.search) {
      this.search(search)
    } else {
      this.getTopics()
    }
  }

  getTopics () {
    TopicService.getAllTopics()
      .then(topics => this.setState({ topics }))
  }

  search (search) {
    if (!search || search === '') {
      this.getTopics()
      return
    }

    TopicService.searchTopics(search)
      .then(topics => this.setState({ topics }))
  }

  render () {
    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2 className='searchable-title'>
            <span className='title-text'>Todos os Tópicos</span>
            <SearchBar
              onSearch={this.search}
              className='search-bar'
              defaultSearch={this.state.search} />
          </h2>

          { this.state.topics.map(t => <CollapsedTopic topic={t} key={t.id} />) }
        </div>

        <FABBar />
      </div>
    )
  }

}

export default AllTopics
