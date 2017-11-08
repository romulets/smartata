import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border'

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

  renderDeleteModal () {
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

    return <Dialog
      actions={actions}
      modal={false}
      open={this.state.openDeleteDialog}
      onRequestClose={this.handleCloseDeleteDialog} >
      Deletar Tópico?
     </Dialog>
  }

  renderDeleteButton () {
    if (!this.props.editMode) return

    return <FloatingActionButton mini onClick={this.handleOpenDeleteDialog}>
      <ActionDelete />
    </FloatingActionButton>
  }

  renderEditButton () {
    if (!this.props.editMode) return

    return <Link to={'/topic/edit/' + this.props.topic.id}>
      <FloatingActionButton mini>
        <EditorModeEdit />
      </FloatingActionButton>
    </Link>
  }

  renderFavoriteButton () {
    if (this.props.topic === undefined) return

    return <FloatingActionButton mini onClick={this.props.onFavoritePressed}>
      { this.props.topic.favorited ? <ToggleStar /> : <ToggleStarBorder /> }
    </FloatingActionButton>
  }

  renderAddButton () {
    return <Link to='/topic/add'>
      <FloatingActionButton secondary>
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  }

  render () {
    return (
      <div>

        {this.renderDeleteModal()}

        <div className='fab-bar'>
          <ul>
            <li className='fab-mini fab-fav-topic'>{this.renderFavoriteButton()}</li>
            <li className='fab-mini fab-delete-topic'>{this.renderDeleteButton()}</li>
            <li className='fab-mini fab-edit-topic'>{this.renderEditButton()}</li>
            <li className='fab-add-topic'>{this.renderAddButton()}</li>
          </ul>
        </div>
      </div>
    )
  }

}

FABBar.propTypes = {
  editMode: PropTypes.bool,
  topic: PropTypes.object,
  onConfirmDelete: PropTypes.func,
  onFavoritePressed: PropTypes.func
}

export default FABBar
