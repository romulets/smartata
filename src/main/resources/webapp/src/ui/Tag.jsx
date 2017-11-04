import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import './style/Tag.css'

class Tag extends Component {

  render () {
    const { tag } = this.props

    if (tag.key) {
      return (
        <Link to={'/tag/' + tag.key}>
          <span className='tag'>#{ tag.name.replace(' ', '') }</span>
        </Link>
      )
    } else {
      return <span className='tag'>#{ tag.name.replace(' ', '') }</span>
    }
  }

}

Tag.propTypes = {
  tag: PropTypes.object.isRequired
}

export default Tag
