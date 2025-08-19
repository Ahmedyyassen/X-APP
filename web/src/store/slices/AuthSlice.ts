import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { USER } from "../../types/user";

type Props={
    user: USER | null,
    isLoading:boolean,
    error:Error | null
}
const initialState: Props = {user:null, isLoading:false, error:null};
const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        setAuthUser:(state, action:PayloadAction<Props>)=>{
            state = action.payload;
            return state;
        }
    }
})
export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;