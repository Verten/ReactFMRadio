import { createStore, applyMiddleware, Store } from 'redux'
import { createLogger } from 'redux-logger'
import { mapValues } from 'lodash'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './modules/reducer'
import rootSagas from './modules/saga'

const sagaMiddleware = createSagaMiddleware()

const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true,
  stateTransformer: state =>
    mapValues(state, reducer => {
      if (reducer.toJS) {
        return reducer.toJS()
      }
      return reducer
    }),
})

export default function configureStore(initialState: object) {
  const store: Store<any> = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, loggerMiddleware))

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      const nextReducer = require('./modules/reducer')
      store.replaceReducer(nextReducer)
    })
  }

  sagaMiddleware.run(rootSagas)

  return store
}
