import React, { Component } from 'react'
import PropTypes from 'prop-types'



import { Link } from 'react-router-dom'

import './style/Tag.css'

class Tag extends Component {

  render () {
    const { tag } = this.props
    return (
      <Link to={'/tag/' + tag.key}>
        <span className='tag'>#{ tag.name.replace(' ', '') }</span>
      </Link>
    )
  }

}

Tag.propTypes = {
  tag: PropTypes.object.isRequired
}

export default Tag
