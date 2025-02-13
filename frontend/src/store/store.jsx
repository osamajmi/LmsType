
import { configureStore } from "@reduxjs/toolkit";
import  watchLaterReduce from '../slicers/video-slicer'

export default configureStore({
    reducer: {
       watchLater: watchLaterReduce
    }
})