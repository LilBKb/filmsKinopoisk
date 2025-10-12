import { createSlice } from "@reduxjs/toolkit";

const initialState={
    countries:'',
    genreId:'',
    order:'NUM_VOTE',
    type:'',
    page:1
};

export const movieSlice= createSlice({
    name:'movieSlice',
    initialState,
    reducers:{
        selectQuery:(state,action)=>({
            ...state,
            ...action.payload,
        }),
        resetQuery:()=>({
            ...initialState
        })
    }
})
export const {selectQuery,resetQuery}=movieSlice.actions;
export default movieSlice.reducer