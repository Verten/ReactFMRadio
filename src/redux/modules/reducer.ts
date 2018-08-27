import { combineReducers } from 'redux'
import Login, { ILoginState } from './login'

export interface IRootState {
  Login: ILoginState
}

const rootReducer = combineReducers<IRootState>(
  Object.assign(
    {},
    {
      Login,
    },
  ),
)

export default rootReducer
