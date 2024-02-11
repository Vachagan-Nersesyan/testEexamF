import React, { useEffect, useState } from 'react'
import styles from './examsStl.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'

import { OwnProps } from './examsTs.interface'
import { SubjectType } from 'entities/subjectR/subjectReducerTs.interface'
import { addSubjectFunc, getExamsFunc } from 'entities/subjectR/subjectReducerThunk'

import { NavLink, useNavigate } from 'react-router-dom'
import { saveSubjectNameFunc } from 'entities/subjectR/subjectReducer'


import { Col, Input, Modal, Row } from 'antd'
import { AllTeacherInfoType } from 'entities/adminR/adminReducerTs.interface'


const WorkspaceComp: React.FC<OwnProps> = () => {


    const aDispatch = useAppDispatch()
    const dispatch = useDispatch()


    const [subjectName, setSubjectName] = useState<string>('')

    useEffect(() => {
        aDispatch(getExamsFunc())
    }, [])


    const allExams = useSelector((state: AppStateType) => state.subjectR.allExams)
    const [subjectArr, setSubjectArr] = useState<Array<SubjectType>>(allExams)

    const loader = useSelector((state: AppStateType) => state.subjectR.loading)
    const [loaderHk, setLoaderHk] = useState<boolean>(loader)

    const curentTeacherInfoComp = useSelector((state: AppStateType) => state.adminR.curentTeacherInfo)
    const [curentTeacherInfoCompHk, setCurentTeacherInfoCompHk] = useState<AllTeacherInfoType | null>(curentTeacherInfoComp)
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        setCurentTeacherInfoCompHk(curentTeacherInfoComp)
    }, [curentTeacherInfoComp])

    useEffect(() => {
        setLoaderHk(loader)
    }, [loader])


    useEffect(() => {

        let allExamsClone = allExams.filter((val) => val.teacherName === curentTeacherInfoCompHk?.password)

        setSubjectArr(allExamsClone)
    }, [allExams])

    useEffect(() => {
        let allExamsClone = allExams.filter((val) => val.teacherName === curentTeacherInfoCompHk?.password)

        setSubjectArr(allExamsClone)

    }, [])


    const addSubject: () => void = () => {
        let obj = {
            subjectName,
            exams: [],
            date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
            picture: '',
            teacherName: curentTeacherInfoCompHk?.password
        }


        dispatch(saveSubjectNameFunc({ info: subjectName }))
        aDispatch(addSubjectFunc({ info: obj }))
    }



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        addSubject()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.exam_contant}>
                <div className={styles.exam_content_sub_ttle}>
                    <Row>
                        <Col span={12}>
                            Առարկաներ
                        </Col>
                        <Col span={12} className={styles.exam_add_content}>
                            <div className={styles.exam_add_content_in_item_2}>
                                <button onClick={showModal}>Ավելացնել առարկա</button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.exam_contant_container_in_cont_ovrl}>
                    {
                        subjectArr.length === 0
                            ?
                            <div className={styles.exam_contant_container_in_cont_title}>
                                Դեռ առարկաներ գոյություն չունեն
                            </div>

                            :


                            <Row className={styles.exam_contant_container_in_cont}>

                                {
                                    loaderHk
                                        ?
                                        <div className={styles.login_content_text_item_loader}>
                                            <img src={`${loader}`} alt="" />
                                        </div>
                                        :
                                        subjectArr.map((val) => {
                                            return (
                                                <NavLink className={styles.exam_contant_container_in_cont_item} style={{ backgroundImage: `url(${val.picture})` }} to={`/exams/${val.subjectName}`} >
                                                    <span className={styles.exam_contant_container_in_cont_item_1}>{val.date}</span>
                                                    <span>{val.subjectName}</span>
                                                </NavLink>
                                            )
                                        })
                                }
                            </Row>
                    }
                </div>



            </div >
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText={<div>Չեղարկել</div>}
                okText={<div>Հաստատել</div>}
                closable={false}
            >
                <div className={styles.exam_mdl_content}>
                    <div className={styles.exam_mdl_content_title}>
                        Ավելացնել Նոր առարկա
                    </div>
                    <div className={styles.exam_mdl_content_txt}>
                        <div className={styles.exam_mdl_content_txt_1}>
                            Խնդրում ենք գրեք  առարկայի անվանումը
                        </div>
                        <div className={styles.exam_mdl_content_txt_2}>
                            <Input onChange={(e) => setSubjectName(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default WorkspaceComp