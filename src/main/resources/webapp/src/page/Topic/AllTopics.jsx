import React, { Component } from 'react'

class AllTopics extends Component {

  constructor (props) {
    super(props)

    this.LOGIN_URL = '/smartata/api/login'
    this.handleMethodsBinds()

    this.state = {
      topics: []
    }
  }

  handleMethodsBinds () {

  }

  componentDidMount () {

  }

  getTopics () {

  }

  render () {
    return (
      <div>
        <p>All Topics</p>
      </div>
    )
  }

}

export default AllTopics
