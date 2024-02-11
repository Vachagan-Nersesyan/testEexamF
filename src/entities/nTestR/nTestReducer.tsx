import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { AppStateType } from 'entities/store/redux-store'
import { InitialStateType, QuestCountInfoType } from './nTestReducerTs.interface'
import { getTestQuestFunc } from './nTestReducerThunk'
import { NewTestInfoType } from 'entities/testR/testReducerTs.interface'


const initialState: InitialStateType = {

    loading: false,
    error: null,


    questCountInfo: {
        thchoose: '',
        thshort: '',
        thshortanvariant: '',
        thshortb: '',
        thshortcctgry: ''
    },

    allQuestTest: [],


    questInfo: {
        building: '',
        resultNum: '',
        clssNum: '',
        arName: '',
        teachName: '',
        date: '',
        clssNm: ''
    }

}

export const newTestSlice = createSlice({
    name: 'newTestSlice',
    initialState,
    reducers: {
        newTestQuestionsCountFunc(state: InitialStateType, action: PayloadAction<{ info: QuestCountInfoType }>) {
            state.questCountInfo = action.payload.info
            console.log(current(state), 'current(state)current(state)')

        },
        newTestQuestionsInfoFunc(state: InitialStateType, action: PayloadAction<{ info: NewTestInfoType }>) {
            state.questInfo = action.payload.info
        },
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getTestQuestFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getTestQuestFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log(action.payload, 'action.payloadaction.payloadaction.payldddoad')
                    state.allQuestTest = action.payload
                })
                .addCase(getTestQuestFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
        }



})


export const { newTestQuestionsCountFunc, newTestQuestionsInfoFunc } = newTestSlice.actions


export default newTestSlice.reducer
