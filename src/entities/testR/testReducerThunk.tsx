import { createAsyncThunk } from "@reduxjs/toolkit"
import { AllExamInfoType, CategoryInfoQuestType, CategoryInfoType, NewTestInfoType, QuestionType } from "./testReducerTs.interface";
import { ForthTypeQsAnswersType } from "entities/nTestR/nTestReducerTs.interface";
// import { QuestionType } from "./testReducerTs.interface";


export const sendQuestionFunc = createAsyncThunk(
    'test/sendQuestion',
    async (item: { info: Array<CategoryInfoType> | null, name: string, subjjectName: string | undefined, textInfo: AllExamInfoType | null, otherInfo: NewTestInfoType, questionCount: ForthTypeQsAnswersType }) => {


        try {
            const response = await fetch(`/add-question`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ info: item }),
                })

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            return data

        } catch (error) {
            throw error
        }
    }
)



export const updateQuestionFunc = createAsyncThunk(
    'test/updateQuestionFunc',
    async (item: { info: Array<CategoryInfoType> | null, name: string, subjjectName: string | undefined, textInfo: AllExamInfoType | null, otherInfo: NewTestInfoType | null, questionCount: ForthTypeQsAnswersType | null }) => {

        console.log(item, 'updateupdateupdateupdateasdasdasdupdateupdate')

        try {
            const response = await fetch(`/update-test`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ info: item }),
                })

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            return data

        } catch (error) {
            throw error
        }
    }
)



export const deleteQuestionFunc = createAsyncThunk(
    'test/deleteQuestionFunc',
    async (item: { val: QuestionType, val1: CategoryInfoType, subjjectName: string | undefined, name: string }) => {

        console.log(item, 'updateupdateupdateupdateasdasdasdupdateupdate')

        try {
            const response = await fetch(`/delete-test`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ info: item }),
                })

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            return data

        } catch (error) {
            throw error
        }
    }
)







// export const getQuestionFunc = createAsyncThunk(
//     'test/getQuestionFunc',
//     async () => {
//         try {
//             const response = await fetch('/get-tests')
//             if (!response.ok) {
//                 throw new Error('Request failed');
//             }


//             const data = await response.json();
//             return data

//         } catch (error) {
//             throw error
//         }
//     }
// )