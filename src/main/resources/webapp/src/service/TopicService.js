import AuthorizationHelper from '../helper/AuthorizationHelper'

import { TOPIC_URL } from '../helper/UrlHelper'

export default class TopicService {

  static _auth = new AuthorizationHelper()

  static getAllTopics() {
    return fetch(TOPIC_URL, this._auth.getGetHeader())
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

  static getTopic(id) {
    return fetch(TOPIC_URL + '/' + id, this._auth.getGetHeader())
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

}
