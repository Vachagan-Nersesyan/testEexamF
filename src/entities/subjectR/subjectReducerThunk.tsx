import { createAsyncThunk } from "@reduxjs/toolkit"
import { SubjectType } from "./subjectReducerTs.interface";


export const addSubjectFunc = createAsyncThunk(
    'exam/addSubjectFunc',
    async (item: { info: SubjectType | null }) => {
        console.log(item.info, 'item.infoitem.infoitem.infoitem.infoitem.infoitem.info')
        try {
            const response = await fetch(`/add-subject`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ info: item.info }),
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



export const getExamsFunc = createAsyncThunk(
    'test/getExamsFunc',
    async () => {
        try {
            const response = await fetch('/get-subject')
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


export const changeSubjectPicFunc = createAsyncThunk(
    'exam/changeSubjectPicFunc',
    async (item: { subjectName: string | undefined, picture: string | null }) => {
        console.log(item, 'item.infoitem.infoitem.infoitem.infoitem.infoitem.info')
        try {
            const response = await fetch(`/change-picture`,
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
