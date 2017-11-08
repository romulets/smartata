import AuthorizationHelper from '../helper/AuthorizationHelper'

import { TAG_URL } from '../helper/UrlHelper'

export default class TagService {

  static _auth = new AuthorizationHelper()

  static getTag(key) {
    return fetch(TAG_URL + '/' + key, this._auth.getGetHeader())
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

}
