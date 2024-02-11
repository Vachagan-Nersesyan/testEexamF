import { createAsyncThunk } from "@reduxjs/toolkit"


export const getTestQuestFunc = createAsyncThunk(
    'test/getTestQuestFunc',
    async () => {
        try {
            const response = await fetch('/get-tests')
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