
export default class AuthorizationHelper {

  constructor () {
    this.token = this.getTokenInCookies()
  }

  getTokenInCookies () {
    const prefix = 'authorizationToken='
    const cookies = document.cookie
                  .split(';')
                  .map(s => window.decodeURI(s.trim()))
                  .filter(s => s.startsWith(prefix))
                  .map(s => s.replace(prefix, ''))

    if (cookies.length === 0) return null
    return cookies[0]
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
