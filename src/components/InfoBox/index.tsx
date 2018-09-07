import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export interface IInfoBoxProps {
  classes: any
  infoConfig: {
    open: boolean
    style: SnackbarOrigin
    message: string
  }
}

export interface IInfoBoxState {
  open: boolean
  message: string
}

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

export class InfoBox extends React.Component<IInfoBoxProps, IInfoBoxState> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
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
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }

  public componentWillReceiveProps(nextProps: IInfoBoxProps) {
    const { infoConfig } = nextProps
    this.setState({
      open: infoConfig.open,
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
