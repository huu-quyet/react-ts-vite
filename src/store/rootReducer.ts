import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from '@src/slices/counter'
import menuReducer from '@src/slices/menu'
import notificationReducer from '@src/slices/notification'

const rootReducer = combineReducers({
  counter: counterReducer,
  menu: menuReducer,
  notification: notificationReducer
})

export default rootReducer
