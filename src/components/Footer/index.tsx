import * as React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { IRootState } from '../../redux/modules/reducer'

const styles = theme => createStyles({})

export class Footer extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  public render() {
    return <div />
  }
}

const mapStateToProps = (state: IRootState) => {
  const { Login } = state
  return {
    Login,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Footer))
