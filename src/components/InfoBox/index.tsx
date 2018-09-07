import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import CustomizeSnackBar from './customizeSnackBar'

export interface IInfoBoxProps {
  classes: any
  infoConfig: {
    open: boolean
    style: SnackbarOrigin
    message: string
    type: 'success' | 'warning' | 'error' | 'info'
  }
}

export interface IInfoBoxState {
  open: boolean
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

export class InfoBox extends React.Component<IInfoBoxProps, IInfoBoxState> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
      type: 'info',
    }
    this.handleClose = this.handleClose.bind(this)
  }

  public render() {
    const { classes } = this.props
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}>
          <CustomizeSnackBar
            style={classes.margin}
            message={this.state.message}
            type={this.state.type}
            onClose={this.handleClose}
          />
        </Snackbar>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps: IInfoBoxProps) {
    const { infoConfig } = nextProps
    this.setState({
      open: infoConfig.open,
      type: infoConfig.type,
      message: infoConfig.message,
    })
  }

  protected handleClose() {
    this.setState({
      open: false,
      message: '',
    })
  }
}

export default withStyles(styles)(InfoBox)
