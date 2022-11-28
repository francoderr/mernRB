import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
// import * as api from '../../api'

export const initialState = {
    posts: "",
};

// A slice for recipes with our three reducers
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        fetch_all: (state, { payload }) => {
            state.posts = payload
        },
        create: (state, { payload }) => {
            state.posts = { ...state.posts, payload }
        },
        update: (state, { payload }) => {
            state.posts.map((post) => {
                post.id === payload.id ? post = payload : post = post
            })
        },
        deleter: (state, { payload }) => {
            state.posts = state.posts.filter(post => {
                if(post.id !== payload) {
                    return post
                }
            })
        },
    },
});

// Three actions generated from the slice
export const { fetch_all, create, update, deleter } =
    postsSlice.actions;

// A selector
export const postsSelector = (state) => state.posts;

// The reducer
export default postsSlice.reducer;


export function getPosts() {
    return async (dispatch) => {
        //   dispatch(getCircleLoans());

        try {
            const data = await Axios.get('http://localhost:5000/posts')
            dispatch(fetch_all(data.data));
            // console.log(`done setting state to : ${data.data}`)
        } catch (error) {
            // dispatch(getCircleLoansFailure());
            console.log('reason for failure to fetch posts', error)
        }
    };
}

export function createPost(payload) {
    return async (dispatch) => {
        try {
            const data = await Axios.post('http://localhost:5000/posts/create',
                payload
            )
            dispatch(create(data));
        } catch (error) {
            // dispatch(getCircleLoansFailure());
            console.log('reason for failure to create post', error)
        }


    };
}

export function updatePost(payload) {
    // console.log(`current id in redux`, payload.id)
    return async (dispatch) => {
        try {
            const data = await Axios.patch(`http://localhost:5000/posts/${payload.id}`,
            payload.data
            )
            dispatch(update(data));
        } catch (error) {
            // dispatch(getCircleLoansFailure());
            console.log('reason for failure to create post', error)
        }
    };
}

export function deletePost(payload) {
    return async (dispatch) => {
        try {
            await Axios.delete(`http://localhost:5000/posts/${payload}`)
            dispatch(deleter(payload));
        } catch (error) {
            // dispatch(getCircleLoansFailure());
            console.log('reason for failure to create post', error)
        }
    };
}
