import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './tableSubjectItemStl.module.css'
import { OwnProps } from './tableSubjectItemTs.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'
import { SubjectExamType, SubjectType } from 'entities/subjectR/subjectReducerTs.interface'
import { getExamsFunc } from 'entities/subjectR/subjectReducerThunk'
import { AllTeacherInfoType } from 'entities/adminR/adminReducerTs.interface'
import { updateQuestionFunc } from 'entities/testR/testReducerThunk'
import { AllExamInfoType, CategoryInfoType, NewTestInfoType } from 'entities/testR/testReducerTs.interface'
import { ForthTypeQsAnswersType } from 'entities/nTestR/nTestReducerTs.interface'
import { changeAllTest, getTestName } from 'entities/testR/testReducer'
import loader from '../images/1.gif'
import { Col, Popover, Row } from 'antd'

const TableSubjectItem: React.FC<OwnProps> = () => {

    const params = useParams()
    const aDispatch = useAppDispatch()
    const navigate = useNavigate()


    const allExamsArr = useSelector((state: AppStateType) => state.subjectR.allExams)
    const [allExamsArrHk, setAllExamsArrHk] = useState<Array<SubjectType>>(allExamsArr)
    const loader = useSelector((state: AppStateType) => state.subjectR.loading)

    const [currentExamsArrHk, setCurrentExamsArrHk] = useState<Array<SubjectExamType> | null>(null)

    const [loaderHk, setLoaderHk] = useState<boolean>(loader)


    useEffect(() => {

        setLoaderHk(loader)
        setAllExamsArrHk(filterArrFunc(allExamsArr))

    }, [loader])

    useEffect(() => {
        setAllExamsArrHk(filterArrFunc(allExamsArr))
    }, [allExamsArr])

    useEffect(() => {
        aDispatch(getExamsFunc())
    }, [])

    useEffect(() => {
        let dataClone: any = []

        allExamsArrHk.map((val) => {
            val.exams.map((val1, ind1) => {
                if (val1.textInfo?.examType === params.id) {
                    dataClone.push(val1)
                }
            })
        })


        setCurrentExamsArrHk(dataClone)

    }, [allExamsArrHk])

    const filterArrFunc: (arr: Array<SubjectType>) => Array<SubjectType> = (arr) => {

        let dataClone: any = []

        let data = arr.filter((val) => {
            // console.log(data, 'data ')
            if (val.teacherName === currentTeacherInfoCmHk?.password) {

                dataClone.push(val)
            }
        })

        console.log(data, dataClone, 'data')
        return dataClone
    }


    const currentTeacherInfoCm = useSelector((state: AppStateType) => state.adminR.curentTeacherInfo)
    const [currentTeacherInfoCmHk, setCurrentTeacherInfoCmHk] = useState<AllTeacherInfoType | null>(currentTeacherInfoCm)

    useEffect(() => {
        setCurrentTeacherInfoCmHk(currentTeacherInfoCm)
    }, [currentTeacherInfoCm])




    const [allTtests, setAllTtestsHk] = useState<Array<CategoryInfoType> | null>(null)
    const [currentExamNameClone, setCurrentExamNameClone] = useState<string>('')

    const [forthTypeQsCloneAnswers, setForthTypeQsCloneAnswers] = useState<any>({
        firstNum: '',
        secondNum: '',
        thirdNum: '',

    });

    const handlenewdwqInfInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // if (!isNaN(Number(event.target.value))) {
        setForthTypeQsCloneAnswers({
            ...forthTypeQsCloneAnswers,
            [event.target.name]: event.target.value,
        });
        // }
    };

    console.log(forthTypeQsCloneAnswers, 'forthTypeQsAnswersforthTypeQsAnswersssswq')

    const [currentSubjectName, setCurrentSubjectName] = useState<string | undefined>(undefined)
    const [chAnsQuest, setChAnsQuest] = useState<AllExamInfoType | null>(null)
    const [nwTestsqInfo, setNwTestsqInfo] = useState<NewTestInfoType | null>(null)
    const [forthTypeQsAnswers, setForthTypeQsAnswers] = useState<ForthTypeQsAnswersType | null>(null)

    const dispatch = useDispatch()

    const changeArrFunc = (number: ForthTypeQsAnswersType, arr: Array<CategoryInfoType> | null) => {
        console.log(number, arr, 'number, arr')

        let numberInfoClone: ForthTypeQsAnswersType | any = {}

        // for (let i in number) {
        // console.log(number[ind])
        arr?.map((val, ind) => {
            let o = ind === 0 ? forthTypeQsCloneAnswers.firstNum : ind === 1 ? forthTypeQsCloneAnswers.secondNum : forthTypeQsCloneAnswers.thirdNum
            console.log(val, 'valval')
            console.log(o, 'ooooooooooooooooooooo')
            let itemsLength = 0

            val.questions.map((val2, ind2) => {
                itemsLength += val2.questionType.length
            })

            if (itemsLength <= Number(o)) {
                if (ind === 0) {

                    numberInfoClone.thchoose = `${arr[0]?.questions[0]?.questionType.length}`;

                } else if (ind === 1) {
                    numberInfoClone.thshort = `${arr[1]?.questions[0]?.questionType.length}`;
                    numberInfoClone.thshortb = `${arr[1]?.questions[1]?.questionType.length}`;

                } else if (ind === 2) {

                    numberInfoClone.thshortanvariant = `${arr[2]?.questions[0]?.questionType.length}`;
                    numberInfoClone.thshortcctgry = `${arr[2]?.questions[1]?.questionType.length}`;

                }

            } else {
                if (ind === 0) {
                    numberInfoClone.thchoose = o

                } else if (ind === 1) {
                    let firstNum = Math.ceil((Math.random() * arr[1]?.questions[0]?.questionType.length) + 0)
                    let secondNum = Number(o) - firstNum


                    numberInfoClone.thshort = String(firstNum)
                    numberInfoClone.thshortb = String(secondNum)

                } else if (ind === 2) {
                    let firstNum = Math.ceil((Math.random() * arr[2]?.questions[0]?.questionType.length) + 0)
                    let secondNum = Number(o) - firstNum


                    numberInfoClone.thshortanvariant = String(firstNum)
                    numberInfoClone.thshortcctgry = String(secondNum)

                }

            }

        })
        return numberInfoClone
    }



    const changeTestInfo = (val: SubjectExamType) => {
        // console.log(val)
        let o = changeArrFunc(forthTypeQsCloneAnswers, val.info)
        console.log(o)
        // allExamsArrHk.
        setAllTtestsHk(val.info)
        setCurrentExamNameClone(val.name)
        setCurrentSubjectName(val.subjjectName)
        setChAnsQuest(val.textInfo)
        setNwTestsqInfo(val.otherInfo)
        // setNwTestsqInfo(val.otherInfo)
        dispatch(getTestName({ info: val.name }))
        // setForthTypeQsAnswers(val.questionCount)
        setForthTypeQsAnswers(changeArrFunc(forthTypeQsCloneAnswers, val.info))



    }


    const getAllExamOthInfoCompFunc: () => void = () => {

        console.log(currentSubjectName, 'currentSubjectName')

        aDispatch(updateQuestionFunc({ info: allTtests, name: currentExamNameClone, subjjectName: currentSubjectName, textInfo: chAnsQuest, otherInfo: nwTestsqInfo, questionCount: forthTypeQsAnswers }))

        // navigate('/table-subjects')
    }
    const [open, setOpen] = useState<boolean>(false);
    const [numFalse, setNumFalse] = useState<number | null>(null);
    const [currentItemPopover, setCurrentItemPopover] = useState<number | null>(null);

    console.log(currentItemPopover, 'currentItemPopover')

    const hide = () => {
        setOpen(false);
    };


    return (
        <div className={styles.table_subject_item_content}>
            <div className={styles.table_subject_item_content_title}>
                Քննություններ
            </div>
            {
                loaderHk

                    ?
                    <div className={styles.login_content_text_item_loader}>
                        <img src={`${loader}`} alt="" />
                    </div>
                    :
                    <Row className={styles.login_content_text_item_row}>
                        {
                            currentExamsArrHk?.length
                                ?
                                currentExamsArrHk?.map((val, ind) => {

                                    let firstArrLength = val.info[0].questions[0].questionType.length
                                    let secondArrLength = val.info[1].questions[0].questionType.length + val.info[1].questions[1].questionType.length
                                    let thirdArrLength = val.info[2].questions[0].questionType.length + val.info[2].questions[1].questionType.length


                                    return (
                                        <Col span={24} className={styles.login_content_text_item_col}>
                                            <Row className={styles.login_content_text_item_col_in_row}>
                                                <Col span={6}>
                                                    <div className={styles.login_content_text_item_col_title}>
                                                        {val.name}
                                                    </div>
                                                </Col>
                                                <Col span={18} className={styles.login_content_text_item_col_in_row_in_col}>


                                                    <div className={styles.login_content_text_item_col_items}>
                                                        <div className={styles.login_content_text_item_col_items_1}>
                                                            <div className={styles.login_content_text_item_col_items_1_1}>
                                                                A
                                                            </div>

                                                            <div className={styles.login_content_text_item_col_items_1_2}>
                                                                <input name='firstNum' onChange={handlenewdwqInfInputChange} type="text" />
                                                            </div>
                                                            <div className={styles.login_content_text_item_col_items_1_1}>
                                                                {firstArrLength}
                                                            </div>
                                                        </div>
                                                        <div className={styles.login_content_text_item_col_items_1}>
                                                            <div className={styles.login_content_text_item_col_items_1_1}>
                                                                B
                                                            </div>

                                                            <div className={styles.login_content_text_item_col_items_1_2}>
                                                                <input name='secondNum' onChange={handlenewdwqInfInputChange} type="text" />
                                                            </div>
                                                            <div className={styles.login_content_text_item_col_items_1_1}>
                                                                {secondArrLength}
                                                            </div>
                                                        </div>
                                                        <div className={styles.login_content_text_item_col_items_1}>
                                                            <div className={styles.login_content_text_item_col_items_1_1}>
                                                                C
                                                            </div>

                                                            <div className={styles.login_content_text_item_col_items_1_2}>
                                                                <input name='thirdNum' onChange={handlenewdwqInfInputChange} type="text" />
                                                            </div>
                                                            <div className={styles.login_content_text_item_col_items_1_1}>
                                                                {thirdArrLength}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={styles.login_content_text_item_col_items_btn}>
                                                        <Popover
                                                            content={
                                                                <div>
                                                                    {
                                                                        numFalse === 1
                                                                            ?
                                                                            <div className={styles.login_content_text_item_col_items_btn_txt}>
                                                                                Կներեք A մակարդակաում այդքան հարց գոյություն չունի
                                                                            </div>
                                                                            :
                                                                            numFalse === 2
                                                                                ?
                                                                                <div className={styles.login_content_text_item_col_items_btn_txt}>
                                                                                    Կներեք B մակարդակաում այդքան հարց գոյություն չունի
                                                                                </div>
                                                                                :
                                                                                <div className={styles.login_content_text_item_col_items_btn_txt}>
                                                                                    Կներեք C մակարդակաում այդքան հարց գոյություն չունի
                                                                                </div>

                                                                    }
                                                                    <button onClick={hide} className={styles.login_content_text_item_col_items_btn_close}>Close</button>

                                                                </div>
                                                            }
                                                            title="Title"
                                                            trigger="click"
                                                            open={open && currentItemPopover === ind ? true : false}
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    if (firstArrLength >= forthTypeQsCloneAnswers.firstNum && secondArrLength >= forthTypeQsCloneAnswers.secondNum && thirdArrLength >= forthTypeQsCloneAnswers.thirdNum) {
                                                                        console.log(forthTypeQsCloneAnswers, 'vvvforthTypeQsCloneAnswers')
                                                                        changeTestInfo(val)
                                                                    } else {
                                                                        setCurrentItemPopover(ind)

                                                                        if (firstArrLength < forthTypeQsCloneAnswers.firstNum) {
                                                                            setNumFalse(1)

                                                                        } else if (secondArrLength < forthTypeQsCloneAnswers.secondNum) {
                                                                            setNumFalse(2)
                                                                        } else {
                                                                            setNumFalse(3)
                                                                        }

                                                                        setOpen(true)
                                                                    }

                                                                }
                                                                }
                                                            >Հաստատել փոփոխությունները
                                                            </button>
                                                        </Popover>
                                                    </div>
                                                </Col>




                                            </Row>
                                        </Col>
                                    )
                                })
                                :
                                <div className={styles.login_content_text_item_loader_notfnd}>
                                    Կներեք Քննություններ գոյություն չունեն
                                </div>
                        }
                    </Row>


            }
            <div className={styles.login_content_text_item_col_items_btn}>
                <button onClick={getAllExamOthInfoCompFunc}>Գեներացնել</button>
            </div>

        </div>
    )
}

export default TableSubjectItem