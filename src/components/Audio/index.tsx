import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { ISongProps } from '../../redux/modules/song'

export interface IAudioProps {
  classes: any
  songs: ISongProps[]
}

const styles = theme =>
  createStyles({
    audio: {
      width: '100%',
    },
  })

class Audio extends React.Component<IAudioProps, any> {
  public render() {
    const { classes, songs } = this.props
    return (
      <div>
        <audio className={classes.audio} controls={true}>
          {this.renderSource(songs)}
        </audio>
      </div>
    )
  }
  private renderSource(songs: ISongProps[]): HTMLSourceElement[] {
    const sources = []
    if (songs) {
      songs.forEach((element, index) => {
        sources.push(<source src={element.url} type="audio/mpeg" key={index} />)
      })
    }
    return sources
  }
}

export default withStyles(styles)(Audio)
