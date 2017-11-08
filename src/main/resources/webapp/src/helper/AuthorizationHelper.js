import Cookies from 'js-cookie'

export default class AuthorizationHelper {

  constructor () {
    this.token = this.getTokenInCookies()
  }

  getTokenInCookies () {
    return Cookies.get('authorizationToken')
  }

  getGetHeader () {
    return {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': this.token
      }
    }
  }

  getPostHeader (obj) {
    let headers = this.getPostHeaderNoBody()
    headers.body = JSON.stringify(obj)
    return headers
  }

  getPostHeaderNoBody () {
    return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }
  }

  getPutHeader (obj) {
    return {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token,
        'Origin': window.location.origin
      }
    }
  }

  getDeleteHeader () {
    return {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': this.token,
        'Origin': window.location.origin
      }
    }
  }

}
