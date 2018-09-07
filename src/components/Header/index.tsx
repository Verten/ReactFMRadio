import * as React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { withRouter } from 'react-router'
import { IRootState } from '../../redux/modules/reducer'

export interface IHeaderProps {
  classes: any
  userInfo: any
  loginSuccess: boolean
  history: any
  location: any
}

const styles = theme =>
  createStyles({
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

export class Header extends React.Component<IHeaderProps, any> {
  constructor(props) {
    super(props)
    this.state = {}
    this.isUserLogin = this.isUserLogin.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  public render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Radio">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={this.props.classes.flex}>
            Radio
          </Typography>
          <Button color="inherit" onClick={this.handleClick}>
            {this.isUserLogin()}
          </Button>
        </Toolbar>
      </AppBar>
    )
  }

  protected isUserLogin(): string | JSX.Element {
    const { loginSuccess, userInfo } = this.props
    if (loginSuccess) {
      return <Avatar alt="Adelle Charles" src={userInfo.profile.avatarUrl} />
    }
    return 'Login'
  }

  protected handleClick(): void {
    const { loginSuccess, history, location } = this.props
    if (!loginSuccess) {
      console.info('redirect to login page')
      history.replace({
        pathname: '/login',
        state: { from: location.pathname },
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Header)))
