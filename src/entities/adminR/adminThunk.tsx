import { createAsyncThunk } from "@reduxjs/toolkit"

export const getInstituteInfoFunc = createAsyncThunk(
    'test/getInstituteInfoFunc',
    async () => {
        try {
            console.log('worked')
            const response = await fetch('/get-institute-info')
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

export const getTeacherInfoFunc = createAsyncThunk(
    'test/getTeacherInfoFunc',
    async () => {
        try {
            const response = await fetch('/get-teacher-info')
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


export const isPasswordValidFunc = createAsyncThunk(
    'test/isPasswordValidFunc',
    async (item: { info: string }) => {

        console.log(item, 'passwor admin info')

        try {
            const response = await fetch(`/password-valid`,
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
export const logOutFunc = createAsyncThunk(
    'test/logOutFunc',
    async (item: { info: string | undefined }) => {

        console.log(item, 'passwor admin info')

        try {
            const response = await fetch(`/log-out`,
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


