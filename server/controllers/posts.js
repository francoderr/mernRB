import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {

//    console.log(req.body)

    const newPost = new PostMessage(req.body)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params

    let post = req.body

    post = {...post, _id}

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`no post with that Id`)

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})

    res.json(updatedPost)
 }

 export const deletePost = async (req, res) => {

    const { id: _id } = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`no post with that Id`)

    await PostMessage.findByIdAndRemove(_id)

    res.json({ message: "Post deleted succesfully"})
 }