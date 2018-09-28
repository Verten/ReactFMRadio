import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import PlaylistPage from '../pages/Playlist'
import PlaylistDetailPage from '../pages/Playlist/PlaylistDetail'
import LoginPage from '../pages/Login'
import NotFoundPage from '../pages/NotFound'

const routers: () => JSX.Element = () => (
  <Switch>
    <Route exact={true} path="/" component={PlaylistPage} />
    <Route path="/playlist/:id" component={PlaylistDetailPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/*" component={NotFoundPage} />
  </Switch>
)

export default routers
