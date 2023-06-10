import { configureStore } from '@reduxjs/toolkit'
import postsSlice from '../features/posts/postsSlice'
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';



const reducers = combineReducers({
  posts: postsSlice,
  
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

const { dispatch } = store;

export { store, dispatch };



