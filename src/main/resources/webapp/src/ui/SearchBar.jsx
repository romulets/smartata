import React, { Component } from 'react'

import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ActionSearch from 'material-ui/svg-icons/action/search'

class SearchBar extends Component {

  constructor (props) {
    super(props)
    this.bindMethods()

    this.state = {
      search: ''
    }
  }

  bindMethods () {
    this.handleSearchChanged = this.handleSearchChanged.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    const { defaultSearch } = this.props

    if (defaultSearch) {
      this.setState({ search: defaultSearch })
    }
  }

  handleSearchChanged (evt, value) {
    this.setState({ search: value })
  }

  search () {
    this.props.onSearch(this.state.search)
  }

  render () {
    return (
      <div className={this.props.className}>
        <TextField
          name='search'
          value={this.state.search}
          floatingLabelText='Conteúdo, categoria ou keyword'
          onChange={this.handleSearchChanged} />

        <FlatButton
          primary
          label='Buscar'
          icon={<ActionSearch />}
          onClick={this.search} />
      </div>
    )
  }

}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  defaultSearch: PropTypes.string
}

export default SearchBar
