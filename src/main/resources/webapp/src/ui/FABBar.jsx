import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import './style/FABBar.css'

class FABBar extends Component {

  constructor (props) {
    super(props)
    this.handleMethodsBinds()

    this.state = {
      open: false,
      openDeleteDialog: false
    }
  }

  handleMethodsBinds () {
    this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this)
  }

  handleCloseDeleteDialog () {
    this.setState({ openDeleteDialog: false })
  }

  handleConfirmDelete () {
    this.props.onConfirmDelete()
    this.handleCloseDeleteDialog()
  }

  handleOpenDeleteDialog () {
    this.setState({ openDeleteDialog: true })
  }

  renderEditableButtons () {
    if (!this.props.editMode) return

    const actions = [
      <FlatButton
        label='Não'
        primary
        onClick={this.handleCloseDeleteDialog}
      />,
      <FlatButton
        label='Sim'
        secondary
        onClick={this.handleConfirmDelete}
      />
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.openDeleteDialog}
          onRequestClose={this.handleCloseDeleteDialog} >
          Deletar Tópico?
         </Dialog>

        <FloatingActionButton mini className='fab-delete-topic' onClick={this.handleOpenDeleteDialog}>
          <ActionDelete />
        </FloatingActionButton>

        <Link to={'/topic/edit/' + this.props.topicId}>
          <FloatingActionButton mini className='fab-edit-topic'>
            <EditorModeEdit />
          </FloatingActionButton>
        </Link>
      </div>
    )
  }

  render () {
    return (
      <div className='fab-bar'>

        {this.renderEditableButtons()}

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
  topicId: PropTypes.number,
  onConfirmDelete: PropTypes.func
}

export default FABBar
