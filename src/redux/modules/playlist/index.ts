import { call, put, all, fork, takeEvery } from 'redux-saga/effects'
import { API_CONTEXT_PATH } from '../../../constants'
import { API, constructFetchConfig, httpMethod, initError, checkAPIStatusCode } from '../../../utilities'

export const FETCH_PLAYLIST: string = '@react-template/FETCH_PLAYLIST'
export const FETCH_PLAYLIST_SUCCESS: string = '@react-template/FETCH_PLAYLIST_SUCCESS'
export const FETCH_PLAYLIST_FAILED: string = '@react-template/FETCH_PLAYLIST_FAILED'

export const FETCH_HOT_PLAYLIST: string = '@react-template/FETCH_HOT_PLAYLIST'
export const FETCH_HOT_PLAYLIST_SUCCESS: string = '@react-template/FETCH_HOT_PLAYLIST_SUCCESS'
export const FETCH_HOT_PLAYLIST_FAILED: string = '@react-template/FETCH_HOT_PLAYLIST_FAILED'

export const FETCH_TOP_PLAYLIST: string = '@react-template/FETCH_TOP_PLAYLIST'
export const FETCH_TOP_PLAYLIST_SUCCESS: string = '@react-template/FETCH_TOP_PLAYLIST_SUCCESS'
export const FETCH_TOP_PLAYLIST_FAILED: string = '@react-template/FETCH_TOP_PLAYLIST_FAILED'

export const FETCH_PLAYLIST_DETAIL: string = '@react-template/FETCH_PLAYLIST_DETAIL'
export const FETCH_PLAYLIST_DETAIL_SUCCESS: string = '@react-template/FETCH_PLAYLIST_DETAIL_SUCCESS'
export const FETCH_PLAYLIST_DETAIL_FAILED: string = '@react-template/FETCH_PLAYLIST_DETAIL_FAILED'

const playlistApi: object = {
  [FETCH_PLAYLIST]: `${API_CONTEXT_PATH}/playlist/catlist`,
  [FETCH_HOT_PLAYLIST]: `${API_CONTEXT_PATH}/playlist/hot`,
  [FETCH_TOP_PLAYLIST]: `${API_CONTEXT_PATH}/top/playlist`,
  [FETCH_PLAYLIST_DETAIL]: `${API_CONTEXT_PATH}/playlist/detail`,
}

interface IPlaylistAction {
  type: string
  id?: number
  payload?: {
    playlists?: object[]
    playlist?: object
  }
  error?: object
}

interface IPlaylistDetail {
  subscribers?: object[]
  creator?: object
  tracks?: object[]
}

interface IPlaylists {
  id?: number
  name?: string
}

export interface IPlaylistState {
  playlistDetail: IPlaylistDetail | undefined | null
  playlists: IPlaylists[] | undefined | null
  error: object | undefined | null
  isProcessing: boolean
}

const initialState: IPlaylistState = {
  playlists: undefined,
  playlistDetail: undefined,
  error: undefined,
  isProcessing: false,
}

// reducer
export default (state: IPlaylistState = initialState, action: IPlaylistAction): IPlaylistState => {
  switch (action.type) {
    case FETCH_TOP_PLAYLIST:
      return {
        ...state,
        playlists: [],
        isProcessing: true,
      }
    case FETCH_TOP_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: action.payload.playlists,
        isProcessing: false,
      }
    case FETCH_TOP_PLAYLIST_FAILED:
      return {
        ...state,
        playlists: [],
        error: action.error,
        isProcessing: false,
      }
    case FETCH_PLAYLIST_DETAIL:
      return {
        ...state,
        playlistDetail: undefined,
        isProcessing: true,
      }
    case FETCH_PLAYLIST_DETAIL_SUCCESS:
      return {
        ...state,
        playlistDetail: action.payload.playlist,
        isProcessing: false,
      }
    case FETCH_PLAYLIST_DETAIL_FAILED:
      return {
        ...state,
        playlistDetail: undefined,
        error: action.error,
        isProcessing: false,
      }
    default:
      return { ...state }
  }
}

