import React, { Component } from 'react'

import FABBar from '../../ui/FABBar'
import SideBar from '../../ui/SideBar'
import CollapsedTopic from '../../ui/CollapsedTopic'

import TopicService from '../../service/TopicService'
import CategoryService from '../../service/CategoryService'

class TopicsInCategory extends Component {

  constructor (props) {
    super(props)

    this.state = {
      category: {},
      topics: []
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params

    this.getCategory(id)
    this.getTopics(id)
  }

  getCategory (id) {
    CategoryService.getCategory(id)
      .then(category => this.setState({ category }))
      .catch(console.error)
  }

  getTopics (categoryId) {
    TopicService.getTopicsInCategory(categoryId)
      .then(topics => this.setState({ topics }))
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2>Categoria {this.state.category.name || ''}</h2>

          { this.state.topics.map(t => <CollapsedTopic topic={t} key={t.id} />) }
        </div>

        <FABBar />
      </div>
    )
  }

}

export default TopicsInCategory
