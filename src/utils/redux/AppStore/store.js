import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../feature/userSlice"
import notificationReducer from "../feature/notificationSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
     notification: notificationReducer,
  },
})