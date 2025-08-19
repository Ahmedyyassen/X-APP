import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./slices/AuthSlice";
import chatSlice from "./slices/ChatSlice";

export const store  = configureStore({
    reducer:{
        authSlice,
        chatSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;