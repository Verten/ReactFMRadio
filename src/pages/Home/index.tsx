import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'

export interface IHomePageProps {
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

export class HomePage extends React.Component<IHomePageProps, any> {
  constructor(props: IHomePageProps) {
    super(props)
    this.state = {}
  }

  public render() {
    const { classes } = this.props
    return <div className={classes.root}>Welcome!</div>
  }
}

export default withStyles(styles)(HomePage)
