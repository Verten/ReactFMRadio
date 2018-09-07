import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

export interface ICustomizeSnackBarProps {
  type: 'success' | 'warning' | 'error' | 'info'
  onClose: () => void
  style?: string
  message: string
  classes: any
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles = theme =>
  createStyles({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  })

export class CustomizeSnackBar extends React.Component<ICustomizeSnackBarProps, any> {
  constructor(props: ICustomizeSnackBarProps) {
    super(props)
    this.state = {}
  }

  public render() {
    const { type, onClose, style, message, classes } = this.props
    const Icon = variantIcon[type]
    return (
      <SnackbarContent
        className={`${classes[type]} ${style}`}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </span>
        }
        action={
          <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        }
      />
    )
  }
}

export default withStyles(styles)(CustomizeSnackBar)
