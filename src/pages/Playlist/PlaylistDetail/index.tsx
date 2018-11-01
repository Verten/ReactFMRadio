import * as React from 'react'
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
import { IRootState } from '../../../redux/modules/reducer'
import LoadingBox from '../../../components/Loading'

export interface IPlaylistDetailPageProps {
  match: any
  classes: any
  actions: any
  isProcessing: boolean
  playlistDetail: any
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
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 251,
      transition: 'height 0.5s ease',
      whiteSpace: 'pre-line',
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
    content: {
      flex: '1 0 auto',
    },
    paper: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  })

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

class PlaylistDetailPage extends React.Component<IPlaylistDetailPageProps, any> {
  constructor(props: IPlaylistDetailPageProps) {
    super(props)
    this.state = {
      showDetail: false,
    }
    this.renderPlaylistDetail = this.renderPlaylistDetail.bind(this)
  }

  public render() {
    const { classes, playlistDetail } = this.props
    return (
      <Paper className={classes.paper}>
        {this.renderPlaylistDetail(playlistDetail, classes)}
        {this.renderPlaylistTracks(playlistDetail, classes)}
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

  protected renderPlaylistDetail(playlistDetail: any, classes: any): JSX.Element | null {
    if (playlistDetail) {
      return (
        <Card className={classes.card}>
          <CardMedia className={classes.cover} image={playlistDetail.coverImgUrl} title={playlistDetail.name} />
          <div
            className={`${
              this.state.showDetail ? `${classes.details} ${classes.detailsExpand}` : `${classes.details}`
            }`}>
            <CardActions>
              <Button size="small" color="primary" onClick={this.showMoreDescription()}>
                Detail
              </Button>
            </CardActions>
            <CardContent className={classes.content}>
              <Typography variant="headline">{playlistDetail.name}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {playlistDetail.description}
              </Typography>
            </CardContent>
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
                  <TableRow className={classes.row} key={track.id}>
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
        fetchPlaylistDetail,
      },
      dispatch,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PlaylistDetailPage))
