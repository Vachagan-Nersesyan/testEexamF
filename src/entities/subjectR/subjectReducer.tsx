import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { AppStateType } from 'entities/store/redux-store'
import { InitialStateType } from './subjectReducerTs.interface'
import { addSubjectFunc, changeSubjectPicFunc, getExamsFunc } from './subjectReducerThunk'


const initialState: InitialStateType = {

    loading: false,
    error: null,


    allExams: [],

    saveSubjectName: ''

}

export const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        saveSubjectNameFunc(state: InitialStateType, action: PayloadAction<{ info: string }>) {

            state.saveSubjectName = action.payload.info
            console.log(current(state))

        },

    },
    extraReducers:
        (builder) => {
            builder
                .addCase(addSubjectFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(addSubjectFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log('looo', current(state), action.payload)

                    for (let i in action.payload.exams) {
                        console.log(action.payload.exams[i])

                        action.payload.exams[i] = JSON.parse(action.payload.exams[i])

                    }




                    // for (let i in action.payload) {
                    //     action.payload[i].exams.map((val: any) => {
                    //         val = JSON.parse(val)
                    //     })
                    // }

                    state.allExams.push(action.payload)
                })
                .addCase(addSubjectFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
                .addCase(getExamsFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getExamsFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log(action.payload, 'after')

                    for (let i in action.payload) {
                        console.log(action.payload[i])

                        action.payload[i].exams = [...JSON.parse(action.payload[i].exams)]

                    }




                    console.log(action.payload, 'action.payloadaction.payloadaction.payload')
                    state.allExams = action.payload
                    console.log(current(state), 'current(stateasdfffeewefwqqqqqqqqq)')
                })
                .addCase(getExamsFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
                .addCase(changeSubjectPicFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(changeSubjectPicFunc.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeSubjectPicFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
        }

})

export const { saveSubjectNameFunc } = subjectSlice.actions


export default subjectSlice.reducer