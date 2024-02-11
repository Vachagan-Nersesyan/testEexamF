import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './subjectExamStl.module.css'
import { OwnProps } from './subjectExamTs.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeAllTest, changeIsRndItm, changeTestName, getOtherInfo, getTestSubjectName, updateTestsArr } from 'entities/testR/testReducer'
import { saveSubjectNameFunc } from 'entities/subjectR/subjectReducer'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'
import { SubjectType } from 'entities/subjectR/subjectReducerTs.interface'
import SubjectExamItemComp from 'feautures/subjectExamItem'
import { Col, Input, Modal, Row, Select } from 'antd'

import pic from '../images/1.png'
import loader from '../images/2.gif'
import { changeSubjectPicFunc, getExamsFunc } from 'entities/subjectR/subjectReducerThunk'
import { AllExamInfoType } from 'entities/testR/testReducerTs.interface'


const SubjectExamComp: React.FC<OwnProps> = ({ }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [isShowExamItems, setIsShowExamItems] = useState<boolean>(false)

    const [examName, setExamName] = useState<string>('')





    const params = useParams()
    const aDispatch = useAppDispatch()

    const [chAnsQuest, setChAnsQuest] = useState<AllExamInfoType>({
        examYear: 0,
        examType: '',
        subjectName: '',
        classNumber: '',
        teachersName: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChAnsQuest((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const generateTestFunc: () => void = () => {
        // dispatch(updateTestsArr())

        dispatch(changeIsRndItm(true))

        dispatch(changeTestName({ info: examName }))
        // dispatch(saveSubjectNameFunc({ info: val.subjectName }))
        dispatch(getTestSubjectName({ info: params.id }))

        dispatch(updateTestsArr())
        dispatch(getOtherInfo({ info: chAnsQuest }))

        navigate('/test-items')
    }

    console.log(params, 'paramsparamsparams')
    const [currentSubject, setCurrentSubject] = useState<SubjectType | null>(null)

    const allTextsArr = useSelector((state: AppStateType) => state.subjectR.allExams)
    const [allTextsArrHk, setAllTextsArrHk] = useState<Array<SubjectType>>(allTextsArr)

    useEffect(() => {
        console.log('ccccccccccc')
        aDispatch(getExamsFunc())
    }, [])

    useEffect(() => {
        setAllTextsArrHk(allTextsArr)
    }, [allTextsArr])

    useEffect(() => {
        allTextsArrHk.map((val: SubjectType) => {
            console.log(val, 'after')
            if (val.subjectName === params.id) {
                console.log(val)
                setCurrentSubject(val)
            }
        })
    }, [allTextsArrHk])

    console.log(currentSubject, 'currentSubject')

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const [currentWrongItem, setCurrentWrongItem] = useState<number | null>(null)

    const handleOk = () => {


        if (examName && chAnsQuest.classNumber && chAnsQuest.examType && chAnsQuest.examYear && chAnsQuest.subjectName && chAnsQuest.teachersName) {
            setIsModalOpen(false);
            generateTestFunc()
            setCurrentWrongItem(null)
        } else {
            switch (true) {
                case !examName:
                    setCurrentWrongItem(1)
                    break
                case !chAnsQuest.examYear:
                    setCurrentWrongItem(2)
                    break
                case !chAnsQuest.subjectName:
                    setCurrentWrongItem(3)
                    break
                case !chAnsQuest.classNumber:
                    setCurrentWrongItem(4)
                    break
                case !chAnsQuest.teachersName:
                    setCurrentWrongItem(5)
                    break
                default:
                    return null

            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [selectedSbjImage, setSelectedSbjImage] = useState<string | null>('');

    const setImageSbjFunc = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const selectedFile = fileInput.files && fileInput.files[0];

        // console.log(selectedFile, 'selectedFile')

        if (selectedFile) {
            const reader = new FileReader();

            // console.log(reader, 'reader')
            reader.onload = (e) => {
                setSelectedSbjImage(e.target?.result as string);
            };


            reader.readAsDataURL(selectedFile);
        }
    }

    useEffect(() => {
        console.log(currentSubject?.subjectName, 'currentSubject?.subjectName')

        if (selectedSbjImage && currentSubject?.subjectName) {
            aDispatch(changeSubjectPicFunc({ subjectName: currentSubject?.subjectName, picture: selectedSbjImage }))

        }
    }, [selectedSbjImage])

    const loadComp = useSelector((state: AppStateType) => state.subjectR.loading)
    const [loadCompHk, setLoadCompHk] = useState<boolean>(loadComp)

    useEffect(() => {
        setLoadCompHk(loadComp)
    }, [loadComp])



    console.log(chAnsQuest, 'chAnsQuest')

    const slctHandleInputChange = (value: string) => {
        console.log(`selected ${value}`);
        if (!value) {
            value = 'Միասնական քննություն'
        }
        chAnsQuest.examType = value
        console.log(chAnsQuest, 'chAnsQuest')
    };


    return (
        <>
            <div className={styles.subject_exma_item_content}>
                <div className={styles.subject_exma_item_content_1_title}>
                    {currentSubject?.subjectName}
                </div>
                <Row>
                    <Col span={17}>
                        <div className={styles.subject_exma_item_content_2_item}>
                            <div className={styles.subject_exma_item_content_2_item_2_item}>
                                {
                                    currentSubject?.exams.map((val2) => {
                                        return (
                                            <SubjectExamItemComp subjectName={val2.subjjectName} name={val2.name} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col span={7} className={styles.subject_exma_item_content_sec_col}>
                        <div className={styles.subject_exma_item_content_sec_col_content}>
                            <div className={styles.subject_exma_item_content_sec_col_1}>
                                Թեստի նկարը
                            </div>
                            <div className={styles.subject_exma_item_content_sec_col_2}>
                                <input type="file" onChange={setImageSbjFunc} accept="image/png, image/jpeg" />
                            </div>
                        </div>
                        {
                            loadCompHk
                                ?
                                <div className={styles.subject_exma_item_content_sec_col_loader}>
                                    <img src={loader} alt="" />
                                </div>
                                :
                                null
                        }

                        <div className={styles.subject_exma_item_content_sec_col_2}>
                            <img src={selectedSbjImage ? selectedSbjImage : ''} alt="" />
                        </div>
                    </Col>
                </Row>
                <div className={styles.subject_exma_item_content_2_item_3_item}>
                    <button onClick={showModal}>
                        Ավելացնել քննություն
                    </button>
                </div>
            </div>

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
                        Նոր թեստի ստեղծում
                    </div>
                    <div className={styles.exam_mdl_content_txt}>
                        <div className={styles.test_content_in_items}>
                            <div className={styles.test_content_in_items_1}>
                                <div className={styles.exam_mdl_content_txt_1}>
                                    Խնդրում ենք գրեք թեստի անվանումը
                                </div>
                                <div className={styles.exam_mdl_content_txt_2}>
                                    <Input onChange={(e) => setExamName(e.target.value)} />
                                </div>
                                {
                                    currentWrongItem === 1
                                        ?
                                        <div className={styles.exam_mdl_content_txt_3}>
                                            Կներեք թեստի անվանումը սխալ է
                                        </div>
                                        : null
                                }
                            </div>
                            <div className={styles.test_content_in_items_1}>
                                <div className={styles.exam_mdl_content_txt_1}>
                                    Խնդրում ենք նշեք քննության տարեթիվը
                                </div>
                                <div className={styles.test_content_in_items_1_2}>
                                    <Input type="number" name='examYear' onChange={handleInputChange} />
                                </div>
                                {
                                    currentWrongItem === 2
                                        ?
                                        <div className={styles.exam_mdl_content_txt_3}>
                                            Կներեք թեստի տարեթիվը սխալ է
                                        </div>
                                        : null
                                }
                            </div>
                            <div className={styles.test_content_in_items_1}>
                                <div className={styles.exam_mdl_content_txt_1}>
                                    Խնդրում ենք նշեք քննության տեսակը
                                </div>
                                <div className={styles.test_content_in_items_1_2}>
                                    <Select
                                        // defaultValue="lucy"
                                        // name='examType'
                                        style={{ width: '100%' }}
                                        onChange={slctHandleInputChange}
                                        options={[
                                            { value: 'Միասնական քննություն', label: 'Միասնական քննություն' },
                                            { value: 'Միջանկյալ քննություն', label: 'Միջանկյալ քննություն' }
                                        ]}
                                    />
                                    {/* <Input type="text" name='examType' onChange={handleInputChange} /> */}
                                </div>
                            </div>
                            <div className={styles.test_content_in_items_1}>
                                <div className={styles.exam_mdl_content_txt_1}>
                                    Խնդրում ենք նշեք քննության առարկայի անունը
                                </div>
                                <div className={styles.test_content_in_items_1_2}>
                                    <Input type="text" name='subjectName' onChange={handleInputChange} />
                                </div>
                                {
                                    currentWrongItem === 3
                                        ?
                                        <div className={styles.exam_mdl_content_txt_3}>
                                            Կներեք թեստի տարեթիվը սխալ է
                                        </div>
                                        : null
                                }
                            </div>
                            <div className={styles.test_content_in_items_1}>
                                <div className={styles.exam_mdl_content_txt_1}>
                                    Խնդրում ենք նշեք խմբի համարը
                                </div>
                                <div className={styles.test_content_in_items_1_2}>
                                    <Input type="text" name='classNumber' onChange={handleInputChange} />
                                </div>
                                {
                                    currentWrongItem === 4
                                        ?
                                        <div className={styles.exam_mdl_content_txt_3}>
                                            Կներեք թեստի տարեթիվը սխալ է
                                        </div>
                                        : null
                                }
                            </div>
                            <div className={styles.test_content_in_items_1}>
                                <div className={styles.exam_mdl_content_txt_1}>
                                    Խնդրում ենք գրեք ուսուցչի անունը
                                </div>
                                <div className={styles.test_content_in_items_1_2}>
                                    <Input type="text" name='teachersName' onChange={handleInputChange} />
                                </div>
                                {
                                    currentWrongItem === 5
                                        ?
                                        <div className={styles.exam_mdl_content_txt_3}>
                                            Կներեք թեստի տարեթիվը սխալ է
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default SubjectExamComp