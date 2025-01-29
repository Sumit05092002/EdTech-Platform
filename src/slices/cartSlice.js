import { createSlice } from "@reduxjs/toolkit";

const initialState={
    itemCount:localStorage.getItem("itemCount")?(localStorage.getItem("itemCount")):0
}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setItem(state,value){
            state.itemCount=value.payload;
        }
    }
})

export const{setItem}=cartSlice.actions
export default cartSlice.reducer;