import React, { Component } from 'react'

import FABBar from '../../ui/FABBar'
import SideBar from '../../ui/SideBar'
import CollapsedTopic from '../../ui/CollapsedTopic'

import TagService from '../../service/TagService'
import TopicService from '../../service/TopicService'

class TopicsTagged extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tag: {},
      topics: []
    }
  }

  componentDidMount () {
    const { key } = this.props.match.params

    this.getTopics(key)
    this.getTag(key)
  }

  getTag (key) {
    TagService.getTag(key)
      .then(tag => this.setState({ tag }))
      .catch(console.error)
  }

  getTopics (tagKey) {
    TopicService.getTaggedTopics(tagKey)
      .then(topics => this.setState({ topics }))
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2>Tag #{this.state.tag.name || ''}</h2>

          { this.state.topics.map(t => <CollapsedTopic topic={t} key={t.id} />) }
        </div>

        <FABBar />
      </div>
    )
  }

}

export default TopicsTagged
