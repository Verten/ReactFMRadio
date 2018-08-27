import { all, fork } from 'redux-saga/effects'
import { watchLogin } from './login'

export default function* rootSagas() {
  yield all([fork(watchLogin)])
}
