import React, { Component } from 'react'

import SideBar from '../../ui/SideBar'
import CollapsedTopic from '../../ui/CollapsedTopic'

class Favorites extends Component {

  constructor (props) {
    super(props)

    this.state = {
      topics: []
    }
  }

  render () {
    return (
      <div>
        <SideBar />

        <div className='container-right'>
          <h2>Favoritos</h2>

          { this.state.topics.map(t => <CollapsedTopic topic={t} key={t.id} />) }
        </div>
      </div>
    )
  }

}

export default Favorites
