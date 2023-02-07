import { combineReducers, configureStore } from '@reduxjs/toolkit'
import initReducer from './initSlice'

const rootReducer = combineReducers({
    initReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']