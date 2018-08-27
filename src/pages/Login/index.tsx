import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import { IRootState } from '../../redux/modules/reducer'
import { login } from '../../redux/modules/login'

interface ILoginProps {
  actions: any
  classes: any
  loginSuccess: boolean
  userInfo: any
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

export class LoginPage extends React.Component<ILoginProps, any> {
  constructor(props: ILoginProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.isUserLogin = this.isUserLogin.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
  }

  public render() {
    return (
      <div>
        <div className={this.props.classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Radio">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                Radio
              </Typography>
              <Button color="inherit">{this.isUserLogin()}</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            value={this.state.username}
            onChange={this.handleTextFieldChange('username')}
            margin="normal"
            fullWidth={true}
          />
          <TextField
            id="password-input"
            label="Password"
            type="password"
            onChange={this.handleTextFieldChange('password')}
            margin="normal"
            fullWidth={true}
          />
        </div>
        <Button variant="contained" color="primary" onClick={this.handleLogin}>
          Login
        </Button>
      </div>
    )
  }

  protected isUserLogin(): string | JSX.Element {
    const { loginSuccess, userInfo } = this.props
    if (loginSuccess) {
      return <Avatar alt="Adelle Charles" src={userInfo.profile.avatarUrl} />
    }
    return 'Login'
  }

  protected handleLogin(): void {
    this.props.actions.login(this.state.username, this.state.password)
  }

  protected handleTextFieldChange(propsName): (event: React.ChangeEvent<HTMLInputElement>) => void {
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
