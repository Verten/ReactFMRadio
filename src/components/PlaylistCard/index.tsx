import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export interface IPlaylistCardProps {
  classes: any
  title: string
  description: string
  cover: string
  onclick: (event: React.MouseEvent<HTMLElement>) => void
}

const styles = theme =>
  createStyles({
    card: {
      maxWidth: 345,
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    },
    media: {
      height: 140,
      objectFit: 'cover',
    },
    content: {
      height: 168,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const PlaylistCard = (props: IPlaylistCardProps): JSX.Element => {
  const { classes, title, description, onclick, cover } = props
  return (
    <Card className={classes.card}>
      <CardMedia component="img" className={classes.media} image={cover} />
      <CardContent className={classes.content}>
        <Typography gutterBottom={true} variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onclick}>
          Detail
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(PlaylistCard)
