import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './finalTestStl.module.css'
import { InputState, OwnProps } from './finalTestTs.interface'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from 'entities/store/redux-store'

import pic from '../images/1.png'
import pic2 from '../images/2.png'
import { AllInfoAType, CategoryInfoType, NewTestInfoType } from 'entities/testR/testReducerTs.interface'
import { useNavigate } from 'react-router-dom'
import { updateArrAllAnswers } from 'entities/student/studentReducer'
import { AnwersArrType } from 'entities/wTestR/wTestReducerTs.interface'
import { SubjectExamType } from 'entities/subjectR/subjectReducerTs.interface'
import { QuestCountInfoType } from 'entities/nTestR/nTestReducerTs.interface'

const FinalTestComp: React.FC<OwnProps> = () => {


    const navigate = useNavigate()
    const allTestInfoSc = useSelector((state: AppStateType) => state.testR.allExamflInfo)
    const [allTestInfoScHk, setAllTestInfoScHk] = useState<null | SubjectExamType>(allTestInfoSc)

    useEffect(() => {
        setAllTestInfoScHk(allTestInfoSc)
    }, [allTestInfoSc])

    const [allTestInfo, setAllTestTxtInfo] = useState<QuestCountInfoType | undefined>(undefined)

    useEffect(() => {
        setAllTestTxtInfo(allTestInfoScHk?.questionCount)


    }, [allTestInfoScHk])

    const arrAllInfoss = useSelector((state: AppStateType) => state.testR.allTests)
    const [arrAllInfossHkArr, setArrAllInfossHkArr] = useState<Array<CategoryInfoType>>(arrAllInfoss)



    const isAdminItem = useSelector((state: AppStateType) => state.adminR.isAdmin)

    if (isAdminItem) {
        navigate('/')
    }




    let countBg = 0






    useEffect(() => {
        setArrAllInfossHkArr(arrAllInfoss)

    }, [arrAllInfoss])




    const arrAllInfo = useSelector((state: AppStateType) => state.testR.allInfoArr)
    const [arrInfo, setArrInfo] = useState<Array<AllInfoAType>>(arrAllInfo)

    useEffect(() => {
        setArrInfo(arrAllInfo)
        console.log(arrInfo, 'arrInfoarrInfo')
    }, [arrAllInfo])



    const subjectName = useSelector((state: AppStateType) => state.testR.subjectName)
    const examYear = useSelector((state: AppStateType) => state.testR.examYear)
    const examType = useSelector((state: AppStateType) => state.testR.examType)



    const arrAllQuestInfo = useSelector((state: AppStateType) => state.testR.wrongQuestArr)
    const [arrWrInfo, setArrWrInfo] = useState<Array<AllInfoAType>>(arrAllQuestInfo)

    useEffect(() => {
        setArrWrInfo(arrAllQuestInfo)
        console.log(arrWrInfo, 'arrWrInfoarrWrInfoarrWrInfoarrWrInfo')
    }, [arrAllQuestInfo])


    let writeTestAnswersArr: Array<AnwersArrType> = []
    const dispatch = useDispatch()

    const getWritenTestAnswers = (answer: number | null, questNum: any) => {

        let { name } = questNum.target
        console.log(questNum)

        let obj = {
            questNum: name,
            answer
        }
        if (writeTestAnswersArr.length === 0) { writeTestAnswersArr.push(obj) } else {
            let isInc = false
            for (let i in writeTestAnswersArr) {
                if (writeTestAnswersArr[i].questNum === obj.questNum) {
                    writeTestAnswersArr[i] = { ...obj }
                    isInc = true
                }
            }
            if (!isInc) {

                writeTestAnswersArr.push(obj)
            }

        }



        dispatch(updateArrAllAnswers({ info: obj }))

    }

    const getWritenTestSecAnswers = (answerYesOrNot: string | null, questNum: any) => {
        let { name } = questNum.target


        let obj = {
            questNum: name,

            answerYesOrNot
        }

        if (writeTestAnswersArr.length === 0) { writeTestAnswersArr.push(obj) } else {
            let isInc = false
            for (let i in writeTestAnswersArr) {
                if (writeTestAnswersArr[i].questNum === obj.questNum) {
                    writeTestAnswersArr[i] = { ...obj }
                    isInc = true
                }
            }
            if (!isInc) {
                writeTestAnswersArr.push(obj)
            }
        }

        dispatch(updateArrAllAnswers({ info: obj }))

    }



    const getWritenTestThirdAnswers = (answerBtype: string | null, questNum: any) => {
        let { name } = questNum.target


        let obj = {
            questNum: name,

            answerBtype
        }

        if (writeTestAnswersArr.length === 0) { writeTestAnswersArr.push(obj) } else {
            let isInc = false
            for (let i in writeTestAnswersArr) {
                if (writeTestAnswersArr[i].questNum === obj.questNum) {
                    writeTestAnswersArr[i] = { ...obj }
                    isInc = true
                }
            }
            if (!isInc) {
                writeTestAnswersArr.push(obj)
            }
        }
        dispatch(updateArrAllAnswers({ info: obj }))
    }


    const getWritenTestForthAnswers = (shortAnswers: string | null, questNum: any) => {
        let { name } = questNum.target


        let obj = {
            questNum: name,

            shortAnswers
        }

        if (writeTestAnswersArr.length === 0) { writeTestAnswersArr.push(obj) } else {
            let isInc = false
            for (let i in writeTestAnswersArr) {
                if (writeTestAnswersArr[i].questNum === obj.questNum) {
                    writeTestAnswersArr[i] = { ...obj }
                    isInc = true
                }
            }
            if (!isInc) {
                writeTestAnswersArr.push(obj)
            }
        }

        dispatch(updateArrAllAnswers({ info: obj }))

    }


    // get text info

    const [txtUserInfoClassValues, setTxtUserInfoClassValues] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    });

    const infoClassValuesHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (/^\d*$/.test(value)) {
            setTxtUserInfoClassValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };


    const [userNameInfoValues, setUserNameInfoValues] = useState({
        lastName: '',
        userName: '',
        fName: '',
        testVariant: null,
        lastText: ''
    });

    // Function to handle changes in any input
    const userNameInfoValuesInputHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserNameInfoValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

    };


    const endTestFunc: () => void = () => {
        console.log(writeTestAnswersArr, txtUserInfoClassValues, userNameInfoValues)
    }


    const allAnswersItem = useSelector((state: AppStateType) => state.studentR.allAnswers)


    const logoPicItem = useSelector((state: AppStateType) => state.adminR.instituteLogo)
    const [logoPicItemHk, setLogoPicItemHk] = useState<string>(logoPicItem)
    useEffect(() => {
        setLogoPicItemHk(logoPicItem)
    }, [logoPicItem])




    return (
        <div className={styles.test_content_overlay}>
            <div className={styles.test_content}>
                <div className={styles.test_content_container}>
                    <div className={styles.test_content_first_content}>
                        <div className={styles.test_content_first_content_1}>
                            <div className={styles.test_content_first_content_1_1}>
                                <div className={styles.test_content_first_content_1_1_txt_content}>
                                    <div className={styles.test_content_first_content_1_1_txt_content_1}>
                                        {examType} քննություն
                                    </div>
                                    <div className={styles.test_content_first_content_1_1_txt_content_1}>
                                        Առարկա՝ {subjectName}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.test_content_first_content_1_2}>
                                <span>Պատասխանների ձևաթուղթ</span>
                            </div>
                            <div className={styles.test_content_first_content_1_3}>
                                <div className={styles.test_content_first_content_1_3_1}>
                                    <input type="text" onChange={userNameInfoValuesInputHandleChange} name='lastName' />
                                </div>
                                <div className={styles.test_content_first_content_1_3_2}>
                                    Ազգանուն
                                </div>
                            </div>
                            <div className={styles.test_content_first_content_1_4}>
                                <div className={styles.test_content_first_content_1_4_1}>
                                    <div className={styles.test_content_first_content_1_3_1}>
                                        <input type="text" onChange={userNameInfoValuesInputHandleChange} name='userName' />
                                    </div>
                                    <div className={styles.test_content_first_content_1_3_2}>
                                        Անուն
                                    </div>
                                </div>
                                <div className={styles.test_content_first_content_1_4_1}>
                                    <div className={styles.test_content_first_content_1_3_1}>
                                        <input type="text" onChange={userNameInfoValuesInputHandleChange} name='fName' />
                                    </div>
                                    <div className={styles.test_content_first_content_1_3_2}>
                                        Հայրանուն
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.test_content_first_content_2}>
                            <div className={styles.test_content_first_content_2_1}>
                                <div className={styles.test_content_first_content_2_1_1}>
                                    Ճիշտ պատասխաններ
                                </div>
                                <div className={styles.test_content_first_content_2_1_2}>
                                    /80
                                </div>
                            </div>
                            <div className={styles.test_content_first_content_2_2}>

                                {
                                    [...new Array(4)].map((val7, ind7) => {
                                        return (
                                            <div className={styles.test_content_first_content_2_2_1}>
                                                <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                    <input type="text" name={`short1${ind7}`} onChange={infoClassValuesHandleChange} maxLength={1} className={styles.txtinp} />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className={styles.test_content_first_content_1_3_2}>
                                Խմբի համար
                            </div>
                        </div>
                        <div className={styles.test_content_first_content_3}>
                            <div className={styles.test_content_first_content_3_1}>
                                {/* <img src={logoPicItemHk} alt="" /> */}
                                <img src={`data:image/png;base64,${logoPicItemHk}`} />

                            </div>
                            <div className={styles.test_content_first_content_3_2}>
                                {examYear - 1}-{examYear}թ․
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.test_content_second_content}>
                    <div className={styles.test_content_second_content_1}>
                        <img src={pic} alt="" />
                    </div>
                    <div className={styles.test_content_second_content_2}>
                        <div className={styles.test_content_second_content_2_1}></div>
                    </div>
                </div>
                <div className={styles.test_content_container}>
                    <div className={styles.test_content_third_content}>
                        <div className={styles.test_content_third_content_1}>
                            <div className={styles.test_content_third_content_1_overlay}>
                                <div className={styles.test_content_third_content_1_1}>
                                    Եղե՜ք ուշադիր
                                </div>
                                <div className={styles.test_content_third_content_1_2}>
                                    <ul>
                                        <li>
                                            Լրացրեք միայն սև գելային գրիչով
                                        </li>

                                        <li>
                                            Ընտրովի պատասխանով առաջադրանքներում Ձեր ընտրած տարբերակի համարին
                                            համապատասխանող վանդակում դրե՜ք X նշանը
                                        </li>

                                        <li>
                                            Թվերը գրե՜ք հետևյալ տեսքով
                                            <span>
                                                1
                                            </span>
                                            <span>
                                                2
                                            </span>
                                            <span>
                                                3
                                            </span>
                                            <span>
                                                4
                                            </span>
                                            <span>
                                                5
                                            </span>
                                            <span>
                                                6
                                            </span>
                                            <span>
                                                7
                                            </span>
                                            <span>
                                                8
                                            </span>
                                            <span>
                                                9
                                            </span>
                                            <span>
                                                0
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.test_content_third_content_2}>
                            <div className={styles.test_content_third_content_2_1}>
                                <div className={styles.test_content_third_content_2_1_1}>
                                    Թեստ N
                                </div>
                                <div className={styles.test_content_third_content_2_1_2}>
                                    {
                                        [...new Array(4)].map((val, ind) => {
                                            return (
                                                <div className={styles.test_content_third_content_2_1_2_1}>
                                                    <span>{ind + 1}</span>
                                                    <input type="radio" name={`short${ind + 1}`} onChange={userNameInfoValuesInputHandleChange} />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>


                        <div className={styles.ss}>

                            {
                                arrAllInfossHkArr.map((val1) => {


                                    let isFirstCtShown = false



                                    let num = 0


                                    let secNum = 0
                                    let secBNum = 0
                                    let lstNum = 0

                                    let minNum = 0


                                    let thirdNum = 0
                                    let currentNum = 0
                                    let currentNumClone = 0


                                    let f = 0
                                    let forthNum = 0
                                    let forthBNum = 0



                                    return (
                                        <>
                                            {

                                                val1.questions.map((val, ind) => {



                                                    if (Number(allTestInfo?.thchoose) > 0) {
                                                        isFirstCtShown = true
                                                    }


                                                    if (val.uniqName === 'choose' && allTestInfo) {

                                                        if (Number(allTestInfo.thchoose) > 20) {
                                                            num = Math.floor(Number(allTestInfo.thchoose) / 20) * 20
                                                        } else {
                                                            num = Number(allTestInfo.thchoose)
                                                        }




                                                        return (
                                                            <>
                                                                {
                                                                    Number(allTestInfo.thchoose)
                                                                        ?
                                                                        <>


                                                                            <div className={styles.test_content_third_content_3}>
                                                                                {
                                                                                    isFirstCtShown
                                                                                        ?
                                                                                        <span className={styles.ctgry_name}>
                                                                                            Category {val1.category}
                                                                                        </span>
                                                                                        :
                                                                                        null

                                                                                }
                                                                                <div className={styles.test_content_third_content_3_title}>
                                                                                    Ընտրովի պատասխանով առաջադրանքներ
                                                                                </div>

                                                                                <div className={styles.test_content_third_content_3_2}>
                                                                                    <div className={styles.test_content_third_content_3_2_3}>
                                                                                        {
                                                                                            [...new Array(Number(allTestInfo.thchoose))].map((val1, ind) => {

                                                                                                if (ind < num) {
                                                                                                    countBg += 1
                                                                                                    let o = countBg


                                                                                                    let fixInd: any = null
                                                                                                    for (let i in allAnswersItem) {
                                                                                                        if (allAnswersItem[i].questNum == countBg) {
                                                                                                            fixInd = allAnswersItem[i].answer
                                                                                                        }
                                                                                                    }

                                                                                                    return (
                                                                                                        <>
                                                                                                            {
                                                                                                                (ind % 20 === 0) || ind === 0
                                                                                                                    ?
                                                                                                                    <>
                                                                                                                        <div className={styles.test_content_third_content_3_2_1}>
                                                                                                                            Պատասխանի համարը
                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_3_2_2}>
                                                                                                                            <span>a</span>
                                                                                                                            <span>b</span>
                                                                                                                            <span>c</span>
                                                                                                                            <span>d</span>
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                    : null
                                                                                                            }
                                                                                                            <div key={ind} className={styles.test_content_third_content_3_2_3_1}>
                                                                                                                <div className={styles.test_content_third_content_3_2_3_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_3_2_3_1_2}>
                                                                                                                    <form action="">

                                                                                                                        {
                                                                                                                            arrAllInfossHkArr[0].questions[0].questionType[ind].answersInputs?.map((val4, ind4) => {
                                                                                                                                if (fixInd == ind4 + 1) {
                                                                                                                                    return (
                                                                                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                            <input checked onClick={(e) => getWritenTestAnswers(ind4 + 1, e)} type="radio" name={`${countBg}`} />
                                                                                                                                        </div>
                                                                                                                                    )
                                                                                                                                } else {
                                                                                                                                    return (
                                                                                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                            <input onClick={(e) => getWritenTestAnswers(ind4 + 1, e)} type="radio" name={`${countBg}`} />
                                                                                                                                        </div>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        }
                                                                                                                    </form>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            {
                                                                                                                ((ind + 1) % 20 === 0 && ind !== 0) || ind === Number(allTestInfo.thchoose) - 1
                                                                                                                    ?
                                                                                                                    <div className={styles.test_content_third_content_3_2_2}>
                                                                                                                        <span>a</span>
                                                                                                                        <span>b</span>
                                                                                                                        <span>c</span>
                                                                                                                        <span>d</span>
                                                                                                                    </div> : null
                                                                                                            }
                                                                                                        </>
                                                                                                    )
                                                                                                }

                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                Number(allTestInfo.thchoose) - num > 0
                                                                                    ?


                                                                                    <div className={styles.test_content_third_content_3_b}>
                                                                                        <div className={styles.test_content_third_content_3_title}>
                                                                                            Ընտրովի պատասխանով առաջադրանքներ
                                                                                        </div>

                                                                                        <div className={styles.test_content_third_content_3_2}>
                                                                                            <div className={styles.test_content_third_content_3_2_3}>
                                                                                                {
                                                                                                    [...new Array(Number(Number(allTestInfo.thchoose) - num))].map((val1, ind) => {

                                                                                                        if (ind < num) {
                                                                                                            countBg += 1

                                                                                                            let fixInd: any = null
                                                                                                            for (let i in allAnswersItem) {

                                                                                                                if (allAnswersItem[i].questNum == countBg) {
                                                                                                                    fixInd = allAnswersItem[i].answer
                                                                                                                }
                                                                                                            }



                                                                                                            return (
                                                                                                                <>
                                                                                                                    {
                                                                                                                        (ind % 20 === 0) || ind === 0
                                                                                                                            ?
                                                                                                                            <>
                                                                                                                                <div className={styles.test_content_third_content_3_2_1}>
                                                                                                                                    Պատասխանի համարը
                                                                                                                                </div>
                                                                                                                                <div className={styles.test_content_third_content_3_2_2}>
                                                                                                                                    <span>a</span>
                                                                                                                                    <span>b</span>
                                                                                                                                    <span>c</span>
                                                                                                                                    <span>d</span>
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                            : null
                                                                                                                    }
                                                                                                                    <div key={ind} className={styles.test_content_third_content_3_2_3_1}>
                                                                                                                        <div className={styles.test_content_third_content_3_2_3_1_1}>
                                                                                                                            {countBg}
                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_3_2_3_1_2}>
                                                                                                                            <form action="">
                                                                                                                                {
                                                                                                                                    arrAllInfossHkArr[0].questions[0].questionType[countBg - 1].answersInputs?.map((val4, ind4) => {


                                                                                                                                        if (fixInd == ind4 + 1) {
                                                                                                                                            return (
                                                                                                                                                <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                                    <input checked onClick={(e) => getWritenTestAnswers(ind4 + 1, e)} type="radio" name={`${countBg}`} />
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                        } else {
                                                                                                                                            return (
                                                                                                                                                <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                                    <input onClick={(e) => getWritenTestAnswers(ind4 + 1, e)} type="radio" name={`${countBg}`} />
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                }
                                                                                                                            </form>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    {
                                                                                                                        ((ind + 1) % 20 === 0 && ind !== 0) || ind === Number(allTestInfo.thchoose) - num - 1
                                                                                                                            ?
                                                                                                                            <div className={styles.test_content_third_content_3_2_2}>
                                                                                                                                <span>a</span>
                                                                                                                                <span>b</span>
                                                                                                                                <span>c</span>
                                                                                                                                <span>d</span>
                                                                                                                            </div> : null
                                                                                                                    }
                                                                                                                </>
                                                                                                            )
                                                                                                        }

                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </>
                                                                        :
                                                                        null
                                                                }
                                                            </>


                                                        )

                                                    } else if (val.uniqName === 'shortandvariant' && allTestInfo) {

                                                        thirdNum = Math.ceil(Number(allTestInfo.thshortanvariant) / 8)
                                                        currentNum = Number(allTestInfo.thshortanvariant)
                                                        currentNumClone = Number(allTestInfo.thshortanvariant)

                                                        return (
                                                            <>



                                                                {
                                                                    [...new Array(thirdNum)].map((val2, ind2) => {
                                                                        return (
                                                                            <div className={styles.test_content_third_content_3_content_d}>
                                                                                {
                                                                                    ind2 === 0
                                                                                        ?
                                                                                        <span className={styles.ctgry_name_c}>
                                                                                            Category {val1.category}
                                                                                        </span>
                                                                                        :
                                                                                        null
                                                                                }


                                                                                <div className={styles.test_content_third_content_3_title_233}>
                                                                                    Պնդումներով առաջադրանքներ
                                                                                </div>
                                                                                <div className={styles.test_content_third_content_3_sec_contenw_b}>
                                                                                    <div className={styles.test_content_third_content_3_sec_contenw_in_item}>


                                                                                        <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title}>
                                                                                            <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title_1}>
                                                                                                Ճիշտ է
                                                                                            </div>

                                                                                            <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title_1}>
                                                                                                Սխալ է
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={styles.sec_shortanssq_content_b}>
                                                                                            {
                                                                                                [...new Array(currentNum < 4 ? currentNum : 4)].map((val2, ind2) => {
                                                                                                    countBg += 1
                                                                                                    currentNum -= 1
                                                                                                    currentNumClone -= 1


                                                                                                    let fixInd: any = null

                                                                                                    for (let i in allAnswersItem) {

                                                                                                        if (allAnswersItem[i].questNum == countBg) {
                                                                                                            fixInd = allAnswersItem[i].answerYesOrNot
                                                                                                        }
                                                                                                    }



                                                                                                    return (
                                                                                                        <div className={styles.test_content_third_content_4_1cc_1}>
                                                                                                            <div className={styles.test_content_third_content_4_1cc_1_1}>
                                                                                                                {countBg}
                                                                                                            </div>
                                                                                                            <div className={styles.test_content_third_content_4_1cc_1_2}>
                                                                                                                {
                                                                                                                    (fixInd === 'yes') ? <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                        <input checked onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${countBg}`} type="radio" />
                                                                                                                        <input onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${countBg}`} type="radio" />
                                                                                                                    </div>
                                                                                                                        : fixInd === 'no'
                                                                                                                            ?
                                                                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                <input onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${countBg}`} type="radio" />
                                                                                                                                <input checked onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${countBg}`} type="radio" />
                                                                                                                            </div>
                                                                                                                            :
                                                                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                <input onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${countBg}`} type="radio" />
                                                                                                                                <input onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${countBg}`} type="radio" />
                                                                                                                            </div>


                                                                                                                }


                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                    </div>

                                                                                    {
                                                                                        currentNumClone > 0
                                                                                            ?
                                                                                            <div className={styles.test_content_third_content_3_sec_contenw_in_item}>
                                                                                                <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title}>
                                                                                                    <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title_1}>
                                                                                                        Ճիշտ է
                                                                                                    </div>

                                                                                                    <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title_1}>
                                                                                                        Սխալ է
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className={styles.sec_shortanssq_content_b}>
                                                                                                    {
                                                                                                        [...new Array(currentNum < 4 ? currentNum : 4)].map((val2, ind2) => {
                                                                                                            countBg += 1
                                                                                                            currentNum -= 1
                                                                                                            currentNumClone -= 1

                                                                                                            let fixInd: any = null
                                                                                                            for (let i in allAnswersItem) {

                                                                                                                if (allAnswersItem[i].questNum == countBg) {
                                                                                                                    fixInd = allAnswersItem[i].answerYesOrNot
                                                                                                                }
                                                                                                            }

                                                                                                            return (
                                                                                                                <div className={styles.test_content_third_content_4_1cc_1}>
                                                                                                                    <div className={styles.test_content_third_content_4_1cc_1_1}>
                                                                                                                        {countBg}
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1cc_1_2}>
                                                                                                                        {
                                                                                                                            (fixInd === 'yes') ? <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                <input checked onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${countBg}`} type="radio" />
                                                                                                                                <input onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${countBg}`} type="radio" />
                                                                                                                            </div>
                                                                                                                                : fixInd === 'no'
                                                                                                                                    ?
                                                                                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                        <input onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${countBg}`} type="radio" />
                                                                                                                                        <input checked onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${countBg}`} type="radio" />
                                                                                                                                    </div>
                                                                                                                                    :
                                                                                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                        <input onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${countBg}`} type="radio" />
                                                                                                                                        <input onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${countBg}`} type="radio" />
                                                                                                                                    </div>

                                                                                                                        }
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                            :
                                                                                            null
                                                                                    }


                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })

                                                                }






                                                            </>
                                                        )
                                                    } else if (val.uniqName === 'shortbtype' && allTestInfo) {

                                                        f = Number(val1.category === 'B' ? allTestInfo.thshortb : allTestInfo.thshortcctgry)
                                                        forthNum = Math.ceil(Number(val1.category === 'B' ? allTestInfo.thshortb : allTestInfo.thshortcctgry) / 5)
                                                        forthBNum = Number(val1.category === 'B' ? allTestInfo.thshortb : allTestInfo.thshortcctgry) - (Math.floor(Number(val1.category === 'B' ? allTestInfo.thshortb : allTestInfo.thshortcctgry) / 5) * 5)


                                                        return (
                                                            <>

                                                                {
                                                                    [...new Array(forthNum === 1 ? 1 : forthNum)].map((val, ind) => {
                                                                        if (forthNum === 1) {
                                                                            return (
                                                                                <>
                                                                                    <div className={styles.ctgry_name_vfwe}>
                                                                                        {
                                                                                            val1.category === 'B'
                                                                                                ?
                                                                                                <span className={styles.ctgry_name_b}>
                                                                                                    Category {val1.category}
                                                                                                </span>
                                                                                                :
                                                                                                null
                                                                                        }
                                                                                        <div className={styles.test_content_third_content_3_title}>
                                                                                            Կարճ պատասխանով առաջադրանքներ
                                                                                        </div>
                                                                                        <div>
                                                                                            {
                                                                                                [...new Array(f)].map((val1) => {
                                                                                                    countBg += 1

                                                                                                    let fixInd: any = null
                                                                                                    for (let i in allAnswersItem) {

                                                                                                        if (allAnswersItem[i].questNum == countBg) {
                                                                                                            fixInd = allAnswersItem[i].answerBtype
                                                                                                        }
                                                                                                    }



                                                                                                    return (
                                                                                                        <div className={styles.test_content_third_content_4_1_1_dw}>
                                                                                                            <div className={styles.test_content_third_content_4_1_1_1_dw}>
                                                                                                                {countBg}
                                                                                                            </div>
                                                                                                            <div className={styles.test_content_third_content_4_1_1_2_bbsw}>
                                                                                                                <input value={fixInd} onChange={(e) => getWritenTestThirdAnswers(e.target.value, e)} name={`${countBg}`} type="text" />

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        } else if (ind + 1 === forthNum && forthNum - Math.floor(10 / 5) !== 0) {
                                                                            return (
                                                                                <div className={styles.ctgry_name_vfwe}>

                                                                                    <div className={styles.test_content_third_content_3_title}>
                                                                                        Կարճ պատասխանով առաջադրանքներ
                                                                                    </div>
                                                                                    <div className={styles.test_content_third_content_3_title_dwq}>
                                                                                        {
                                                                                            [...new Array(forthBNum)].map((val1) => {
                                                                                                countBg += 1

                                                                                                let fixInd: any = null

                                                                                                for (let i in allAnswersItem) {

                                                                                                    if (allAnswersItem[i].questNum == countBg) {
                                                                                                        fixInd = allAnswersItem[i].answerBtype
                                                                                                    }
                                                                                                }


                                                                                                return (
                                                                                                    <div className={styles.test_content_third_content_4_1_1_dw}>
                                                                                                        <div className={styles.test_content_third_content_4_1_1_1_dw}>
                                                                                                            {countBg}
                                                                                                        </div>
                                                                                                        <div className={styles.test_content_third_content_4_1_1_2_bbsw}>
                                                                                                            <input value={fixInd} onChange={(e) => getWritenTestThirdAnswers(e.target.value, e)} type="text" name={`${countBg}`} />

                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        } else {

                                                                            return (
                                                                                <>
                                                                                    <div className={styles.ctgry_name_vfwe}>
                                                                                        {
                                                                                            ind === 0 && val1.category === 'B'
                                                                                                ?
                                                                                                <span className={styles.ctgry_name_b}>
                                                                                                    Category {val1.category}
                                                                                                </span>
                                                                                                :
                                                                                                null
                                                                                        }
                                                                                        <div className={styles.test_content_third_content_3_tdwe}>
                                                                                            {
                                                                                                ind === 0
                                                                                                    ?
                                                                                                    <div className={styles.test_content_third_content_3_title_we2}>
                                                                                                        <span> Կարճ պատասխանով</span> <span>առաջադրանքներ</span>
                                                                                                    </div>
                                                                                                    :
                                                                                                    null
                                                                                            }
                                                                                            <div className={styles.test_content_third_content_3_ovrle}>
                                                                                                {
                                                                                                    [...new Array(5)].map((val1) => {
                                                                                                        countBg += 1
                                                                                                        let fixInd: any = null
                                                                                                        console.log('ddd')
                                                                                                        for (let i in allAnswersItem) {
                                                                                                            if (allAnswersItem[i].questNum == countBg) {
                                                                                                                fixInd = allAnswersItem[i].answerBtype
                                                                                                            }
                                                                                                        }

                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1_dw}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1_dw}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_bbsw}>
                                                                                                                    <input value={fixInd} onChange={(e) => getWritenTestThirdAnswers(e.target.value, e)} type="text" name={`${countBg}`} />

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        }
                                                                    })
                                                                }






                                                            </>
                                                        )


























                                                    } else if (val.uniqName === 'short' && allTestInfo) {



                                                        secNum = Math.floor(Number(allTestInfo.thshort) / 5)
                                                        secBNum = Math.ceil(Number(allTestInfo.thshort) / 5)
                                                        lstNum = Number(allTestInfo.thshort) - (Math.floor(Number(allTestInfo.thshort) / 5) * 5)


                                                        return (
                                                            <>
                                                                {
                                                                    ind === 0 && isFirstCtShown
                                                                        ?
                                                                        <div className={styles.ctgry_name_b}>
                                                                            Category {val1.category}
                                                                        </div>
                                                                        :
                                                                        null
                                                                }
                                                                {
                                                                    Number(allTestInfo.thshortb) - num < 4 && Number(allTestInfo.thshortb) - num !== 0 && secNum
                                                                        ?
                                                                        <div className={styles.test_content_third_content_3_content_d}>

                                                                            <div className={styles.test_content_third_content_3_title}>
                                                                                Կարճ պատասխանով առաջադրանքներ
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_sec_contenw}>
                                                                                {


                                                                                    [...new Array(secNum)].map((val1, ind1) => {
                                                                                        minNum = 3
                                                                                        return (
                                                                                            <div className={styles.sec_shortanssq_content}>
                                                                                                {
                                                                                                    [...new Array(5)].map((val2, ind2) => {
                                                                                                        countBg += 1

                                                                                                        let shortAnswrMinStrItem = ''

                                                                                                        let fixInd: any = ''
                                                                                                        for (let i in allAnswersItem) {

                                                                                                            if (allAnswersItem[i].questNum == countBg) {
                                                                                                                fixInd = allAnswersItem[i].shortAnswers
                                                                                                            }
                                                                                                        }



                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                    {
                                                                                                                        [...new Array(5)].map((val6, ind6) => {
                                                                                                                            return (
                                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                    <input onChange={(e) => {
                                                                                                                                        shortAnswrMinStrItem += e.target.value
                                                                                                                                        getWritenTestForthAnswers(shortAnswrMinStrItem, e)
                                                                                                                                    }} type="text" name={`${countBg}`} maxLength={1} className={styles.txtinp} />
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        Number(allTestInfo.thshortb) - num > 4 && Number(allTestInfo.thshortb) - num < 8 && num !== 0
                                                                            ?
                                                                            <div className={styles.test_content_third_content_3_content_d}>

                                                                                <div className={styles.test_content_third_content_3_title}>
                                                                                    Կարճ պատասխանով առաջադրանքներ
                                                                                </div>
                                                                                <div className={styles.test_content_third_content_3_sec_contenw}>
                                                                                    {

                                                                                        [...new Array(secNum)].map((val1, ind1) => {
                                                                                            minNum = 2

                                                                                            return (
                                                                                                <div className={styles.sec_shortanssq_content}>
                                                                                                    {
                                                                                                        [...new Array(5)].map((val2, ind2) => {
                                                                                                            countBg += 1
                                                                                                            let shortAnswrMinStrItem = ''
                                                                                                            let fixInd: any = ''

                                                                                                            for (let i in allAnswersItem) {
                                                                                                                console.log(allAnswersItem[i].questNum, countBg, 'questNum, countBg')

                                                                                                                if (allAnswersItem[i].questNum == countBg) {
                                                                                                                    fixInd = allAnswersItem[i].shortAnswers
                                                                                                                }
                                                                                                            }

                                                                                                            console.log(fixInd)

                                                                                                            return (
                                                                                                                <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                        {countBg}
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                        {
                                                                                                                            [...new Array(5)].map((val6, ind6) => {
                                                                                                                                return (
                                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                        <input onChange={(e) => {
                                                                                                                                            shortAnswrMinStrItem += e.target.value
                                                                                                                                            getWritenTestForthAnswers(shortAnswrMinStrItem, e)
                                                                                                                                        }} type="text" value={shortAnswrMinStrItem[ind6]} name={`${countBg}`} maxLength={1} className={styles.txtinp} />
                                                                                                                                    </div>
                                                                                                                                )
                                                                                                                            })
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            : null

                                                                }

                                                                {
                                                                    secNum - minNum > 0
                                                                        ?
                                                                        <div className={styles.test_content_third_content_3_content_d}>

                                                                            <div className={styles.test_content_third_content_3_title}>
                                                                                Կարճ պատասխանով առաջադրանքներ
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_sec_contenw}>
                                                                                {


                                                                                    [...new Array(secNum - minNum)].map((val1, ind1) => {
                                                                                        return (
                                                                                            <div className={styles.sec_shortanssq_content}>
                                                                                                {
                                                                                                    [...new Array(5)].map((val2, ind2) => {
                                                                                                        countBg += 1
                                                                                                        let shortAnswrMinStrItem = ''
                                                                                                        let fixInd: any = ''
                                                                                                        console.log('ddd')
                                                                                                        for (let i in allAnswersItem) {
                                                                                                            console.log(allAnswersItem[i].questNum, countBg, 'questNum, countBg')

                                                                                                            if (allAnswersItem[i].questNum == countBg) {
                                                                                                                fixInd = allAnswersItem[i].shortAnswers
                                                                                                            }
                                                                                                        }

                                                                                                        console.log(fixInd, 'fixInd')

                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                    {
                                                                                                                        [...new Array(5)].map((val6, ind6) => {
                                                                                                                            return (
                                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                    <input onChange={(e) => {
                                                                                                                                        shortAnswrMinStrItem += e.target.value
                                                                                                                                        getWritenTestForthAnswers(shortAnswrMinStrItem, e)
                                                                                                                                    }} value={fixInd[ind6]} type="text" name={`${countBg}`} maxLength={1} className={styles.txtinp} />
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })


                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        null
                                                                }

                                                                {
                                                                    secBNum > 0 && lstNum !== 0
                                                                        ?

                                                                        <div className={styles.test_content_third_content_3_content_d}>

                                                                            <div className={styles.test_content_third_content_3_title}>
                                                                                Կարճ պատասխանով առաջադրանքներ
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_sec_contenw}>
                                                                                {


                                                                                    [...new Array(secBNum - secNum)].map((val1, ind1) => {
                                                                                        return (
                                                                                            <div className={styles.sec_shortanssq_content}>
                                                                                                {
                                                                                                    [...new Array(lstNum)].map((val2, ind2) => {
                                                                                                        countBg += 1
                                                                                                        let shortAnswrMinStrItem = ''
                                                                                                        let fixInd: any = ''
                                                                                                        console.log('ddd')
                                                                                                        for (let i in allAnswersItem) {
                                                                                                            console.log(allAnswersItem[i].questNum, countBg, 'questNum, countBg')

                                                                                                            if (allAnswersItem[i].questNum == countBg) {
                                                                                                                fixInd = allAnswersItem[i].shortAnswers
                                                                                                            }
                                                                                                        }

                                                                                                        console.log(fixInd, 'fixInd')
                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                    {
                                                                                                                        [...new Array(5)].map((val6, ind6) => {
                                                                                                                            return (
                                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                    <input onChange={(e) => {
                                                                                                                                        shortAnswrMinStrItem += e.target.value
                                                                                                                                        getWritenTestForthAnswers(shortAnswrMinStrItem, e)
                                                                                                                                    }} type="text" value={fixInd[ind6]} name={`${countBg}`} maxLength={1} className={styles.txtinp} />
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })


                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        null
                                                                }



                                                            </>
                                                        )
                                                    }

                                                })
                                            }
                                        </>
                                    )
                                })
                            }




                        </div>

                    </div>





                </div>


                <div className={styles.last_part_content}>
                    <div className={styles.last_part_content_1_item}>
                        <div className={styles.last_part_content_1_item_1}>
                            Արտագրե՜ք այս նախադասությունը՝
                        </div>
                        <div className={styles.last_part_content_1_item_2}>
                            Ծանոթ եմ քննության կարգին։
                        </div>
                    </div>
                    <div className={styles.last_part_content_2_item}>
                        <input type="text" name='lastText' onChange={userNameInfoValuesInputHandleChange} />
                    </div>
                </div>
            </div>

            <div>
                <button onClick={endTestFunc}>Avartel</button>
            </div>

        </div >
    )
}

export default FinalTestComp