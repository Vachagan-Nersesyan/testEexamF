import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './studentTestStl.module.css'
import { OwnProps } from './studentTestTs.interface'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'
import { getTestQuestFunc } from 'entities/nTestR/nTestReducerThunk'
import { useDispatch, useSelector } from 'react-redux'
import { AllExamInfoType, NewTestInfoType, QuestionType } from 'entities/testR/testReducerTs.interface'
import { QuestCountInfoType } from 'entities/nTestR/nTestReducerTs.interface'

import logo from '../images/1.png'
import { useNavigate } from 'react-router-dom'
import { changeAllTest } from 'entities/testR/testReducer'
import { AnwersArrType } from 'entities/wTestR/wTestReducerTs.interface'
import { initUniqId, setStudentsInfo, updateArrAllAnswers } from 'entities/student/studentReducer'
import { FaPrint } from 'react-icons/fa6'
import { v4 as uuidv4 } from 'uuid';
import { ShortTypeQuestionItemNumbersType } from 'entities/student/studentReducerTs.interface'
import QuestionTypeItem from 'feautures/questionTypeItem'

const uniqId = uuidv4()

const StudentTestComp: React.FC<OwnProps> = () => {


    const allTestInfo = useSelector((state: AppStateType) => state.studentR.numInfo)
    const allTestArrmk = useSelector((state: AppStateType) => state.studentR.allTests)



    const navigate = useNavigate()
   


    const currentClassNamefh = useSelector((state: AppStateType) => state.studentR.classCrntName)
   
    const [currentClassNamefhHk, setCurrentClassNamefhHk] = useState<string>(currentClassNamefh)

    useEffect(() => {
        setCurrentClassNamefhHk(currentClassNamefh)
    }, [currentClassNamefh])


    if (!currentClassNamefhHk) {
        navigate('/')
    }

    const allTestmk = useSelector((state: AppStateType) => state.makeTestR.allQuestTest)


 


    const [firstArr, setFirstArr] = useState<Array<QuestionType>>([])

    const [secondArr, setSecondArr] = useState<Array<QuestionType>>([])
    const [secondBArr, setSecondBArr] = useState<Array<QuestionType>>([])

    const [thirdArr, setThirdArr] = useState<Array<QuestionType>>([])
    const [thirdBArr, setThirddBArr] = useState<Array<QuestionType>>([])



 

    useEffect(() => {
        filterArr()

    }, [allTestArrmk])

 

    useEffect(() => {
        filterArr()
    }, [allTestmk])

    const generateMiniArr = (num: number, arr: Array<QuestionType>) => {
        

        let arrCloneSec: Array<QuestionType> = [...arr]
        let arrCloneSecB: Array<QuestionType> = []

        for (let i = 0; i < num; i++) {
            let o = Math.floor(Math.random() * arrCloneSec.length)
            arrCloneSecB.push(arrCloneSec[o])
            arrCloneSec.splice(o, 1)
        }
        return arrCloneSecB
    }


    const filterArr = () => {

        for (let i = 0; i < allTestArrmk.length; i++) {

           
            if (i === 0) {



                setFirstArr(generateMiniArr(Number(allTestInfo.thchoose), [...allTestArrmk[i].questions[0].questionType]))
             

            } else if (i === 1) {

                setSecondArr(generateMiniArr(Number(allTestInfo.thshort), [...allTestArrmk[i].questions[0].questionType]))

                setSecondBArr(generateMiniArr(Number(allTestInfo.thshortb), [...allTestArrmk[i].questions[1].questionType]))

            } else {
                setThirdArr(generateMiniArr(Number(allTestInfo.thshortanvariant), [...allTestArrmk[i].questions[0].questionType]))

                setThirddBArr(generateMiniArr(Number(allTestInfo.thshortcctgry), [...allTestArrmk[i].questions[1].questionType]))

            }
        }


      
    }


    const printMFunc = () => {
        window.print()
    }

    let questCount: number = 0



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUniqId({ id: uniqId }))
    }, [])

    const generatenewWritettest = () => {
        
        dispatch(changeAllTest({ info: allTestArrmk }))

        navigate('/write-new-test')
     
    }





    let writeTestAnswersArr: Array<AnwersArrType> = []

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

    

    const allAnswersItem = useSelector((state: AppStateType) => state.studentR.allAnswers)

    

   

    const otherInfoItemss = useSelector((state: AppStateType) => state.studentR.otherInfo)
    const [otherInfoItemssHk, setOtherInfoItemssHk] = useState<AllExamInfoType | null>(otherInfoItemss)

    useEffect(() => {
        setOtherInfoItemssHk(otherInfoItemss)
    }, [otherInfoItemss])

    

    const logoPicItem = useSelector((state: AppStateType) => state.adminR.instituteLogo)
    const [logoPicItemHk, setLogoPicItemHk] = useState<string>(logoPicItem)
    useEffect(() => {
        setLogoPicItemHk(logoPicItem)
    }, [logoPicItem])

    const instNameItem = useSelector((state: AppStateType) => state.adminR.instituteName)
    const [istNameItem, setIstNameItem] = useState<string>(instNameItem)
    useEffect(() => {
        setIstNameItem(instNameItem)
    }, [instNameItem])


    return (
        <div className={styles.make_test_content}>

            <div className={styles.make_test_content_container}>


                <div className={styles.make_test_content_container_overlay}>
                    <div className={styles.make_test_content_container_title_content_in_1}>
                        <div className={styles.make_test_content_container_title_content_in_1_1}>
                            <img src={`data:image/png;base64,${logoPicItemHk}`} />
                        </div>
                        <div className={styles.make_test_content_container_title_content_in_1_2}>
                            <div className={styles.make_test_content_container_title_content_in_1_2_1}>
                                {istNameItem}
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_1_2_1}>
                                {otherInfoItemssHk?.examType}
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_1_2_1}>
                                {otherInfoItemssHk?.examYear}
                            </div>
                        </div>
                        <div className={styles.make_test_content_container_title_content_in_1_3}>
                            <div className={styles.make_test_content_container_title_content_in_1_3_1}>
                                Ճիշտ պատասխաններ
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_1_3_2}>
                                <span>/40</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.make_test_content_container_title_content_in_2}>
                        <div className={styles.make_test_content_container_title_content_in_2_1_b}>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>
                                Կուրս՝
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>
                                Առարկա՝
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>
                                Դասախոս՝
                            </div>
                        </div>
                        <div className={styles.make_test_content_container_title_content_in_2_1}>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>
                                {otherInfoItemssHk?.classNumber}
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>

                                {otherInfoItemssHk?.subjectName}
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>/
                                {otherInfoItemssHk?.teachersName}
                            </div>
                        </div>
                        <div className={styles.make_test_content_container_title_content_in_2_2}>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>
                                <span>
                                    Խումբ՝
                                </span>
                                <input type="number" maxLength={4} name='classNumber' onChange={(e) => {

                                    dispatch(setStudentsInfo({ info: e.target.value, uniqName: 'classNumber', id: uniqId }))
                                }
                                } />
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1}>
                                <span>
                                    Ուսանող՝
                                </span>
                                <input type="text" name='nameFirst' onChange={(e) => dispatch(setStudentsInfo({ info: e.target.value, uniqName: 'nameFirst', id: uniqId }))} />
                                <div className={styles.make_test_content_container_title_content_in_2_1_1_subitem}>
                                    <div className={styles.make_test_content_container_title_content_in_2_1_1_subitem_1}>
                                        Ա․
                                    </div>

                                    <div className={styles.make_test_content_container_title_content_in_2_1_1_subitem_1}>
                                        Ա․
                                    </div>

                                    <div className={styles.make_test_content_container_title_content_in_2_1_1_subitem_1}>
                                        Հ․
                                    </div>
                                </div>
                            </div>
                            <div className={styles.make_test_content_container_title_content_in_2_1_1_b}>
                                
                            </div>
                        </div>
                    </div>
                </div>




                <div className={styles.make_test_content_title}>
                    <span>
                        ՏԱՐԲԵՐԱԿ N
                    </span>
                    <input type="number" maxLength={1} name='testNumber' onChange={(e) => {
                        if (Number(e.target.value) > 4) {
                            e.target.value = '4'
                        } else if (Number(e.target.value) < 0) {
                            e.target.value = '0'
                        }

                        dispatch(setStudentsInfo({ info: e.target.value, uniqName: 'testNumber', id: uniqId }))
                    }} />

                </div>
                <div className={styles.make_test_content_container_overlay}>
                    <div className={styles.make_test_content_container_overla_in_itemy}>
                        {
                            firstArr.length > 0
                                ?
                                <div className={styles.variant_content}>
                                    Ա մակարդակ
                                </div>
                                :
                                null
                        }
                        <div className={styles.test_exam_questiokn_content}>
                            {
                                firstArr.map((val, ind) => {
                                    questCount += 1
                                    let fixInd: any = null
                                    
                                    for (let i in allAnswersItem) {

                                        if (allAnswersItem[i].questNum == questCount) {
                                            fixInd = allAnswersItem[i].answer
                                        }
                                    }


                                    let isLong = false

                                    for (let i in val.answersInputs) {
                                        if (val.answersInputs[i as any].text.length > 20) {
                                            isLong = true
                                        }
                                    }

                                

                                    if (val) {
                                        return (
                                            <div style={{ width: val.questionDescText.length > 20 || val.questionText.length > 20 || isLong ? '100%' : '40%' }} className={styles.make_test_content_in_item_in_1}>
                                                <div className={styles.make_test_content_in_item_in_1_1}>
                                                    <div className={styles.make_test_content_in_item_in_1_1c}>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1}>
                                                            {questCount}.
                                                        </div>
                                                       
                                                        <div className={styles.make_test_content_in_item_in_1_1_1_title} dangerouslySetInnerHTML={{ __html: val.questionText }} >

                                                        </div>
                                                    </div>
                                                    <div className={styles.make_test_content_in_item_in_1_1_2}>
                                                        {val.questionPoint} մ․
                                                    </div>
                                                </div>
                                                {
                                                    val.questionDescText
                                                        ?
                                                        <div className={styles.make_test_content_in_item_in_1_2}>
                                                            {val.questionDescText}
                                                        </div>
                                                        :
                                                        null
                                                }
                                                {
                                                    val.selectedImage
                                                        ?
                                                        <div className={styles.make_test_content_in_item_in_1_2} >
                                                            <img src={val.selectedImage} alt="" />
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className={styles.make_test_content_in_item_in_1_3}>
                                                    {
                                                        val.answersInputs?.map((val4, ind4) => {
                                                            if (fixInd == ind4 + 1) {
                                                                return (
                                                                    <label style={{ width: val4.text.length > 20 ? '100%' : '50%' }} className={styles.make_test_content_in_item_in_1_3_1}>
                                                                        <div className={styles.make_test_content_in_item_in_1_3_1_overlay}>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                <input checked onClick={(e) => getWritenTestAnswers(ind4 + 1, e)} type="radio" name={`${questCount}`} />
                                                                            </div>
                                                                            <div className={styles.make_test_content_in_item_in_1_3_1_1}>
                                                                                {ind4 === 0 ? 'ա)' : ind4 === 1 ? 'բ)' : ind4 === 2 ? 'գ)' : 'դ)'}
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_122e3} style={{ width: isLong ? '4%' : '10%' }}>
                                                                                {
                                                                                    val4.picture
                                                                                        ?
                                                                                        <img src={val4.picture} alt="" />
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </div>
                                                                            <div className={styles.make_test_content_in_item_in_1_3_1_2}>

                                                                                {/* {ind4 === 0 ? val.answersInputs?.input0 : ind4 === 1 ? val.answersInputs?.input1 : ind4 === 2 ? val.answersInputs?.input2 : val.answersInputs?.input3} */}
                                                                                {val4.text}
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                )
                                                              
                                                            } else {

                                                                return (
                                                                    <label style={{ width: val4.text.length > 20 ? '100%' : '50%' }} className={styles.make_test_content_in_item_in_1_3_1}>
                                                                        <div className={styles.make_test_content_in_item_in_1_3_1_overlay}>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                <input onClick={(e) => getWritenTestAnswers(ind4 + 1, e)} type="radio" name={`${questCount}`} />
                                                                            </div>
                                                                            <div className={styles.make_test_content_in_item_in_1_3_1_1}>
                                                                                {ind4 === 0 ? 'ա)' : ind4 === 1 ? 'բ)' : ind4 === 2 ? 'գ)' : 'դ)'}
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_122e3} style={{ width: isLong ? '4%' : '10%' }}>
                                                                                {
                                                                                    val4.picture
                                                                                        ?
                                                                                        <img src={val4.picture} alt="" />
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </div>
                                                                            <div className={styles.make_test_content_in_item_in_1_3_1_2}>
                                                                                {/* {ind4 === 0 ? val.answersInputs?.input0 : ind4 === 1 ? val.answersInputs?.input1 : ind4 === 2 ? val.answersInputs?.input2 : val.answersInputs?.input3} */}
                                                                                {val4.text}

                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                )
                                                                
                                                            }

                                                        })
                                                    }
                                                   
                                                </div>
                                            </div>
                                        )
                                    }
                                    // }

                                })
                            }
                        </div>
                    </div>
                   
                    <div className={styles.make_test_content_container_overla_in_itemy}>
                        {
                            secondArr.length > 0 || secondBArr.length > 0
                                ?
                                <div className={styles.variant_content}>
                                    Բ մակարդակ
                                </div>
                                :
                                null
                        }
                        <div className={styles.test_exam_questiokn_content}>

                            {
                                secondArr.map((val, ind) => {

                                    questCount += 1

                                    let fixInd: any = null
                                    
                                    for (let i in allAnswersItem) {

                                        if (allAnswersItem[i].questNum == questCount) {
                                            fixInd = allAnswersItem[i].answerBtype
                                        }
                                    }




                                    if (val) {
                                        return (

                                            <div style={{ width: val.questionDescText.length > 20 || val.questionText.length ? '100%' : '40%' }} className={styles.make_test_content_in_item_in_1}>
                                                <div className={styles.make_test_content_in_item_in_1_1}>
                                                    <div className={styles.make_test_content_in_item_in_1_1c}>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1}>
                                                            {questCount}.
                                                        </div>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1_title} dangerouslySetInnerHTML={{ __html: val.questionText }} >

                                                        </div>
                                                    </div>
                                                    <div className={styles.make_test_content_in_item_in_1_1_2}>
                                                        {val.questionPoint} մ․
                                                    </div>
                                                </div>
                                                {
                                                    val.questionDescText
                                                        ?
                                                        <div className={styles.make_test_content_in_item_in_1_2}>
                                                            {val.questionDescText}
                                                        </div>
                                                        :
                                                        null
                                                }

                                                <div className={styles.make_test_content_in_item_in_1_3_type}>
                                                    <div className={styles.make_test_content_in_item_in_txt_content_s_item_2_b_tp}>
                                                        <input value={fixInd} onChange={(e) => getWritenTestThirdAnswers(e.target.value, e)} type="text" name={`${questCount}`} />

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }

                            {
                                secondBArr.map((val, ind) => {

                                    questCount += 1

                                    let fixInd: any = ''
                                    for (let i in allAnswersItem) {

                                        if (allAnswersItem[i].questNum == questCount) {
                                            fixInd = allAnswersItem[i].shortAnswers
                                        }
                                    }



                                    if (val) {
                                        return (

                                            <div style={{ width: val.questionDescText.length > 20 || val.questionText.length ? '100%' : '40%' }} className={styles.make_test_content_in_item_in_1}>
                                                <div className={styles.make_test_content_in_item_in_1_1}>
                                                    <div className={styles.make_test_content_in_item_in_1_1c}>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1}>
                                                            {questCount}.
                                                        </div>
                                                       
                                                        <div className={styles.make_test_content_in_item_in_1_1_1_txt_name} dangerouslySetInnerHTML={{ __html: val.questionText }} >

                                                        </div>
                                                    </div>
                                                    <div className={styles.make_test_content_in_item_in_1_1_2}>
                                                        {val.questionPoint} մ․
                                                    </div>
                                                </div>
                                                {
                                                    val.questionDescText
                                                        ?
                                                        <div className={styles.make_test_content_in_item_in_1_2}>
                                                            {val.questionDescText}
                                                        </div>
                                                        :
                                                        null
                                                }

                                                <div className={styles.make_test_content_in_item_in_1_3_type}>
                                                    <div className={styles.make_test_content_in_item_in_txt_content_s_item_2}>
                                                        <QuestionTypeItem
                                                            getWritenTestForthAnswers={getWritenTestForthAnswers}
                                                            questCount={questCount}
                                                            val={val}

                                                        />
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                    </div>
                    
                    <div className={styles.make_test_content_container_overla_in_itemy}>
                        {
                            thirdArr.length > 0 || thirdBArr.length > 0
                                ?
                                <div className={styles.variant_content}>
                                    Գ մակարդակ
                                </div>
                                :
                                null
                        }
                        <div className={styles.test_exam_questiokn_content}>

                            {
                                thirdArr.map((val, ind) => {
                                   
                                    questCount += 1

                                    let fixInd: any = null
                                    
                                    for (let i in allAnswersItem) {

                                        if (allAnswersItem[i].questNum == questCount) {
                                            fixInd = allAnswersItem[i].answerYesOrNot
                                        }
                                    }


                                    if (val) {
                                        return (

                                            <div style={{ width: val.questionDescText.length > 20 || val.questionText.length ? '100%' : '40%' }} className={styles.make_test_content_in_item_in_1}>
                                                <div className={styles.make_test_content_in_item_in_1_1}>
                                                    <div className={styles.make_test_content_in_item_in_1_1c}>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1}>
                                                            {questCount}.
                                                        </div>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1_title} dangerouslySetInnerHTML={{ __html: val.questionText }} >

                                                        </div>
                                                    </div>
                                                    <div className={styles.make_test_content_in_item_in_1_1_2}>
                                                        {val.questionPoint} մ․
                                                    </div>
                                                </div>
                                                {
                                                    val.questionDescText
                                                        ?
                                                        <div className={styles.make_test_content_in_item_in_1_2}>
                                                            {val.questionDescText}
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className={styles.make_test_content_in_item_in_1_3_type}>
                                                    <div className={styles.make_test_content_in_item_in_txt_content_s_item_2}>
                                                        {
                                                            (fixInd === 'yes') ?
                                                                <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1_1}>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1}>
                                                                            Ճիշտ է
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1_2}>
                                                                            <input checked onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${questCount}`} type="radio" />
                                                                        </div>

                                                                    </div>
                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1_1}>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1}>
                                                                            Սխալ է
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1_2}>
                                                                            <input onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${questCount}`} type="radio" />
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                : fixInd === 'no'
                                                                    ?
                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1}>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1}>
                                                                                Ճիշտ է
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1_2}>
                                                                                <input onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${questCount}`} type="radio" />
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1}>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1}>
                                                                                Սխալ է
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1_2}>
                                                                                <input checked onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${questCount}`} type="radio" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1}>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1}>
                                                                                Ճիշտ է
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1_2}>
                                                                                <input onClick={(e) => getWritenTestSecAnswers('yes', e)} name={`${questCount}`} type="radio" />
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1_1}>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1}>
                                                                                Սխալ է
                                                                            </div>
                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1_1_1_2}>
                                                                                <input onClick={(e) => getWritenTestSecAnswers('no', e)} name={`${questCount}`} type="radio" />
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }


                                })
                            }
                            {
                                thirdBArr.map((val, ind) => {
                                    questCount += 1

                                    let fixInd: any = null
                                    for (let i in allAnswersItem) {

                                        if (allAnswersItem[i].questNum == questCount) {
                                            fixInd = allAnswersItem[i].answerBtype
                                        }
                                    }

                                    if (val) {
                                        return (

                                            <div style={{ width: val.questionDescText.length > 20 || val.questionText.length ? '100%' : '40%' }} className={styles.make_test_content_in_item_in_1}>
                                                <div className={styles.make_test_content_in_item_in_1_1}>
                                                    <div className={styles.make_test_content_in_item_in_1_1c}>
                                                        <div className={styles.make_test_content_in_item_in_1_1_1}>
                                                            {questCount}.
                                                        </div>
                                                        
                                                        <div className={styles.make_test_content_in_item_in_1_1_1_title} dangerouslySetInnerHTML={{ __html: val.questionText }} >

                                                        </div>
                                                    </div>
                                                    <div className={styles.make_test_content_in_item_in_1_1_2}>
                                                        {val.questionPoint} մ․
                                                    </div>
                                                </div>
                                                {
                                                    val.questionDescText
                                                        ?
                                                        <div className={styles.make_test_content_in_item_in_1_2}>
                                                            {val.questionDescText}
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className={styles.make_test_content_in_item_in_1_3_type}>
                                                    <div className={styles.make_test_content_in_item_in_txt_content_s_item_2}>
                                                        <input value={fixInd} onChange={(e) => getWritenTestThirdAnswers(e.target.value, e)} type="text" name={`${questCount}`} />

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.subject_exma_item_content_2_item_2_item_1_print_content_1}>
                <button onClick={() => generatenewWritettest()}>Ձևաթուղթ</button>

            </div>


            <div className={styles.printPart}>
                <button onClick={() => printMFunc()}><FaPrint /></button>
            </div>
        </div >
    )
}


export default StudentTestComp