// action
export const fetchHotPlaylist = (): IPlaylistAction => {
  return {
    type: FETCH_HOT_PLAYLIST,
  }
}

export const fetchHotPlaylistSuccess = (payload: object): IPlaylistAction => {
  return {
    type: FETCH_HOT_PLAYLIST_SUCCESS,
    payload,
  }
}

export const fetchHotPlaylistFailed = (error: object): IPlaylistAction => {
  return {
    type: FETCH_HOT_PLAYLIST_FAILED,
    error,
  }
}

export const fetchTopPlaylist = (): IPlaylistAction => {
  return {
    type: FETCH_TOP_PLAYLIST,
  }
}

export const fetchTopPlaylistSuccess = (payload: object): IPlaylistAction => {
  return {
    type: FETCH_TOP_PLAYLIST_SUCCESS,
    payload,
  }
}

export const fetchTopPlaylistFailed = (error: object): IPlaylistAction => {
  return {
    type: FETCH_TOP_PLAYLIST_FAILED,
    error,
  }
}

export const fetchPlaylistDetail = (id: number): IPlaylistAction => {
  return {
    type: FETCH_PLAYLIST_DETAIL,
    id,
  }
}

export const fetchPlaylistDetailSuccess = (payload: object): IPlaylistAction => {
  return {
    type: FETCH_PLAYLIST_DETAIL_SUCCESS,
    payload,
  }
}

export const fetchPlaylistDetailFailed = (error: object): IPlaylistAction => {
  return {
    type: FETCH_PLAYLIST_DETAIL_FAILED,
    error,
  }
}

// saga
function* fetchHotPlaylistSaga(action: IPlaylistAction) {
  const { url, config } = constructFetchConfig(playlistApi[action.type], httpMethod.GET, {})
  try {
    const payload = yield call(API, url, config)
    if (checkAPIStatusCode(payload)) {
      yield put(fetchHotPlaylistSuccess(payload))
    } else {
      yield put(fetchHotPlaylistFailed(yield call(initError, url, { error: payload.code })))
    }
  } catch (error) {
    yield put(fetchHotPlaylistFailed(yield call(initError, url, error)))
  }
}

function* fetchTopPlaylistSaga(action: IPlaylistAction) {
  const { url, config } = constructFetchConfig(playlistApi[action.type], httpMethod.GET, {})
  try {
    const payload = yield call(API, url, config)
    if (checkAPIStatusCode(payload)) {
      yield put(fetchTopPlaylistSuccess(payload))
    } else {
      yield put(fetchTopPlaylistFailed(yield call(initError, url, { error: payload.code })))
    }
  } catch (error) {
    yield put(fetchTopPlaylistFailed(yield call(initError, url, error)))
  }
}

function* fetchPlaylistDetailSaga(action: IPlaylistAction) {
  const { url, config } = constructFetchConfig(playlistApi[action.type], httpMethod.GET, { id: action.id })
  try {
    const payload = yield call(API, url, config)
    if (checkAPIStatusCode(payload)) {
      yield put(fetchPlaylistDetailSuccess(payload))
    } else {
      yield put(fetchPlaylistDetailFailed(yield call(initError, url, { error: payload.code })))
    }
  } catch (error) {
    yield put(fetchPlaylistDetailFailed(yield call(initError, url, error)))
  }
}

function* watchFetchHotPlaylistSaga() {
  yield takeEvery(FETCH_HOT_PLAYLIST, fetchHotPlaylistSaga)
}

function* watchFetchTopPlaylistSaga() {
  yield takeEvery(FETCH_TOP_PLAYLIST, fetchTopPlaylistSaga)
}

function* watchFetchPlaylistDetailSaga() {
  yield takeEvery(FETCH_PLAYLIST_DETAIL, fetchPlaylistDetailSaga)
}

export function* playlistSaga() {
  yield all([fork(watchFetchHotPlaylistSaga), fork(watchFetchTopPlaylistSaga), fork(watchFetchPlaylistDetailSaga)])
}
