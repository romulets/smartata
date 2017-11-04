import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { markdown } from 'markdown'

import './style/TopicContent.css'

class TopicContent extends Component {

  render () {
    const { content } = this.props

    return <div
      className='topic-content'
      dangerouslySetInnerHTML={{
        __html: markdown.toHTML(content || '')
      }} />
  }

}

TopicContent.propTypes = {
  content: PropTypes.string.isRequired
}

export default TopicContent
