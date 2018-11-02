import { combineReducers } from 'redux'
import Login, { ILoginState } from './login'
import Playlist, { IPlaylistState } from './playlist'
import Song, { ISongState } from './song'

export interface IRootState {
  Login: ILoginState
  Playlist: IPlaylistState
  Song: ISongState
}

const rootReducer = combineReducers<IRootState>(
  Object.assign(
    {},
    {
      Login,
      Playlist,
      Song,
    },
  ),
)

export default rootReducer
