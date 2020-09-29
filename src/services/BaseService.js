import request from 'superagent'

import {
    each,
    keys,
    some,
    extend,
    isObject
} from 'underscore'

import MockServer from '../lib/mock/MockServer'
import ServerError from '../lib/errors/ServerError'

import config from '../config'

const notImplementedTemplates = [
  '/appointments',
  // '/clients'
]

// срабатывает в случае успешной отработки сервера
function onSuccess(response) {
  let parsed = {}

// парсим JSON-строку ответа сервера вручную
  try {
      parsed = JSON.parse(response.text)
  } catch (e) {
      throw {
          status: 'Response parse error',
          body: response.body
      }
  }

  const body = parsed.body
  const status = parsed.statusCode

  // отсечём лишние данные из ответа сервера
  if ((status === 200 || status === 201) && body.success !== false) {
    return body
  }

  throw new ServerError({ status, ...body.error })
}

// срабатывает в случае сбоя на сервере (сервер мёртв, не отвечает и пр.), 
// а не просто ошибки в серверной бизнес-логике.
function onFailure(response) {
    const {
        status,
        message,
        response: { body }
    } = response

    throw new ServerError({
        body,
        status,
        code: 'internal.server.error',
        message: body.message || message
    })
}

export default class BaseService {
  request(opts) {

    opts = {
      method: 'GET',
      url: null,
      body: null,
      type: 'form',
      params: null,
      callback: null,
      ...opts
    }

    const { remote } = config

    // проверяем, реализован ли на сервере данный API
    const isNotImplemented = some(notImplementedTemplates, t => {
        return opts.url.includes(t)
    })

    if (!remote.isEnabled || isNotImplemented) {
        return MockServer.service({
          method: 'GET',
          url: null,
          body: null,
          params: null,
          ...opts
        }).then(onSuccess)
    }

    else {
      const { type, method } = opts
      const url = `${remote.url}${opts.url}`

      if (method === 'GET') {
          let rq = request.get(url)
              .query(opts.params)
              .timeout({response: config.responseTimeout})

          const {headers} = opts
          if (headers) {
              each(keys(headers), key => {
                  rq.set(key, headers[key])
              })
          }

          return rq.then(onSuccess, onFailure)
      }

      if (method === 'POST' || method === 'PUT') {
          let rq = request(method, url).type(type)
              .timeout({response: config.responseTimeout})

          if (type === 'multipart/form-data') {
              each(opts.body, (v, k) => {
                  if (v instanceof File) {
                      rq = rq.attach(k, v)
                  }

                  else {
                      if (isObject(v)) {
                          v = JSON.stringify(v)
                      }
                      rq = rq.field(k, v)
                  }
              })
          } else {
              rq = rq.send(opts.body)
          }

          return rq.then(onSuccess, onFailure)
      }
      
      if (method === 'DELETE') {
          return request
              .del(url)
              .timeout({response: config.responseTimeout})
              .then(onSuccess, onFailure)
      }
    }    
  }
}
