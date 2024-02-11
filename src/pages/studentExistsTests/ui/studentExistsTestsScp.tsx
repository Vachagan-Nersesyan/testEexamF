import React, { useEffect, useState } from 'react'
import styles from './studentExistsTestsStl.module.css'
import { OwnProps } from './studentExistsTestsTs.interface'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from 'entities/store/redux-store'
import { SubjectExamType } from 'entities/subjectR/subjectReducerTs.interface'
import { useNavigate } from 'react-router-dom'
import { changeStudentNumstInfo, changeStudentOthInfo, changeStudentTestsInfo } from 'entities/student/studentReducer'




const StudentExistsTestsComp: React.FC<OwnProps> = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentClassNamefh = useSelector((state: AppStateType) => state.studentR.classCrntName)
    
    const [currentClassNamefhHk, setCurrentClassNamefhHk] = useState<string>(currentClassNamefh)

    useEffect(() => {
        setCurrentClassNamefhHk(currentClassNamefh)
    }, [currentClassNamefh])


    if (!currentClassNamefhHk) {
        navigate('/')
    }

    const isAdminItem = useSelector((state: AppStateType) => state.adminR.isAdmin)

    if (isAdminItem) {
        navigate('/admin')
    }

    const existsTestComp = useSelector((state: AppStateType) => state.studentR.allExamExists)
    const [existsTestCompHk, setExistsTestCompHk] = useState<Array<SubjectExamType>>(existsTestComp)

    useEffect(() => {
        setExistsTestCompHk(existsTestComp)
    }, [existsTestComp])

 


    const saveAllNewExamChanges: (obj: SubjectExamType) => void = (obj: SubjectExamType) => {
        
        dispatch(changeStudentOthInfo({ info: obj.textInfo }))
        dispatch(changeStudentNumstInfo({ info: obj.questionCount }))
        dispatch(changeStudentTestsInfo({ info: obj.info }))
        navigate('/student-test-st')
    }

    return (
        <div className={styles.student_exists_content}>
            <div className={styles.student_exists_content_container}>
                <div className={styles.student_exists_content_container_title}>
                    Քննություններ
                </div>
                {
                    existsTestCompHk.length === 0
                        ?
                        <div className={styles.student_exists_content_container_subtitle}>
                            Կներեք քննություններ դեռ չկան։
                        </div>
                        :
                        <div className={styles.student_exists_content_container_exms_prt}>
                            {
                                existsTestCompHk.map((val) => {
                                    return (
                                        <div className={styles.student_exists_content_container_exms_prt_item}>
                                            <button onClick={() => saveAllNewExamChanges(val)}>
                                                {val.name} {val.subjjectName}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default StudentExistsTestsComp