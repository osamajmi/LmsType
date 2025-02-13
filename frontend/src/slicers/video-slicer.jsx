
import {createSlice} from '@reduxjs/toolkit';


const initialState = {

    Video :[],
    VideoCount :0
}

const VideoSlicer = createSlice({

    name: 'VideoSlicer',
    initialState,
    reducers: {
        AddVideo(state, action) {
            state.Video.push(action.payload);
            state.VideoCount = state.VideoCount.length;
        },
        RemoveVideo(state, action) {
            state.Video = state.Video.filter((video) => video.id !== action.payload.id);
        }
    }
})

export const {AddVideo,RemoveVideo} = VideoSlicer.actions;
export default VideoSlicer.reducer;
