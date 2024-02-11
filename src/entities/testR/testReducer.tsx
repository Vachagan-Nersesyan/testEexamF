import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { AppStateType } from 'entities/store/redux-store'
import { AllExamInfoType, AllInfoAType, AllInfoType, CategoryInfoType, InitialStateType, QuestionType } from './testReducerTs.interface'
import { deleteQuestionFunc, sendQuestionFunc, updateQuestionFunc } from './testReducerThunk'
// import { getQuestionFunc } from './testReducerThunk'


const allTestsConstructor = [
    {
        id: 0,
        category: 'A',
        questions: [
            {
                id: 0,
                questionType: [],
                uniqName: 'choose',
            }
        ]
    },
    {
        id: 1,
        category: 'B',
        questions: [
            {
                id: 1,
                questionType: [],
                uniqName: 'shortbtype',

            },
            {
                id: 2,
                questionType: [],
                uniqName: 'short',

            },

        ]
    },
    {
        id: 2,
        category: 'C',
        questions: [
            {
                id: 1,
                questionType: [],
                uniqName: 'shortandvariant',

            },
            {
                id: 2,
                questionType: [],
                uniqName: 'shortbtype',

            },

        ]
    },
]

const initialState: InitialStateType = {

    loading: false,
    error: null,

    allInfo: {
        chooseAnswerQuest: '',
        shortAnswerQuest: '',
        shortAnswerBQuest: '',
        chooseAnswerBQuest: '',
        shortAnswerCQuest: '',
        shortAnswerDQuest: '',
        shortAnswerEQuest: '',
        wrongChooseAnswerQuest: '',
        wrongShortAnswerQuest: '',

    },

    allInfoArr: [],
    wrongQuestArr: [],
    subjectName: '',
    examYear: 0,
    examType: '',

    allTests: [...allTestsConstructor],
    allTestsBeta: [],

    isRnd: false,

    testName: '',

    testhrt: [],
    currentExamName: '',
    currentSubjectName: '',
    otherInfo: null,

    allExamflInfo: null
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        getOtherInfo(state: InitialStateType, action: PayloadAction<{ info: AllExamInfoType | null }>) {
            state.otherInfo = action.payload.info
            console.log(current(state), 'getotherinfoooo')
        },
        getTestName(state: InitialStateType, action: PayloadAction<{ info: string }>) {
            state.currentExamName = action.payload.info
        },
        getTestSubjectName(state: InitialStateType, action: PayloadAction<{ info: string | undefined }>) {
            state.currentSubjectName = action.payload.info
        },


        changeAllTest(state: InitialStateType, action: PayloadAction<{ info: Array<CategoryInfoType> }>) {
            state.allTests = action.payload.info
        },


        updateTestsArr(state: InitialStateType, action: PayloadAction) {
            state.allTests = [...allTestsConstructor]
        },

        changeIsRndItm(state: InitialStateType, action: PayloadAction<boolean>) {
            state.isRnd = action.payload
        },



        changeAllBetaTest(state: InitialStateType, action: PayloadAction<{ info: Array<CategoryInfoType> }>) {
            state.allTestsBeta = action.payload.info

        },

        changeAllBetaWorkTest(state: InitialStateType, action: PayloadAction) {
            state.allTests = state.allTestsBeta

        },









        addQuestionFunc(state: InitialStateType, action: PayloadAction<{ info: QuestionType }>) {
            console.log(action.payload.info, 'action.payload.infoaction.payload.infosss')
            state.testhrt.push(action.payload.info.selectedRpValue)
            state.allTests.map((val) => {
                if (val.category.toLowerCase() === action.payload.info.selectedLvlValue) {
                    val.questions.map((val1) => {
                        if (val1.uniqName === action.payload.info.selectedRpValue) {
                            val1.questionType.push(action.payload.info)
                        }
                    })
                }
            })
        },

        updateQuestionMnnFunc(state: InitialStateType, action: PayloadAction<{ info: QuestionType, id: number | null }>) {
            console.log(action.payload, 'action.payload.infoaction.payload.infosss')

            state.allTests.map((val) => {
                if (val.category.toLowerCase() === action.payload.info.selectedLvlValue) {
                    val.questions.map((val1, ind1) => {
                        if (action.payload.id) {
                            val1.questionType.splice(action.payload.id, 1, action.payload.info)
                        }
                    })
                }
            })

            console.log(current(state), 'current(state)')
        }, 


        // deleteQuestionFunc(state: InitialStateType, action: PayloadAction<{ info: QuestionType }>) {
        //     state.testhrt.push(action.payload.info.selectedRpValue)
        //     state.allTests.map((val) => {
        //         if (val.category.toLowerCase() === action.payload.info.selectedLvlValue) {
        //             val.questions.map((val1, ind1) => {
        //                 if (val1.uniqName === action.payload.info.selectedRpValue) {
        //                     val1.questionType.splice(ind1, 1)
        //                 }
        //             })
        //         }
        //     })
        //     console.log(current(state), 'current(state)')
        // },

        changeTestName(state: InitialStateType, action: PayloadAction<{ info: string }>) {
            state.testName = action.payload.info
        },


        getAllQuestionsCount(state: InitialStateType, action: PayloadAction<{ info: AllInfoType }>) {
            state.allInfo = action.payload.info
        },
        getAllQuestionsCountFunc(state: InitialStateType, action: PayloadAction<{ info: AllInfoAType }>) {

            state.allInfoArr.push(action.payload.info)
        },
        getAllWrongQuestionsCountFunc(state: InitialStateType, action: PayloadAction<{ info: AllInfoAType }>) {

            state.wrongQuestArr.push(action.payload.info)
        },


        getAllExamInfoCountFunc(state: InitialStateType, action: PayloadAction<{ info: AllExamInfoType }>) {

            state.subjectName = action.payload.info.subjectName
            state.examYear = action.payload.info.examYear
            state.examType = action.payload.info.examType

        },

        getInitInfoArr(state: InitialStateType, action: PayloadAction<{ info: AllInfoAType }>) {

            state.allInfoArr.push(action.payload.info)

        },
        clearArrFunc(state: InitialStateType, action: PayloadAction) {

            state.allInfoArr = []

        },


    },
    extraReducers:
        (builder) => {
            builder
                .addCase(sendQuestionFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(sendQuestionFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;


                })
                .addCase(sendQuestionFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
                .addCase(updateQuestionFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateQuestionFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    console.log(action.payload, 'action.payloadaction.payloadaction.payloaddddddddddddddddddddddddddddd')
                    console.log(current(state))

                    for (let i in action.payload.exams) {

                        console.log(current(state), 'stugum', action.payload.exams[i], state.currentExamName, 'outloop')
                        if (action.payload.exams[i].name === state.currentExamName) {
                            console.log(current(state), 'stugum', action.payload.exams[i], 'inloop')
                            console.log(action.payload.exams[i], 'action.payload.exams[i]')
                            state.allTests = [...action.payload.exams[i].info]
                            state.allExamflInfo = { ...action.payload.exams[i] }
                        }
                    }
                    console.log(current(state), 'before')

                })
                .addCase(updateQuestionFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
                .addCase(deleteQuestionFunc.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(deleteQuestionFunc.fulfilled, (state, action) => {
                    state.loading = false;
                    // console.log(action.payload, 'action.payloadaction.payloadaction.payloaddddddddddddddddddddddddddddd')
                    // console.log(current(state))
                    action.payload.exams.map((val: any) => {
                        if (val.name === state.currentExamName) {
                            state.allTests = val.info

                        }
                    })
                })
                .addCase(deleteQuestionFunc.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'An error occurred';
                })
        }



})


export const { updateQuestionMnnFunc, getOtherInfo, getTestSubjectName, getTestName, changeAllBetaWorkTest, changeAllBetaTest, changeIsRndItm, updateTestsArr, changeAllTest, changeTestName, getAllQuestionsCount, getAllQuestionsCountFunc, getAllExamInfoCountFunc, getAllWrongQuestionsCountFunc, getInitInfoArr, clearArrFunc, addQuestionFunc } = testSlice.actions


export default testSlice.reducer
