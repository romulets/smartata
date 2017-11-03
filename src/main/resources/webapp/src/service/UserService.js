import AuthorizationHelper from '../helper/AuthorizationHelper'

import { USER_URL } from '../helper/UrlHelper'

export default class UserService {

  static _user = null
  static _invalid = false
  static _auth = new AuthorizationHelper()

  static getUser () {
    return new Promise((resolve, reject) => {
      if (this._invalid) reject(new Error('Could not retrieve user'))

      if (this._user == null) {
        resolve(this.fetchUser())
      }

      resolve(this._user)
    })
  }

  static fetchUser () {
    if (this._auth.token == null) {
      this._invalid = true
      return
    }

    return fetch(USER_URL, this._auth.getGetHeader())
      .then(r => {
        if (r.status === 200) return r.json()
        throw r.json()
      })
      .catch(user => {
        this._invalid = true
        throw new Error('Could not retrieve user')
       })
      .then(user => {
        this._user = user
        return user
      })

  }
}
