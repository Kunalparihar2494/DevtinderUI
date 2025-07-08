import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import reqReducer from './reqSlice'
import connectionReducer from './connectionSlice'

const appStore = configureStore({
reducer:{
    user:userReducer,
    feeds:feedReducer,
    request:reqReducer,
    connection:connectionReducer
}
})

export default appStore;