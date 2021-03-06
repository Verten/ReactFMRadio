import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/blue'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import createStore from './redux/createStore'

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' },
  },
})

const store = createStore({})

const renderApp = () => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
  )
}

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // only need replace entry point
    module.hot.accept('./App', () => {
      renderApp()
    })
  }
}

renderApp()
registerServiceWorker()
