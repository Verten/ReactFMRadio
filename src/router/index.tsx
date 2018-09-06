import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import NotFoundPage from '../pages/NotFound'

const routers: () => JSX.Element = () => (
  <Switch>
    <Route exact={true} path="/" component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/*" component={NotFoundPage} />
  </Switch>
)

export default routers
