import React, { Component } from 'react'

import FABBar from '../../ui/FABBar'
import SideBar from '../../ui/SideBar'
import CollapsedTopic from '../../ui/CollapsedTopic'

import TopicService from '../../service/TopicService'

class Published extends Component {

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
    TopicService.getOwnedTopics()
      .then(topics => this.setState({ topics }))
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2>Publicados</h2>

          { this.state.topics.map(t => <CollapsedTopic topic={t} key={t.id} />) }
        </div>

        <FABBar />
      </div>
    )
  }

}

export default Published
