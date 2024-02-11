import { createAsyncThunk } from "@reduxjs/toolkit"
import { StudentsAllInfoType } from "./studentReducerTs.interface";



export const sendCompletedExamInfoF = createAsyncThunk(
    'test/sendCompletedExamInfoF',
    async (item: { info: StudentsAllInfoType | null }) => {

        console.log(item, 'sendCompletedExamInfoF')

        try {
            const response = await fetch(`/send-completed-exam-info`,
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
