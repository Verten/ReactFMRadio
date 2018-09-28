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
    content: {
      flex: '1 0 auto',
    },
    paper: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  })

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
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{playlistDetail.name}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {playlistDetail.description}
              </Typography>
            </CardContent>
            <CardActions>
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
  private showMoreDescription(): (event: React.MouseEvent<HTMLElement>) => void {
    return event => {
      console.info(event)
      this.setState({
        showDetail: true,
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
