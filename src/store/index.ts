import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import rootReducer from './rootReducer'

import { __DEV__ } from '@src/config'

const store = configureStore({
  reducer: rootReducer,
  devTools: __DEV__
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// React Redux
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch: () => AppDispatch = useDispatch

export default store
