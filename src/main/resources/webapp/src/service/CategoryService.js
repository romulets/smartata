import AuthorizationHelper from '../helper/AuthorizationHelper'

import { CATEGORY_URL } from '../helper/UrlHelper'

export default class CategoryService {

  static _auth = new AuthorizationHelper()

  static getAllCategories() {
    return fetch(CATEGORY_URL, this._auth.getGetHeader())
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

  static getCategory(id) {
    return fetch(CATEGORY_URL + '/' + id, this._auth.getGetHeader())
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

}
