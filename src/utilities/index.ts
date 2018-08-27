import 'isomorphic-fetch'

function checkStatus(response) {
  if (!response.ok) {
    const error = { ...response }
    error.response = response
    throw error
  }
  return response
}

function parseJSON(response) {
  return response.text().then(text => {
    return text ? JSON.parse(text) : {}
  })
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callAPI(url, config, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request())
    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(onRequestSuccess(json))
      })
      .catch(error => {
        console.debug(`error with api:${url}`, error)
        const response = error.response
        if (response === undefined) {
          dispatch(onRequestFailure(error))
        } else {
          error.status = response.status
          error.statusText = response.statusText
          response.text().then(text => {
            try {
              const json = JSON.parse(text)
              Object.assign(error, json)
            } catch (ex) {
              error.message = text
            }
            dispatch(onRequestFailure(error))
          })
        }
      })
  }
}

export function API(url, config) {
  return fetch(url, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      return json
    })
}

export function initError(url, error) {
  console.debug(`error with api:${url}`, error)
  const response = error.response
  if (response === undefined) {
    return error
  } else {
    error.status = response.status
    error.statusText = response.statusText
    return response.text().then(text => {
      try {
        const json = JSON.parse(text)
        Object.assign(error, json)
      } catch (ex) {
        error.message = text
      }
      return error
    })
  }
}

/* like:  constructFetchConfig('url', GET', {param1: '1', param2: '2'})
*         constructFetchConfig('url', POST', {param1: '1', param2: '2'})
*
*/
interface IHttpConfig {
  mode: string
  credentials: string
  headers: object
  method?: string
  body?: string
}

interface IConfig {
  config: IHttpConfig
  url: string
}

export enum httpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export function constructFetchConfig(url: string, method: httpMethod, parameter: object): IConfig {
  const config: IHttpConfig = {
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  let queryString: string = ''
  const httpMethodList: string[] = ['GET', 'POST', 'DELETE', 'PUT']
  if (httpMethodList.every(tmpMethod => tmpMethod !== method.toUpperCase())) {
    console.error('invalid http method')
  } else {
    config.method = method.toUpperCase()
    const keys = Object.keys(parameter)
    if (method.toUpperCase() === 'GET') {
      keys.forEach(key => (queryString = `${queryString}&${key}=${parameter[key]}`))
      queryString = queryString.slice(1)
      console.info(`${url}?${queryString}`)
    } else {
      const payload = {}
      keys.forEach(key => (payload[key] = parameter[key]))
      config.body = JSON.stringify(payload)
    }
  }
  return {
    config,
    url: `${url}?${queryString}`,
  }
}
