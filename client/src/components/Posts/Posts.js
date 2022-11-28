import { CircularProgress, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { postsSelector } from '../../features/posts/postsSlice.js'
import Post from './Post/Post.js'
import useStyles from './styles'



const Posts = ({ setCurrentId }) => {
    const classes = useStyles()

    const posts = useSelector(postsSelector)

    useEffect(() => {
      console.log('loading...posts changed')
    }, [posts])
    

    console.log('posts selected from redux ', posts.posts)

    return (
        !posts?.posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems={"stretch"} spacing={3}>
                {
                    posts?.posts.map((post) => (
                        <Grid key={post._id} xs={12} item>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts