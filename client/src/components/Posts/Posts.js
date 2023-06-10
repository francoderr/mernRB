import { CircularProgress, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { postsSelector } from '../../features/posts/postsSlice.js'
import Post from './Post/Post.js'
import useStyles from './styles'
// import { getPosts, postsSelector } from './features/posts/postsSlice'




const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const [lesPosts, setLesPosts] = useState(null)

//   const dispatch = useDispatch()

    const posts = useSelector(postsSelector)

    useEffect(() => {
        setLesPosts(posts.posts)
    }, [posts])
    

    console.log('posts selected from redux ', posts)

    return (
        lesPosts?.length? (
            <Grid className={classes.container} container alignItems={"stretch"} spacing={3}>
                {
                    lesPosts?.map((post) => (
                        <Grid key={post._id} xs={12} item>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        ) : <CircularProgress />
    )
}

export default Posts