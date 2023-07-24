import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/auth'

export default configureStore({
  reducer: {
    auth: authReducer
  },
})