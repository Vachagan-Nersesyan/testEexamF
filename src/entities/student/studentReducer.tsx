import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { AppStateType } from 'entities/store/redux-store'
import { InitialStateType, StudentsAllInfoType } from './studentReducerTs.interface'
import { QuestCountInfoType } from 'entities/nTestR/nTestReducerTs.interface'
import { AllExamInfoType, CategoryInfoType, NewTestInfoType } from 'entities/testR/testReducerTs.interface'
import { SubjectExamType } from 'entities/subjectR/subjectReducerTs.interface'
import { AnwersArrType } from 'entities/wTestR/wTestReducerTs.interface'


const initialState: InitialStateType = {

    loading: false,
    error: null,


    numInfo: {
        thchoose: '',
        thshort: '',
        thshortanvariant: '',
        thshortb: '',
        thshortcctgry: ''
    },

    otherInfo: null,


    allTests: [],


    allExamExists: [],

    allAnswers: [],


    studentsAllInfo: [

    ],
    userUniqId: '',

    classCrntName : ''


}

export const studentSlice = createSlice({
    name: 'studentt',
    initialState,
    reducers: {
        initClassCurrentNameFunc(state: InitialStateType, action: PayloadAction<{ name: string }>) {
            state.classCrntName = action.payload.name
        },

        addAnswersToStudentInfoFunc(state: InitialStateType, action: PayloadAction<{ id: string }>) {
            state.studentsAllInfo.map((val) => {
                if (val.id === action.payload.id) {
                    val.answersArr = [...state.allAnswers]
                }
            })

            console.log(current(state), 'current(state)current(state)current(state)current(state)')
        },
        initUniqId(state: InitialStateType, action: PayloadAction<{ id: string }>) {
            state.userUniqId = action.payload.id
        },

        setStudentsInfo(state: InitialStateType, action: PayloadAction<{ info: string, uniqName: string, id: string }>) {
            let obj: StudentsAllInfoType | any = {}
            let isExists: boolean = false
            obj.id = action.payload.id
            console.log(current(state), 'fefef')

            state.studentsAllInfo.map((val, ind) => {
                console.log(action.payload)
                if (val.id === action.payload.id && obj) {

                    console.log('yes')
                    isExists = true
                    if (action.payload.uniqName === 'nameFirst') {
                        let o = action.payload.info.split(' ')
                        obj.nameFirst = o[0]
                        obj.nameSecond = o[1]
                        obj.nameThird = o[2]

                    } else if (action.payload.uniqName === 'classNumber') {
                        obj.classNumber = action.payload.info

                    } else if (action.payload.uniqName === 'testNumber') {
                        obj.testNumber = action.payload.info
                    } else {
                        if (action.payload.info === 'Ծանոթ եմ քննության կարգին') {
                            obj.isWriten = true
                        } else {
                            obj.isWriten = false
                        }
                    }

                    state.studentsAllInfo.splice(ind, 1, { ...val, ...obj })

                }
            })
            if (!isExists) {
                console.log('added')
                state.studentsAllInfo.push(obj)
            }
            console.log(current(state), 'current(state)')

        },

        updateArrAllAnswers(state: InitialStateType, action: PayloadAction<{ info: AnwersArrType }>) {

            let isIncludes = false

            for (let i in state.allAnswers) {
                if (state.allAnswers[i].questNum === action.payload.info.questNum) {
                    state.allAnswers[i] = action.payload.info
                    isIncludes = true
                }
            }

            if (!isIncludes) {
                state.allAnswers.push(action.payload.info)
            }

            console.log(current(state))

        },

        changeStudentOthInfo(state: InitialStateType, action: PayloadAction<{ info: AllExamInfoType }>) {
            state.otherInfo = action.payload.info

        },
        changeStudentNumstInfo(state: InitialStateType, action: PayloadAction<{ info: QuestCountInfoType }>) {
            state.numInfo = action.payload.info

        },

        changeStudentTestsInfo(state: InitialStateType, action: PayloadAction<{ info: Array<CategoryInfoType> }>) {
            state.allTests = action.payload.info

        },

        changeExistsExamInfo(state: InitialStateType, action: PayloadAction<{ info: Array<SubjectExamType> }>) {
            state.allExamExists = action.payload.info
            console.log(current(state))

        },

    },


})

export const { initClassCurrentNameFunc,addAnswersToStudentInfoFunc, initUniqId, setStudentsInfo, changeExistsExamInfo, changeStudentOthInfo, changeStudentNumstInfo, changeStudentTestsInfo, updateArrAllAnswers } = studentSlice.actions


export default studentSlice.reducer