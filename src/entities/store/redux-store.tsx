import { configureStore } from '@reduxjs/toolkit'
import adminSlice from 'entities/adminR/adminReducer'
import newTestSlice from 'entities/nTestR/nTestReducer'
import studentSlice from 'entities/student/studentReducer'
import subjectSlice from 'entities/subjectR/subjectReducer'
import testSlice from 'entities/testR/testReducer'
import { useDispatch } from 'react-redux'


const store = configureStore({
    reducer: {
        testR: testSlice,
        makeTestR: newTestSlice,
        subjectR: subjectSlice,
        studentR: studentSlice,
        adminR: adminSlice

    }
})

type RootReducerType = typeof store.getState
export type AppStateType = ReturnType<RootReducerType>


export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default store