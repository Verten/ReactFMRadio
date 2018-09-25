import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { IRootState } from '../../redux/modules/reducer'
import { handleErrorInfo } from '../../utilities'
import { fetchTopPlaylist } from '../../redux/modules/playlist'
import PlaylistCard from '../../components/PlaylistCard'
import InfoBox from '../../components/InfoBox'

export interface IHomePageProps {
  classes: any
  actions: any
  playlists: any
  error: any
}

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  })

export class HomePage extends React.Component<IHomePageProps, any> {
  constructor(props: IHomePageProps) {
    super(props)
    this.state = {
      playlistInfo: {
        open: false,
        message: '',
      },
    }
    this.renderPlaylistCard = this.renderPlaylistCard.bind(this)
  }

  public render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        {/* <div className={classes.root}> */}
        {this.renderPlaylistCard()}
        {/* </div> */}
        <InfoBox infoConfig={this.state.playlistInfo} />
      </Paper>
    )
  }

  public componentWillReceiveProps(nextProps: IHomePageProps) {
    const { error } = nextProps
    if (error) {
      this.setState({
        playlistInfo: {
          open: true,
          type: 'error',
          message: handleErrorInfo(error),
        },
      })
    } else {
      this.setState({
        playlistInfo: {
          open: true,
          type: 'success',
          message: 'Load successfully...',
        },
      })
    }
  }

  public componentDidMount() {
    this.props.actions.fetchTopPlaylist()
  }

  protected renderPlaylistCard(): JSX.Element[] {
    const playlistCards = []
    const { playlists } = this.props
    if (playlists !== undefined && playlists !== null) {
      playlists.forEach(playlist => {
        playlistCards.push(
          <PlaylistCard
            key={playlist.id}
            title={playlist.name}
            description={playlist.description}
            cover={playlist.coverImgUrl}
            onclick={this.handleClickPlaylist(playlist.id)}
          />,
        )
      })
    }
    return playlistCards
  }

  protected handleClickPlaylist(id: number): () => void {
    return () => {
      console.info(`Playlist id -> ${id}`)
    }
  }
}

const mapStateToProps = (state: IRootState) => {
  const { Playlist } = state
  return {
    ...Playlist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchTopPlaylist,
      },
      dispatch,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HomePage))
