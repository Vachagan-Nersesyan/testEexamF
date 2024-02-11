import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { AppStateType } from 'entities/store/redux-store'
import { AllTeacherInfoType, InitialStateType } from './adminReducerTs.interface'
import { getInstituteInfoFunc, getTeacherInfoFunc, isPasswordValidFunc, logOutFunc } from './adminThunk'

const initialState: InitialStateType = {

    loading: false,
    error: null,


    password: 'ozuazk',
    isAdmin: false,
    allTeacherInfo: [],

    curentTeacherInfo: null,

    instituteName: '',
    instituteLogo: '',


}

export const adminSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        changeStudentNumInfo(state: InitialStateType, action: PayloadAction<{ info: AllTeacherInfoType | null }>) {
            // if (state.password === action.payload.info) {
            //     state.isAdmin = true
            // } else {
            //     state.isAdmin = false
            // }
            state.curentTeacherInfo = action.payload.info
            console.log(current(state))
        },
    },

    extraReducers:
        (builder) => {
            builder
                .addCase(getInstituteInfoFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getInstituteInfoFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null

                    console.log(action.payload)
                    const reader = new FileReader();

                    // Define a callback for when the FileReader has finished reading the Blob
                    // reader.onload = function (event) {
                    // Convert the ArrayBuffer to a base64 string
                    const base64String = btoa(
                        new Uint8Array(action.payload[0].logo.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );

                    // Now you can assign the base64 string to state.instituteLogo
                    state.instituteLogo = base64String;
                    console.log(base64String, state.instituteLogo, 'base64String,state.instituteLogo')
                    // };


                    state.instituteName = action.payload[0].name

                    // const blob = new Blob([action.payload[0].logo.data], { type: 'image/jpeg' });
                    // console.log(blob, 'blob')
                    // console.log(action.payload[0].logo.data.toString('base64'), 'action.payload[0].logo.data.toString("base64")')

                    // const url = URL.createObjectURL(blob);
                    // console.log(url, 'url')
                    // state.instituteName = action.payload[0].name
                    // state.instituteLogo = action.payload[0].logo.data.toString('base64')

                    console.log(current(state), 'current(state)')
                })
                .addCase(getInstituteInfoFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
                .addCase(getTeacherInfoFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getTeacherInfoFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null
                    console.log(action.payload, 'action.payload')
                    state.allTeacherInfo = action.payload
                    console.log(current(state), 'getting teacher info')

                })
                .addCase(getTeacherInfoFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })

                .addCase(isPasswordValidFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(isPasswordValidFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null

                    console.log(action.payload)
                    if (action.payload) {
                        state.curentTeacherInfo = action.payload
                    }
                    console.log(current(state), 'current(state)')

                })
                .addCase(isPasswordValidFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })


                .addCase(logOutFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(logOutFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null
                    state.curentTeacherInfo = null
                    console.log(current(state), 'current(state)')

                })
                .addCase(logOutFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
        }


})

export const { changeStudentNumInfo } = adminSlice.actions


export default adminSlice.reducer