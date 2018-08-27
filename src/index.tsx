import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/blue'
import registerServiceWorker from './registerServiceWorker'
import createStore from './redux/createStore'
import routers from './router'
const store = createStore({})

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' },
  },
})

const renderApp = (store, routers) => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>{routers}</Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
  )
}

renderApp(store, routers)
registerServiceWorker()
