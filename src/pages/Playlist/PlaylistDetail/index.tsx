import * as React from 'react'
import { isEqual } from 'lodash'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { fetchPlaylistDetail } from '../../../redux/modules/playlist'
import { fetchSong, ISongProps } from '../../../redux/modules/song'
import { IRootState } from '../../../redux/modules/reducer'
import LoadingBox from '../../../components/Loading'
import AudioComponent from '../../../components/Audio'

export interface IPlaylistDetailPageProps {
  match: any
  classes: any
  actions: any
  isProcessing: boolean
  playlistDetail: any
  data: ISongProps[]
}

const styles = theme =>
  createStyles({
    card: {
      display: 'flex',
    },
    cover: {
      flex: '1 0 auto',
      width: 251,
      height: 251,
      borderRadius: '4px',
    },
    details: {
      position: 'relative',
      // display: 'flex',
      // flexDirection: 'column',
      width: '100%',
      height: 251,
      transition: 'height 0.5s ease',
      whiteSpace: 'pre-line',
      overflow: 'hidden',
      paddingBottom: `${theme.spacing.unit * 3}px`,
      '&:after': {
        content: '""',
        width: '100%',
        height: `${theme.spacing.unit * 5}px`,
        position: 'absolute',
        bottom: 0,
        background: 'linear-gradient(to top,white, transparent)',
      },
    },
    detailsExpand: {
      height: 'auto',
    },
    table: {
      minWidth: 400,
      marginTop: `${theme.spacing.unit * 3}px`,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    actionButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      display: 'block',
    },
    content: {
      flex: '1 0 auto',
    },
    paper: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  })

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell)

class PlaylistDetailPage extends React.Component<IPlaylistDetailPageProps, any> {
  constructor(props: IPlaylistDetailPageProps) {
    super(props)
    this.state = {
      showDetail: false,
      selectedSong: [],
    }
    this.renderPlaylistDetail = this.renderPlaylistDetail.bind(this)
  }

  public render() {
    const { classes, playlistDetail } = this.props
    const { selectedSong } = this.state
    return (
      <Paper className={classes.paper}>
        {this.renderPlaylistDetail(playlistDetail, classes)}
        {this.renderPlaylistTracks(playlistDetail, classes)}
        <AudioComponent songs={selectedSong} />
        <LoadingBox isProcessing={this.props.isProcessing} />
      </Paper>
    )
  }

  public componentDidMount() {
    const { match } = this.props
    if (match.params) {
      this.props.actions.fetchPlaylistDetail(match.params.id)
    }
  }

  public componentWillReceiveProps(nextProps: IPlaylistDetailPageProps) {
    const fetchSong = nextProps.data
    const { selectedSong } = this.state
    if (fetchSong) {
      selectedSong.length !== 0
        ? selectedSong.forEach((song, index) => {
            if (!isEqual(song.id, fetchSong[0].id)) {
              selectedSong.push(fetchSong[0])
            }
          })
        : selectedSong.push(fetchSong[0])
      this.setState({
        selectedSong,
      })
    }
  }

  public shouldComponentUpdate(nextProps: IPlaylistDetailPageProps) {
    return (
      !isEqual(nextProps.data, this.props.data) ||
      !isEqual(nextProps.playlistDetail, this.props.playlistDetail) ||
      !isEqual(nextProps.isProcessing, this.props.isProcessing)
    )
  }

  protected renderPlaylistDetail(playlistDetail: any, classes: any): JSX.Element | null {
    if (playlistDetail) {
      return (
        <Card className={classes.card}>
          <CardMedia className={classes.cover} image={playlistDetail.coverImgUrl} title={playlistDetail.name} />
          <div
            className={`${
              this.state.showDetail ? `${classes.details} ${classes.detailsExpand}` : `${classes.details}`
            }`}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{playlistDetail.name}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {playlistDetail.description}
              </Typography>
            </CardContent>
            <CardActions className={classes.actionButton}>
              <Button size="small" color="primary" onClick={this.showMoreDescription()}>
                Detail
              </Button>
            </CardActions>
          </div>
        </Card>
      )
    }
    return null
  }

  protected renderPlaylistTracks(playlistDetail: any, classes: any): JSX.Element | null {
    if (playlistDetail && playlistDetail.tracks && playlistDetail.tracks.length > 0) {
      return (
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistDetail.tracks.map(track => {
                return (
                  <TableRow hover={true} className={classes.row} key={track.id} onClick={this.handleClickTrack(track)}>
                    <CustomTableCell component="th" scope="row">
                      {track.name}
                    </CustomTableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      )
    }
    return null
  }

  private showMoreDescription(): (event: React.MouseEvent<HTMLElement>) => void {
    return event => {
      console.info(event)
      this.setState({
        showDetail: !this.state.showDetail,
      })
    }
  }

  private handleClickTrack(track: { id: number }): (event: React.MouseEvent<HTMLElement>) => void {
    return event => {
      console.info('click:', track)
      this.props.actions.fetchSong(track.id)
    }
  }
}

const mapStateToProps = (state: IRootState) => {
  const { Playlist, Song } = state
  return {
    ...Playlist,
    ...Song,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchPlaylistDetail,
        fetchSong,
      },
      dispatch,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PlaylistDetailPage))
