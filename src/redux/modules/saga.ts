import { all, fork } from 'redux-saga/effects'
import { watchLogin } from './login'
import { playlistSaga } from './playlist'

export default function* rootSagas() {
  yield all([fork(watchLogin), fork(playlistSaga)])
}
