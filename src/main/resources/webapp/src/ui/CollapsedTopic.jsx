import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Description from 'material-ui/svg-icons/action/description'
import {teal800} from 'material-ui/styles/colors'

import { Link } from 'react-router-dom'

import Tag from './Tag'

import './style/CollapsedTopic.css'

class CollapsedTopic extends Component {

  render () {
    const { topic } = this.props
    return (
      <div className='collapsed-topic'>
        <div className='ct-side-bar'>
          <Description
            color={teal800} />
        </div>

        <div className='ct-body'>
          <Link to={'/topic/' + topic.id}>
            <h3 className='ct-title'>{ topic.title }</h3>
          </Link>

          <Link to={'/category/' + topic.category.id}>
            <span className='ct-category'>{ topic.category.name }</span>
          </Link>

          <div className='ct-tags'>
            { topic.tags.map(t => <Tag key={t.key} tag={t} />) }
          </div>
        </div>
      </div>
    )
  }

}

CollapsedTopic.propTypes = {
  topic: PropTypes.object.isRequired
}

export default CollapsedTopic
