import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ContentAdd from 'material-ui/svg-icons/content/add'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import './style/FABBar.css'

class FABBar extends Component {

  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div className='fab-bar'>

        {
          (() => {
            if (this.props.editMode) {
              return <Link to={'/topic/edit/' + this.props.topicId}>
                <FloatingActionButton mini className='fab-edit-topic'>
                  <EditorModeEdit />
                </FloatingActionButton>
              </Link>
            }
          })()
        }

        <Link to='/topic/add'>
          <FloatingActionButton secondary className='fab-add-topic'>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    )
  }

}

FABBar.propTypes = {
  editMode: PropTypes.bool,
  topicId: PropTypes.number
}

export default FABBar
