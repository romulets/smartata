import React, { Component } from 'react'

import FABBar from '../../ui/FABBar'
import SideBar from '../../ui/SideBar'
import CollapsedTopic from '../../ui/CollapsedTopic'

import TopicService from '../../service/TopicService'

class AllTopics extends Component {

  constructor (props) {
    super(props)

    this.state = {
      topics: []
    }
  }

  componentDidMount () {
    this.getTopics()
  }

  getTopics () {
    TopicService.getAllTopics()
      .then(topics => this.setState({ topics }))
  }

  render () {
    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2>Todos os Tópicos</h2>

          { this.state.topics.map(t => <CollapsedTopic topic={t} key={t.id} />) }
        </div>

        <FABBar />
      </div>
    )
  }

}

export default AllTopics
