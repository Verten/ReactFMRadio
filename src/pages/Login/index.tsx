import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { IRootState } from '../../redux/modules/reducer'
import { login } from '../../redux/modules/login'
import { USERNAME, PASSWORD } from '../../constants'

interface ILoginProps {
  actions: any
  classes: any
  loginSuccess: boolean
  userInfo: any
  history: any
}

const styles = theme =>
  createStyles({
    loginButton: {
      marginTop: theme.spacing.unit * 2,
    },
    paper: {
      width: '50%',
      margin: `${theme.spacing.unit * 9}px auto 0 auto`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  })

export class LoginPage extends React.Component<ILoginProps, any> {
  constructor(props: ILoginProps) {
    super(props)
    this.state = {
      [USERNAME]: '',
      [PASSWORD]: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
  }

  public render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <TextField
          id="email"
          label="Email"
          value={this.state.username}
          onChange={this.handleTextFieldChange(USERNAME)}
          margin="normal"
          fullWidth={true}
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          onChange={this.handleTextFieldChange(PASSWORD)}
          margin="normal"
          fullWidth={true}
        />
        <Button variant="contained" className={classes.loginButton} color="primary" onClick={this.handleLogin}>
          Login
        </Button>
      </Paper>
    )
  }

  public componentWillReceiveProps(nextProps: ILoginProps) {
    const { loginSuccess, history } = nextProps
    if (loginSuccess) {
      history.replace({
        pathname: '/',
      })
    }
  }

  protected handleLogin(): void {
    this.props.actions.login(this.state.username, this.state.password)
  }

  protected handleTextFieldChange(propsName: string): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return event => {
      this.setState({
        [propsName]: event.target.value,
      })
    }
  }
}

const mapStateToProps = (state: IRootState) => {
  const { Login } = state
  return {
    ...Login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        login,
      },
      dispatch,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LoginPage))
