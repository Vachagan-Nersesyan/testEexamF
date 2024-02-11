import React, { useEffect, useState } from 'react'
import styles from './studentStl.module.css'
import { OwnProps } from './studentTs.interface'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'
import { QuestCountInfoType } from 'entities/nTestR/nTestReducerTs.interface'
import { CategoryInfoType } from 'entities/testR/testReducerTs.interface'
import { useNavigate } from 'react-router-dom'
import { SubjectExamType, SubjectType } from 'entities/subjectR/subjectReducerTs.interface'
import { getExamsFunc } from 'entities/subjectR/subjectReducerThunk'
import { changeExistsExamInfo, initClassCurrentNameFunc } from 'entities/student/studentReducer'
import { Input } from 'antd'

const StudentComp: React.FC<OwnProps> = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const aDispatch = useAppDispatch()

    const isAdminItem = useSelector((state: AppStateType) => state.adminR.isAdmin)

    if (isAdminItem) {
        navigate('/admin')
    }

    useEffect(() => {
        aDispatch(getExamsFunc())
    }, [])

    const allSubjectsInfo = useSelector((state: AppStateType) => state.subjectR.allExams)
    const [allSubjectsInfoHk, setAllSubjectsInfoHk] = useState<Array<SubjectType>>(allSubjectsInfo)

    useEffect(() => {
        setAllSubjectsInfoHk(allSubjectsInfo)
    }, [allSubjectsInfo])


    const [classNumber, setClassNumber] = useState<string>('')

    useEffect(() => {
        dispatch(initClassCurrentNameFunc({ name: '' }))
    }, [])

    const saveClassNumberFunc: () => void = () => {
        if (classNumber) {
            let subjectExistsArrClone: Array<SubjectExamType> = []
            allSubjectsInfoHk.map((val, ind) => {
                val.exams.map((val1, ind1) => {
                    if (val1.textInfo) {
                        if (val1.textInfo.classNumber === classNumber) {
                            subjectExistsArrClone.push(val1)
                        }
                    }
                })
            })

            dispatch(initClassCurrentNameFunc({ name: classNumber }))
            dispatch(changeExistsExamInfo({ info: subjectExistsArrClone }))
            navigate('/exists-tests')
        }

    }

    return (
        <div className={styles.student_content}>
            <div className={styles.student_content_container}>
                <div className={styles.student_content_container_txt_content}>
                    <div className={styles.student_content_container_txt_content_1}>
                        <div className={styles.student_content_container_txt_content_1_1}>
                            Խնդրում ենք գրեք Ձեր խմբի համարը
                        </div>
                        <div className={styles.student_content_container_txt_content_1_2}>
                            <Input onChange={(e) => setClassNumber(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.student_content_container_txt_content_btn}>
                        <button onClick={saveClassNumberFunc}>Հաստատել</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentComp