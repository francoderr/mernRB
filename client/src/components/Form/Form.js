import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'

import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import { createPost, getPosts, updatePost } from '../../features/posts/postsSlice'


const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)

    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    })

    const dispatch = useDispatch()

    const classes = useStyles()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (currentId) {
                const payload = {
                    id: currentId,
                    data: postData
                }
                await dispatch(updatePost(payload))
            } else {
                await dispatch(createPost(postData))
            }
        } catch(e) { console.log(e)} 
        dispatch(getPosts())
        clear()

    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            creator: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        })
    }

    useEffect(() => {
        if (post) {
            setPostData(post)
        } 
    }, [post])


    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `editing` : `Creating`} a memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => { setPostData({ ...postData, creator: e.target.value }) }} > </TextField>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} > </TextField>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }} > </TextField>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(",") }) }} > </TextField>
                <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form