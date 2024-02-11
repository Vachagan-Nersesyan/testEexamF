import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { InitialStateType } from './wTestReducerTs.interface'


const initialState: InitialStateType = {
    loading: false,
    error: null,
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        // getTestName(state: InitialStateType, action: PayloadAction<{ info: string }>) {
        //     state.currentExamName = action.payload.info
        // },
    }
})