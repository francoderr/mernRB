import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, getPosts, likePost } from '../../../features/posts/postsSlice'
// import { likePost } from '../../../../../server/controllers/posts'



const Post = ({ post, setCurrentId }) => {  // destructured the props
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleDelete = async() => {
    try {
      await dispatch(deletePost(post._id))
    } 
    catch(e) {console.log(e)}
    dispatch(getPosts())
  }

  const handleLike = async() => {
    console.log("like button clicked")
    try {
      await dispatch(likePost(post._id))
    } 
    catch(e) {console.log(e)}
    dispatch(getPosts())
  }


  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post?.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post?.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => {
            setCurrentId(post._id)
          }}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color="textSecondary">
          {post?.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLike}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like {" "} &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>

    </Card>
  )
}

export default Post