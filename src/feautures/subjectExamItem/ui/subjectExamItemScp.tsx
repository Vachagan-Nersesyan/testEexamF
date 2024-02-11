import React, { useEffect, useState } from 'react'
import styles from './subjectExamItemsStl.module.css'
import { OwnProps } from './subjectExamItemTs.interface'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from 'entities/store/redux-store'
import { SubjectType } from 'entities/subjectR/subjectReducerTs.interface'
import { changeAllBetaTest, changeAllTest, changeIsRndItm, getTestName, getTestSubjectName, updateTestsArr } from 'entities/testR/testReducer'
import { useNavigate } from 'react-router-dom'
import { saveSubjectNameFunc } from 'entities/subjectR/subjectReducer'
import { Col, Dropdown, MenuProps, Row } from 'antd'

const SubjectExamItemComp: React.FC<OwnProps> = ({ name, subjectName }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const allExams = useSelector((state: AppStateType) => state.subjectR.allExams)

    const [subjectArr, setSubjectArr] = useState<Array<SubjectType>>(allExams)


    useEffect(() => {
        setSubjectArr(allExams)
    }, [allExams])

    const generateFsttest = (subjectName: string, examName: string) => {
        subjectArr.map((val) => {
            if (val.subjectName === subjectName) {
                val.exams.map((val1) => {
                    if (val1.name === examName) {
                        dispatch(changeAllTest({ info: val1.info }))

                        navigate('/test-without-anwers-exams')
                        // downloadFile()


                    }
                })
            }
        })
    }






    const generateTsttest = (subjectName: string, examName: string) => {
        subjectArr.map((val) => {
            if (val.subjectName === subjectName) {
                val.exams.map((val1) => {
                    if (val1.name === examName) {
                        dispatch(changeAllTest({ info: val1.info }))

                        navigate('/test-answers-exams')
                        // downloadFile()


                    }
                })
            }
        })
    }


    const generateForthsttest = (subjectName: string, examName: string) => {
        subjectArr.map((val) => {
            if (val.subjectName === subjectName) {
                val.exams.map((val1) => {
                    if (val1.name === examName) {

                        // dispatch(updateTestsArr())
                        dispatch(getTestName({ info: examName }))
                        dispatch(saveSubjectNameFunc({ info: examName }))
                        dispatch(getTestSubjectName({ info: subjectName }))
                        dispatch(changeAllBetaTest({ info: val1.info }))
                        dispatch(changeAllTest({ info: val1.info }))
                        dispatch(changeIsRndItm(true))

                        navigate('/test-items')
                        // downloadFile()


                    }
                })
            }
        })
    }


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={() => generateFsttest(subjectName, name)} className={styles.subject_exma_item_content_2_item_2_item_1_print_content_1}>
                    print by test
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => generateTsttest(subjectName, name)} className={styles.subject_exma_item_content_2_item_2_item_1_print_content_1}>
                    print by answers test

                </div>
            ),
        }
    ];


    return (
        // <Dropdown menu={{ items }} placement="bottomLeft">
        <Row className={styles.subject_exam_item_qw}>
            <Col span={12}>
                <button className={styles.subject_exma_item_content_2_item_2_item_1_in_item} onClick={() => generateForthsttest(subjectName, name)}>
                    {name}
                </button>
            </Col>
            <Col span={12} className={styles.subject_exam_item_qw_sec_col}>
                <button onClick={() => generateFsttest(subjectName, name)} className={styles.subject_exma_item_content_2_item_2_item_1_print_content_1}>
                    print by test
                </button>
                <button onClick={() => generateTsttest(subjectName, name)} className={styles.subject_exma_item_content_2_item_2_item_1_print_content_1}>
                    print by answers test

                </button>
            </Col>
        </Row>
    )
}

export default SubjectExamItemComp