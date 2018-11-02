import { all, fork } from 'redux-saga/effects'
import { watchLogin } from './login'
import { playlistSaga } from './playlist'
import { songSaga } from './song'

export default function* rootSagas() {
  yield all([fork(watchLogin), fork(playlistSaga), fork(songSaga)])
}
