import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import './style/FABBar.css'

export default class FABBar extends Component {

  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div className='fab-bar'>
        <Link to='/topic/add'>
          <FloatingActionButton secondary className='fab-add-topic'>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    )
  }

}
