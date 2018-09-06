import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import Router from './router'

export interface IAppPageProps {
  classes: any
  userInfo?: any
  loginSuccess?: boolean
}

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing.unit * 1,
    },
  })

export class AppPage extends React.Component<IAppPageProps, any> {
  constructor(props: IAppPageProps) {
    super(props)
    this.state = {}
  }

  public render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header userInfo={this.props.userInfo} loginSuccess={this.props.loginSuccess} />
        <Router />
      </div>
    )
  }

  public componentDidMount(): void {
    const { loginSuccess } = this.props
    if (!loginSuccess) {
      console.info('not login')
    }
  }
}

export default withStyles(styles)(AppPage)
