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

  static postTopic(topic) {
    return fetch(TOPIC_URL, this._auth.getPostHeader(topic))
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

  static putTopic(id, topic) {
    return fetch(TOPIC_URL + '/' + id, this._auth.getPutHeader(topic))
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

  static deleteTopic(id) {
    return fetch(TOPIC_URL + '/' + id, this._auth.getDeleteHeader())
            .then(r => {
              if (r.status === 200) return
              throw r.json()
            })
  }

  static favoriteTopic(id) {
    const url = TOPIC_URL + '/' + id + '/favorite'
    return fetch(url, this._auth.getPostHeaderNoBody())
            .then(r => {
              if (r.status === 200) return r.json()
              throw r.json()
            })
  }

}
