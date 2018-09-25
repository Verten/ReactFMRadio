import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

export interface ILoadingBoxProps {
  isProcessing: boolean
  classes: any
}

const styles = theme =>
  createStyles({
    progress: {
      margin: theme.spacing.unit * 2,
    },
    loadingRoot: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#eeeeee',
      opacity: 0.7,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

export class LoadingBox extends React.Component<ILoadingBoxProps, any> {
  constructor(props: ILoadingBoxProps) {
    super(props)
    this.state = {}
    this.renderLoadingBox = this.renderLoadingBox.bind(this)
  }

  public render() {
    return this.renderLoadingBox()
  }

  protected renderLoadingBox(): JSX.Element {
    const { isProcessing, classes } = this.props
    if (isProcessing) {
      return (
        <div className={classes.loadingRoot}>
          <CircularProgress className={classes.progress} size={50} />
        </div>
      )
    }
    return null
  }
}

export default withStyles(styles)(LoadingBox)
