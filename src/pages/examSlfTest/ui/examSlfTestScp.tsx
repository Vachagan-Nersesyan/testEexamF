import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './examSlfTestStl.module.css'
import { InputState, OwnProps } from './examStlTestTs.interface'
import { useSelector } from 'react-redux'
import { AppStateType } from 'entities/store/redux-store'

import pic2 from '../images/2.png'
import pic from '../images/1.png'
import { AllInfoAType, CategoryInfoType } from 'entities/testR/testReducerTs.interface'
import { useNavigate } from 'react-router-dom'

const FinalTestWithOutAnswerComp: React.FC<OwnProps> = () => {




    const navigate = useNavigate()

    const isAdminItem = useSelector((state: AppStateType) => state.adminR.isAdmin)

    if (!isAdminItem) {
        navigate('/')
    }


    let countBg = 0



    const printFunc = () => {
        window.print()
    }

    const arrAllInfoss = useSelector((state: AppStateType) => state.testR.allTests)
    const [arrAllInfossHkArr, setArrAllInfossHkArr] = useState<Array<CategoryInfoType>>(arrAllInfoss)

    useEffect(() => {
        setArrAllInfossHkArr(arrAllInfoss)

    }, [arrAllInfoss])



    const subjectName = useSelector((state: AppStateType) => state.testR.subjectName)
    const examYear = useSelector((state: AppStateType) => state.testR.examYear)



    return (
        <div className={styles.test_content_overlay}>
            <div className={styles.test_content}>
                <div className={styles.test_content_container}>
                    <div className={styles.test_content_first_content}>
                        <div className={styles.test_content_first_content_1}>
                            <div className={styles.test_content_first_content_1_1}>
                                <div className={styles.test_content_first_content_1_1_txt_content}>
                                    <div className={styles.test_content_first_content_1_1_txt_content_1}>
                                        {examYear} քննություն
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
                                    <input type="text" />
                                </div>
                                <div className={styles.test_content_first_content_1_3_2}>
                                    Ազգանուն
                                </div>
                            </div>
                            <div className={styles.test_content_first_content_1_4}>
                                <div className={styles.test_content_first_content_1_4_1}>
                                    <div className={styles.test_content_first_content_1_3_1}>
                                        <input type="text" />
                                    </div>
                                    <div className={styles.test_content_first_content_1_3_2}>
                                        Անուն
                                    </div>
                                </div>
                                <div className={styles.test_content_first_content_1_4_1}>
                                    <div className={styles.test_content_first_content_1_3_1}>
                                        <input type="text" />
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
                                    Գնահատական
                                </div>
                                <div className={styles.test_content_first_content_2_1_2}>
                                    /20
                                </div>
                            </div>
                            <div className={styles.test_content_first_content_2_2}>


                                <div className={styles.test_content_first_content_2_2_1}>
                                    <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                    </div>

                                </div>

                                <div className={styles.test_content_first_content_2_2_1}>
                                    <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                    </div>

                                </div>

                                <div className={styles.test_content_first_content_2_2_1}>
                                    <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                    </div>

                                </div>

                                <div className={styles.test_content_first_content_2_2_1}>
                                    <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                    </div>

                                </div>
                            </div>
                            <div className={styles.test_content_first_content_1_3_2}>
                                Խմբի համար
                            </div>
                        </div>
                        <div className={styles.test_content_first_content_3}>
                            <div className={styles.test_content_first_content_3_1}>
                                <img src={pic2} alt="" />
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
                                    Եղե՜ք ուջադիր
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
                                    <div className={styles.test_content_third_content_2_1_2_1}>
                                        <span>1</span>
                                        <input type="radio" name='short1' />
                                    </div>
                                    <div className={styles.test_content_third_content_2_1_2_1}>
                                        <span>2</span>
                                        <input type="radio" name='short1' />
                                    </div>
                                    <div className={styles.test_content_third_content_2_1_2_1}>
                                        <span>3</span>
                                        <input type="radio" name='short1' />
                                    </div>
                                    <div className={styles.test_content_third_content_2_1_2_1}>
                                        <span>4</span>
                                        <input type="radio" name='short1' />
                                    </div>
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


                                                    let indNum = 0




                                                    if (val.questionType.length > 0) {
                                                        isFirstCtShown = true
                                                    }


                                                    if (val.uniqName === 'choose') {

                                                        if (val.questionType.length > 20) {
                                                            num = Math.floor(val.questionType.length / 20) * 20
                                                        } else {
                                                            num = val.questionType.length
                                                        }




                                                        return (
                                                            <>
                                                                {
                                                                    val.questionType.length
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
                                                                                            val.questionType.map((val1, ind) => {

                                                                                                if (ind < num) {
                                                                                                    countBg += 1
                                                                                                    indNum += 1


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
                                                                                                                                return (
                                                                                                                                    <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                        <input type="radio" name='1' />
                                                                                                                                    </div>
                                                                                                                                )
                                                                                                                            })
                                                                                                                        }
                                                                                                                    </form>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            {
                                                                                                                ((ind + 1) % 20 === 0 && ind !== 0) || ind === val.questionType.length - 1
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
                                                                                val.questionType.length - num > 0
                                                                                    ?


                                                                                    <div className={styles.test_content_third_content_3_b}>
                                                                                        <div className={styles.test_content_third_content_3_title}>
                                                                                            Ընտրովի պատասխանով առաջադրանքներ
                                                                                        </div>

                                                                                        <div className={styles.test_content_third_content_3_2}>
                                                                                            <div className={styles.test_content_third_content_3_2_3}>
                                                                                                {
                                                                                                    [...new Array(Number(val.questionType.length - num))].map((val1, ind) => {

                                                                                                        if (ind < num) {
                                                                                                            countBg += 1
                                                                                                            indNum += 1



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
                                                                                                                                        return (
                                                                                                                                            <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                                                <input type="radio" name='1' />
                                                                                                                                            </div>
                                                                                                                                        )
                                                                                                                                    })
                                                                                                                                }
                                                                                                                            </form>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    {
                                                                                                                        ((ind + 1) % 20 === 0 && ind !== 0) || ind === val.questionType.length - num - 1
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

                                                    } else if (val.uniqName === 'shortandvariant') {

                                                        thirdNum = Math.ceil(val.questionType.length / 8)
                                                        currentNum = val.questionType.length
                                                        currentNumClone = val.questionType.length

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
                                                                                                    indNum += 1

                                                                                                    console.log(val.questionType[indNum - 1].thirdTypeQsAnswers)

                                                                                                    return (
                                                                                                        <div className={styles.test_content_third_content_4_1cc_1}>
                                                                                                            <div className={styles.test_content_third_content_4_1cc_1_1}>
                                                                                                                {countBg}
                                                                                                            </div>
                                                                                                            <div className={styles.test_content_third_content_4_1cc_1_2}>

                                                                                                                <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                    <input type="radio" name={`${indNum}`} />
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                    <input type="radio" name={`${indNum}`} />
                                                                                                                </div>
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
                                                                                                {/* :
                                                                                            null
                                                                                    } */}
                                                                                                <div className={styles.sec_shortanssq_content_b}>
                                                                                                    {
                                                                                                        [...new Array(currentNum < 4 ? currentNum : 4)].map((val2, ind2) => {
                                                                                                            countBg += 1
                                                                                                            currentNum -= 1
                                                                                                            currentNumClone -= 1
                                                                                                            indNum += 1
                                                                                                            return (
                                                                                                                <div className={styles.test_content_third_content_4_1cc_1}>
                                                                                                                    <div className={styles.test_content_third_content_4_1cc_1_1}>
                                                                                                                        {countBg}
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1cc_1_2}>

                                                                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                            <input type="radio" name={`${indNum}`} />
                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                                                                            <input type="radio" name={`${indNum}`} />
                                                                                                                        </div>
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
                                                    } else if (val.uniqName === 'shortbtype') {

                                                        f = val.questionType.length
                                                        forthNum = Math.ceil(val.questionType.length / 5)
                                                        forthBNum = val.questionType.length - (Math.floor(val.questionType.length / 5) * 5)


                                                        return (
                                                            <>

                                                                {
                                                                    [...new Array(forthNum === 1 ? 1 : forthNum)].map((val5, ind) => {
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

                                                                                                    indNum += 1

                                                                                                    return (
                                                                                                        <div className={styles.test_content_third_content_4_1_1_dw}>
                                                                                                            <div className={styles.test_content_third_content_4_1_1_1_dw}>
                                                                                                                {countBg}
                                                                                                            </div>
                                                                                                            <div className={styles.test_content_third_content_4_1_1_2_bbsw}>
                                                                                                                <input type="text" name='short1' maxLength={1} />

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
                                                                                                indNum += 1

                                                                                                return (
                                                                                                    <div className={styles.test_content_third_content_4_1_1_dw}>
                                                                                                        <div className={styles.test_content_third_content_4_1_1_1_dw}>
                                                                                                            {countBg}
                                                                                                        </div>
                                                                                                        <div className={styles.test_content_third_content_4_1_1_2_bbsw}>
                                                                                                            <input type="text" name='short1' maxLength={1} />

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
                                                                                                        <span>Կարճ պատասխանով </span> <span>առաջադրանքներ</span>
                                                                                                    </div>
                                                                                                    :
                                                                                                    null
                                                                                            }
                                                                                            <div className={styles.test_content_third_content_3_ovrle}>
                                                                                                {
                                                                                                    [...new Array(5)].map((val1) => {
                                                                                                        countBg += 1
                                                                                                        indNum += 1
                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1_dw}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1_dw}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_bbsw}>
                                                                                                                    <input type="text" name='short1' maxLength={1} />

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


























                                                    } else if (val.uniqName === 'short') {


                                                        secNum = Math.floor(val.questionType.length / 5)
                                                        secBNum = Math.ceil(val.questionType.length / 5)
                                                        lstNum = val.questionType.length - (Math.floor(val.questionType.length / 5) * 5)


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
                                                                    val.questionType.length - num < 4 && val.questionType.length - num !== 0 && secNum
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
                                                                                                        indNum += 1

                                                                                                        let itmArr = []

                                                                                                        if (val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                            for (let i in val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                                itmArr.push(val.questionType[indNum - 1].secTypeQsAnswers?.[`${i}`]);

                                                                                                            }
                                                                                                        }
                                                                                                        console.log(itmArr, 'itmArr')

                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                    {
                                                                                                                        itmArr.map((val, ind) => {
                                                                                                                            return (
                                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                    <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }
                                                                                                                    {/* <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div> */}
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
                                                                        val.questionType.length - num > 4 && val.questionType.length - num < 8 && num !== 0
                                                                            ?
                                                                            <div className={styles.test_content_third_content_3_content_d}>
                                                                                {/* {
                                                                                    ind === 0 && isFirstCtShown
                                                                                        ?
                                                                                        <span className={styles.ctgry_name}>
                                                                                            Category {val1.category}
                                                                                        </span>
                                                                                        :
                                                                                        null
                                                                                } */}
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
                                                                                                            indNum += 1

                                                                                                            let itmArr = []

                                                                                                            if (val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                                for (let i in val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                                    itmArr.push(val.questionType[indNum - 1].secTypeQsAnswers?.[`${i}`]);

                                                                                                                }
                                                                                                            }
                                                                                                            console.log(itmArr, 'itmArr')
                                                                                                            return (
                                                                                                                <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                        {countBg}
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                        {
                                                                                                                            itmArr.map((val, ind) => {
                                                                                                                                return (
                                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                                                                                    </div>
                                                                                                                                )
                                                                                                                            })
                                                                                                                        }
                                                                                                                        {/* <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                            <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                            <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                            <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                            <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                        </div>
                                                                                                                        <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                            <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                        </div> */}
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
                                                                            {/* {
                                                                                ind === 0 && isFirstCtShown
                                                                                    ?
                                                                                    <span className={styles.ctgry_name}>
                                                                                        Category {val1.category}
                                                                                    </span>
                                                                                    :
                                                                                    null
                                                                            } */}
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
                                                                                                        indNum += 1

                                                                                                        let itmArr = []

                                                                                                        if (val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                            for (let i in val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                                itmArr.push(val.questionType[indNum - 1].secTypeQsAnswers?.[`${i}`]);

                                                                                                            }
                                                                                                        }
                                                                                                        console.log(itmArr, 'itmArr')
                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                    {
                                                                                                                        itmArr.map((val, ind) => {
                                                                                                                            return (
                                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                    <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }
                                                                                                                    {/* <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div>
                                                                                                                    <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                                                                    </div> */}
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
                                                                        // secBNum - secNum
                                                                        ?

                                                                        <div className={styles.test_content_third_content_3_content_d}>
                                                                            {/* {
                                                                                ind === 0 && isFirstCtShown
                                                                                    ?
                                                                                    <span className={styles.ctgry_name}>
                                                                                        Category {val1.category}
                                                                                    </span>
                                                                                    :
                                                                                    null
                                                                            } */}
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
                                                                                                        indNum += 1

                                                                                                        let itmArr = []

                                                                                                        if (val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                            for (let i in val.questionType[indNum - 1].secTypeQsAnswers) {
                                                                                                                itmArr.push(val.questionType[indNum - 1].secTypeQsAnswers?.[`${i}`]);

                                                                                                            }
                                                                                                        }
                                                                                                        console.log(itmArr, 'itmArr')
                                                                                                        return (
                                                                                                            <div className={styles.test_content_third_content_4_1_1}>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_1}>
                                                                                                                    {countBg}
                                                                                                                </div>
                                                                                                                <div className={styles.test_content_third_content_4_1_1_2}>
                                                                                                                    {
                                                                                                                        itmArr.map((val, ind) => {
                                                                                                                            return (
                                                                                                                                <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                                                                    <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

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



















                            <div className={styles.test_content_third_content_6}>
                                <div className={styles.test_content_third_content_3_title}>
                                    Ամբողջ ձևաթղթում սխալ նշված պատասխանները փոխելու տեղը
                                </div>
                                <div className={styles.test_content_third_content_6_1}>


                                    <div className={styles.test_content_third_content_3_22}>
                                        <div className={styles.test_content_third_content_3_2}>
                                            <div className={styles.test_content_third_content_3_2_1}>
                                                Ընտրովի պատասխան
                                            </div>
                                            <div className={styles.test_content_third_content_3_2_2_b}>
                                                <span>a</span>
                                                <span>b</span>
                                                <span>c</span>
                                                <span>d</span>
                                            </div>
                                            <div className={styles.test_content_third_content_6_1_1_2_1_1}>

                                                <div className={styles.test_content_third_content_6_1_1_2_1_1_ov} >
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_1}>
                                                        <div className={styles.test_content_third_content_6_1_1_2_1}>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_sec}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_2}>
                                                        <div className={styles.test_content_third_content_3_2_3}>
                                                            <div className={styles.test_content_third_content_3_2_3_1_b}>

                                                                <div className={styles.test_content_third_content_3_2_3_1_2}>
                                                                    <form action="">
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.test_content_third_content_6_1_1_2_1_1_ov} >
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_1}>
                                                        <div className={styles.test_content_third_content_6_1_1_2_1}>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_sec}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_2}>
                                                        <div className={styles.test_content_third_content_3_2_3}>
                                                            <div className={styles.test_content_third_content_3_2_3_1_b}>

                                                                <div className={styles.test_content_third_content_3_2_3_1_2}>
                                                                    <form action="">
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                        <div className={styles.test_content_third_content_3_2_3_1_2_1}>
                                                                            <input type="radio" name='1' />
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className={styles.test_content_third_content_3}>
                                        <div className={styles.test_content_third_content_3_2}>
                                            <div className={styles.test_content_third_content_3_2_1}>
                                                Կարճ պատասխան
                                            </div>

                                            <div className={styles.test_content_third_content_3_2_2_ww}>

                                                <div className={styles.test_content_third_content_4_1_1}>
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_1}>
                                                        <div className={styles.test_content_third_content_4_1_1_2_1_thrid}>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.test_content_third_content_4_1_1_2_rwqwe}>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className={styles.test_content_third_content_4_1_1}>
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_1}>
                                                        <div className={styles.test_content_third_content_4_1_1_2_1_thrid}>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.test_content_third_content_4_1_1_2_rwqwe}>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className={styles.test_content_third_content_4_1_1}>
                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_1}>
                                                        <div className={styles.test_content_third_content_4_1_1_2_1_thrid}>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.test_content_third_content_4_1_1_2_rwqwe}>
                                                        <input type="text" />
                                                    </div>
                                                </div>

                                                <div className={styles.test_content_third_content_3_sec_contenw_in_item}>

                                                    <div className={styles.test_content_third_content_6_1_1_2_1_1_1}>
                                                        <div className={styles.test_content_third_content_4_1_1_2_1_thrid}>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                            <div className={styles.test_content_third_content_4_1_1_2_1_thrid_item}>
                                                                <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.test_content_third_content_3_sec_contenw_in_item_weq}>
                                                        <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title}>
                                                            <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title_1}>
                                                                Ճիշտ է
                                                            </div>

                                                            <div className={styles.test_content_third_content_3_sec_contenw_in_item_in_title_1}>
                                                                Սխալ է
                                                            </div>
                                                        </div>
                                                        <div className={styles.sec_shortanssq_content_b}>
                                                            <div className={styles.test_content_third_content_4_1cc_1}>
                                                                <div className={styles.test_content_third_content_4_1cc_1_2}>
                                                                    <div className={styles.test_content_third_content_4_1cc_1_2_1}>
                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />

                                                                    </div>
                                                                    <div className={styles.test_content_third_content_4_1cc_1_2_2}>
                                                                        <input type="text" name='short1' maxLength={1} className={styles.txtinp} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </div>
                            </div>


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
                        <input type="text" />
                    </div>
                </div>
            </div>



            <div className={styles.printPart}>
                <button onClick={() => printFunc()}>print</button>
            </div>
        </div >
    )
}

export default FinalTestWithOutAnswerComp