import { call, put, all, fork, takeEvery } from 'redux-saga/effects'
import { API_CONTEXT_PATH } from '../../../constants'
import { API, constructFetchConfig, httpMethod, initError, checkAPIStatusCode } from '../../../utilities'

export const FETCH_SONG: string = '@react-template/FETCH_SONG'
export const FETCH_SONG_SUCCESS: string = '@react-template/FETCH_SONG_SUCCESS'
export const FETCH_SONG_FAILED: string = '@react-template/FETCH_SONG_FAILED'

const songApi: object = {
  [FETCH_SONG]: `${API_CONTEXT_PATH}/song/url`,
}

interface ISongAction {
  type: string
  id?: number
  payload?: {
    data?: ISongProps[]
  }
  error?: object
}

export interface ISongState {
  data: ISongProps[]
  error: object
  isProcessing: boolean
}

export interface ISongProps {
  id: number
  url: string
}

const initialState: ISongState = {
  data: null,
  error: null,
  isProcessing: false,
}

// reducer
export default (state: ISongState = initialState, action: ISongAction): ISongState => {
  switch (action.type) {
    case FETCH_SONG:
      return {
        ...state,
        data: null,
        error: null,
        isProcessing: true,
      }
    case FETCH_SONG_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null,
        isProcessing: false,
      }
    case FETCH_SONG_FAILED:
      return {
        ...state,
        data: null,
        error: action.error,
        isProcessing: false,
      }
    default:
      return {
        ...state,
      }
  }
}

// action
export const fetchSong = (id: number): ISongAction => ({
  type: FETCH_SONG,
  id,
})

export const fetchSongSuccess = (payload): ISongAction => ({
  type: FETCH_SONG_SUCCESS,
  payload,
})

export const fetchSongFailed = (error): ISongAction => ({
  type: FETCH_SONG_FAILED,
  error,
})

// saga
function* fetchSongSaga(action: ISongAction) {
  const { url, config } = constructFetchConfig(songApi[action.type], httpMethod.GET, { id: action.id })
  try {
    const payload = yield call(API, url, config)
    if (checkAPIStatusCode(payload)) {
      yield put(fetchSongSuccess(payload))
    } else {
      yield put(fetchSongFailed(yield call(initError, url, { error: payload.code })))
    }
  } catch (error) {
    yield put(fetchSongFailed(yield call(initError, url, error)))
  }
}

function* watchFetchSongSaga() {
  yield takeEvery(FETCH_SONG, fetchSongSaga)
}

export function* songSaga() {
  yield all([fork(watchFetchSongSaga)])
}
