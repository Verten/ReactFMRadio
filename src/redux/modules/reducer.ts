import { combineReducers } from 'redux'
import Login, { ILoginState } from './login'
import Playlist, { IPlaylistState } from './playlist'

export interface IRootState {
  Login: ILoginState
  Playlist: IPlaylistState
}

const rootReducer = combineReducers<IRootState>(
  Object.assign(
    {},
    {
      Login,
      Playlist,
    },
  ),
)

export default rootReducer
