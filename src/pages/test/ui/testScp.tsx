import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './testStl.module.css'
import { OwnProps } from './testTs.interface'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestionFunc, changeAllBetaWorkTest, changeIsRndItm, clearArrFunc, getAllExamInfoCountFunc, getAllQuestionsCount, getAllQuestionsCountFunc, getAllWrongQuestionsCountFunc, getInitInfoArr, getTestName, updateQuestionMnnFunc, updateTestsArr } from 'entities/testR/testReducer'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'
import { useNavigate } from 'react-router-dom'
import { AllExamInfoType, AnswersInputsType, CategoryInfoType, NewTestInfoType, QuestionType, SecTypeQsAnswersType, ThirdTypeQsAnswersType } from 'entities/testR/testReducerTs.interface'
// import { getQuestionFunc, sendQuestionFunc } from 'entities/testR/testReducerThunk'
import { ForthTypeQsAnswersType, QuestCountInfoType } from 'entities/nTestR/nTestReducerTs.interface'
import { newTestQuestionsCountFunc, newTestQuestionsInfoFunc } from 'entities/nTestR/nTestReducer'
import { getTestQuestFunc } from 'entities/nTestR/nTestReducerThunk'
import { deleteQuestionFunc, sendQuestionFunc, updateQuestionFunc } from 'entities/testR/testReducerThunk'
import { SubjectType } from 'entities/subjectR/subjectReducerTs.interface'
import { changeStudentNumstInfo, changeStudentTestsInfo } from 'entities/student/studentReducer'
import { Col, Row, Tabs, TabsProps } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { v4 as uuidv4 } from 'uuid';
import pic from '../images/1.png'
import loader from '../images/2.gif'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaPencil, FaPlus, FaRegTrashCan, FaTrash } from 'react-icons/fa6'
import { getExamsFunc } from 'entities/subjectR/subjectReducerThunk'





export const TestComp: React.FC<OwnProps> = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const [isuporNot, setIsuporNot] = useState<boolean>(false)

    const currentExamName = useSelector((state: AppStateType) => state.testR.currentExamName)
    const currentSubjectName = useSelector((state: AppStateType) => state.testR.currentSubjectName)
    const allExams = useSelector((state: AppStateType) => state.subjectR.allExams)
    const [allExamsHk, setAllExams] = useState<Array<SubjectType>>(allExams)

    useEffect(() => {
        setAllExams(allExams)
        console.log(allExams, currentSubjectName, currentExamName)
        allExams.map((val) => {
            if (val.subjectName === currentSubjectName) {

                val.exams.map((val1) => {


                    if (val1.name === currentExamName && currentExamName !== '') {


                        setIsuporNot(true)
                    }
                })
            }
        })
    }, [allExams])




    const allTtests = useSelector((state: AppStateType) => state.testR.allTests)
    const [getAllTestss, setAllTestss] = useState<Array<CategoryInfoType>>(allTtests)





    useEffect(() => {
        setAllTestss(allTtests)

    }, [allTtests])

    useEffect(() => {

        setAllTestss(allTtests)

        updateQuestionInfo(allTtests)

    }, [allTtests])


    const isRndComp = useSelector((state: AppStateType) => state.testR.isRnd)






    useEffect(() => {
        return () => {
            dispatch(changeIsRndItm(false))
            setIsuporNot(false)
            dispatch(getTestName({ info: '' }))
            // dispatch(updateTestsArr())
        };
    }, []);



    const aDispatch = useAppDispatch()

    const allInfoArr = useSelector((state: AppStateType) => state.testR.allInfoArr)

    // const [chAnsQuest, setChAnsQuest] = useState({
    //     chooseAnswerQuest: '',
    //     shortAnswerQuest: '',
    //     shortAnswerBQuest: '',
    //     chooseAnswerBQuest: '',
    //     shortAnswerCQuest: '',
    //     shortAnswerDQuest: '',
    //     shortAnswerEQuest: '',
    //     wrongChooseAnswerQuest: '',
    //     wrongShortAnswerQuest: '',
    // });

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setChAnsQuest((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };



    const [selectedValue, setSelectedValue] = useState<string>('');
    let [countValue, setCountValue] = useState<string>('');
    let [longName, setLongName] = useState<string>('');

    const [getVariant, setVariant] = useState<boolean | null>(null);


    // ddddddddd

    let wrQstPrtArr = [{
        id: 0,
        name: 'Սխալ Ընտրովի պատասխաններ',
        uniqName: 'wrchoose',
        variant: false,
        countValue: '',
        text: ''
    },
    {
        id: 1,
        name: 'Սխալ Կարճ պատասխաններ',
        uniqName: 'wrshort',
        variant: false,
        countValue: '',

        text: ''
    },
    {
        id: 2,
        name: 'Սխալ Կարճ և տարբերակներով պատասխաններ',
        uniqName: 'wrshortandvariant',
        countValue: '',
        variant: false,
        text: ''
    }]


    const [questWrInputs, setQuestWrInputs] = useState<any>({});

    const handleQuestWrInputChange = (event: ChangeEvent<HTMLInputElement>, ind: number) => {

        wrQstPrtArr[ind - 3].text = event.target.value

    };

    // dddddd




    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // Update the state with the selected value
        setSelectedValue(event.target.value);

        // You can perform additional actions here based on the selected value
        console.log("Selected value: " + event.target.value);
    };

    const [infoArr, setInfoArr] = useState(allInfoArr)


    useEffect(() => {

        setInfoArr(allInfoArr)
    }, [allInfoArr])

    const saveInfo = (tp: boolean | null) => {

        let wrQstPrtArrClone = wrQstPrtArr.filter((val) => Number(val.text) > 0)

        for (let i in wrQstPrtArrClone) {
            let obj = {
                id: infoArr.length,
                longName: wrQstPrtArrClone[i].name,
                countValue: wrQstPrtArrClone[i].text,
                selectedValue: wrQstPrtArrClone[i].uniqName,
                isLoopEnd: false,
                lastIndex: 0,
                initNumber: numSum - Number(countValue)
            }

            // if (tp) {
            //     dispatch(getAllQuestionsCountFunc({ info: obj }))

            // } else {
            dispatch(getAllWrongQuestionsCountFunc({ info: obj }))

            // }

        }

    }


    const allWrInfoArr = useSelector((state: AppStateType) => state.testR.wrongQuestArr)
    const [infoWrArr, setInfoWRArr] = useState(allWrInfoArr)

    useEffect(() => {
        setInfoWRArr(allWrInfoArr)
    }, [allWrInfoArr])



    const otherInfoComp = useSelector((state: AppStateType) => state.testR.otherInfo)
    const [chAnsQuest, setChAnsQuest] = useState<AllExamInfoType | null>(null)
    useEffect(() => {
        setChAnsQuest(otherInfoComp)
    }, [otherInfoComp])




    const getAllExamOthInfoCompFunc = () => {

        // if (Number(countValue) > 0) {
        // setActiveInpVal('')
        setNumSum(numSum += Number(countValue))
        saveInfo(getVariant)
        // }
        // dispatch(getAllExamInfoCountFunc({ info: chAnsQuest }))
        navigate('/test')

    }



    let [numSum, setNumSum] = useState<number>(0)








    let [firstQuestType, setfirstQuestType] = useState<Array<QuestionType>>([])
    let [secondQuestType, setsecondQuestType] = useState<Array<QuestionType>>([])
    let [thirdQuestType, setthirdQuestType] = useState<Array<QuestionType>>([])
    let [forthQuestType, setforthQuestType] = useState<Array<QuestionType>>([])
    let [fivthQuestType, setfivthQuestType] = useState<Array<QuestionType>>([])




    const updateQuestionInfo = (arr: Array<CategoryInfoType>) => {

        setfirstQuestType([])
        setsecondQuestType([])
        setthirdQuestType([])
        setforthQuestType([])
        setfivthQuestType([])





        arr.map((val) => {

            if (val.category === 'A') {
                val.questions.map((val) => {
                    setfirstQuestType(val.questionType)
                })
            } else if (val.category === 'B') {
                val.questions.map((val) => {
                    if (val.uniqName === 'short') {
                        setsecondQuestType(val.questionType)
                    } else {
                        setthirdQuestType(val.questionType)
                    }
                })
            } else {
                val.questions.map((val) => {
                    if (val.uniqName === 'shortbtype') {
                        setforthQuestType(val.questionType)
                    } else {
                        setfivthQuestType(val.questionType)
                    }
                })
            }

        })


    }



    const [answerArr, setAnswerArr] = useState([
        {
            id: uuidv4(),
            idNum: 0,
            text: '',
            picture: ''
        },
        {
            id: uuidv4(),
            idNum: 1,
            text: '',
            picture: ''
        },
        {
            id: uuidv4(),
            idNum: 2,
            text: '',
            picture: ''
        },
        {
            id: uuidv4(),
            idNum: 3,
            text: '',
            picture: ''
        },
    ])


    const ansSecArr = [
        {
            id: 0,
            name: 'first'
        },
        {
            id: 1,
            name: 'second'
        },
        {
            id: 2,
            name: 'third'
        },
        {
            id: 3,
            name: 'forth'
        },
        {
            id: 4,
            name: 'fivth'
        },
    ]



    const [selectedRpValue, setSelectedVRpalue] = useState<string>('choose');

    const [questionPoint, setPointAns] = useState<string>('0.25');
    const [questionText, setQuestionText] = useState<string>('');
    const [questionDescText, setQuestionDescText] = useState<string>('');

    const [chckbxIndex, setChckbxIndex] = useState<number>(0);




    const handleSelectRpChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedVRpalue(event.target.value);
    };

    const [selectedLvlValue, setSelectedVLvlalue] = useState<string>('a');

    const handleSelectLvlpChange = (event: ChangeEvent<HTMLSelectElement>) => {
        let str = event.target.value === 'a' ? 'choose' : event.target.value === 'b' ? 'short' : event.target.value === 'c' ? 'shortbtype' : ''
        setSelectedVRpalue(str)
        setSelectedVLvlalue(event.target.value);
    };




    const [secTypeQsAnswers, setSecTypeQsAnswers] = useState<SecTypeQsAnswersType>({
        input0: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    });

    const handleSecAnswerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(event.target.value))) {
            setSecTypeQsAnswers({
                ...secTypeQsAnswers,
                [event.target.name]: event.target.value,
            });
        }
    };

    const [thirdTypeQsAnswers, setThirdTypeQsAnswers] = useState<string>('yes');

    // const handleThirdAnswerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     // if (!isNaN(Number(event.target.value))) {
    //         setThirdTypeQsAnswers({
    //             ...thirdTypeQsAnswers,
    //             [event.target.name]: event.target.value,
    //         });
    //     // }
    // };

    const [forthTypeBQsAnswers, setForthTypeQsAnswers] = useState<string>('')

    const [selectedImage, setSelectedImage] = useState<string | null>('');

    const [body, setBody] = useState('')

    const loadComp = useSelector((state: AppStateType) => state.testR.loading)
    const [loadCompHk, setLoadCompHk] = useState<boolean>(loadComp)
    useEffect(() => {
        setLoadCompHk(loadComp)
    }, [loadComp])

    const [activeId, setActiveId] = useState<number | null>(null)

    const sendNewQuestion: (type: boolean) => void = async (type) => {

        // updateQuestionInfo()
        // debugger

        let isChooseTypeInpValid = true

        for (let i in answerArr) {
            if (answerArr[i].text === '') {
                isChooseTypeInpValid = false
            }
        }


        if (questionText && questionPoint && ((isChooseTypeInpValid && selectedRpValue === 'choose') ||
            (secTypeQsAnswers.input0 && secTypeQsAnswers.input1 && secTypeQsAnswers.input2 && secTypeQsAnswers.input3 && secTypeQsAnswers.input4 && selectedRpValue === 'short') ||
            (forthTypeBQsAnswers && selectedRpValue === 'shortbtype') ||
            (thirdTypeQsAnswers && selectedRpValue === 'shortandvariant')
        )) {
            let obj: QuestionType | null = null

            console.log('adwdwdw')


            if (selectedRpValue === 'choose') {
                obj = {
                    selectedRpValue,
                    questionPoint,
                    questionDescText,
                    questionText,
                    selectedLvlValue,
                    chckbxIndex,
                    selectedImage,
                    answersInputs: answerArr
                }
            } else if (selectedRpValue === 'short') {
                obj = {
                    selectedRpValue,
                    selectedLvlValue,
                    selectedImage,
                    questionDescText,
                    questionPoint,
                    questionText,
                    secTypeQsAnswers
                }
            } else if (selectedRpValue === 'shortandvariant') {
                obj = {
                    selectedLvlValue,
                    selectedRpValue,
                    questionDescText,
                    questionPoint,
                    selectedImage,
                    questionText,
                    thirdTypeQsAnswers
                }
            } else {
                obj = {
                    selectedLvlValue,
                    selectedRpValue,
                    questionDescText,
                    selectedImage,
                    questionPoint,
                    questionText,
                    forthTypeBQsAnswers
                }
            }

            console.log(obj, 'obj')


            if (type) {

                dispatch(addQuestionFunc({ info: obj }))
            } else {
                dispatch(updateQuestionMnnFunc({ info: obj, id: activeId }))
            }
            setBody('')
            setPointAns('0.25')
            setQuestionText('')
            setQuestionDescText('')
            setChckbxIndex(0)
            setForthTypeQsAnswers('')
            setThirdTypeQsAnswers('yes')
            setSelectedImage('')
            setSecTypeQsAnswers({
                input0: '',
                input1: '',
                input2: '',
                input3: '',
                input4: '',
            })
            setAnswerArr([
                {
                    id: uuidv4(),
                    idNum: 0,
                    text: 'first',
                    picture: ''
                },
                {
                    id: uuidv4(),
                    idNum: 1,
                    text: 'second',
                    picture: ''
                },
                {
                    id: uuidv4(),
                    idNum: 2,
                    text: 'third',
                    picture: ''
                },
                {
                    id: uuidv4(),
                    idNum: 3,
                    text: 'forth',
                    picture: ''
                }
            ])
            // setAnswersInputs({
            //     input0: '',
            //     input1: '',
            //     input2: '',
            //     input3: '',
            // })
        }


        // await aDispatch(sendQuestionFunc({ info: obj }))
        // await aDispatch(getQuestionFunc())

    }

    console.log(questionDescText, 'questionDescText')

    // third part section


    const newTstItems = useSelector((state: AppStateType) => state.makeTestR.allQuestTest)

    const [newTestItemArr, setNewTestItemArr] = useState(newTstItems)


    useEffect(() => {
        setNewTestItemArr(newTstItems)
    }, [newTstItems])

    const [forthTypeQsAnswers, setForthypeQsAnswers] = useState<ForthTypeQsAnswersType>({
        // a
        thchoose: '0',
        // b
        thshort: '0',
        thshortb: '0',
        // c
        thshortanvariant: '0',

        thshortcctgry: '0'
    });

    const handleForthAnswerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(event.target.value))) {
            setForthypeQsAnswers({
                ...forthTypeQsAnswers,
                [event.target.name]: event.target.value,
            });
        }
    };

    const [isWrongNumb, setIsWrongNumb] = useState<string>('')


    const [nwTestsqInfo, setNwTestsqInfo] = useState<NewTestInfoType>({
        building: '',
        resultNum: '',
        clssNum: '',
        arName: '',
        teachName: '',
        date: '',
        clssNm: ''
    });




    const makeNewTestCompFunc = () => {

        if (firstQuestType.length < Number(forthTypeQsAnswers.thchoose)) {
            setIsWrongNumb('1')
        } else if (secondQuestType.length < Number(forthTypeQsAnswers.thshort)) {
            setIsWrongNumb('2')
        } else if (thirdQuestType.length < Number(forthTypeQsAnswers.thshortb)) {
            setIsWrongNumb('3')
        } else if (forthQuestType.length < Number(forthTypeQsAnswers.thshortcctgry)) {
            setIsWrongNumb('4')
        } else if (fivthQuestType.length < Number(forthTypeQsAnswers.thshortanvariant)) {
            setIsWrongNumb('5')
        } else {

            for (let i in forthTypeQsAnswers) {
                if (forthTypeQsAnswers[i] === '' || forthTypeQsAnswers[i] === '0') {

                    switch (true) {
                        case forthTypeQsAnswers.thchoose === '0':
                            forthTypeQsAnswers.thchoose = String(firstQuestType.length);
                            break;
                        case forthTypeQsAnswers.thshort === '0':
                            forthTypeQsAnswers.thshort = String(secondQuestType.length);
                            break;
                        case forthTypeQsAnswers.thshortb === '0':
                            forthTypeQsAnswers.thshortb = String(thirdQuestType.length);
                            break;
                        case forthTypeQsAnswers.thshortcctgry === '0':
                            forthTypeQsAnswers.thshortcctgry = String(forthQuestType.length);
                            break;
                        case forthTypeQsAnswers.thshortanvariant === '0':
                            forthTypeQsAnswers.thshortanvariant = String(fivthQuestType.length);
                            break;
                        default:
                            break;
                    }

                }
            }


            let isValid = true


            for (let i in nwTestsqInfo) {
                if (nwTestsqInfo[i] === '') {
                    isValid = false
                }
            }


            if (isValid) {

                dispatch(newTestQuestionsInfoFunc({ info: nwTestsqInfo }))


                dispatch(newTestQuestionsCountFunc({ info: forthTypeQsAnswers }))

                dispatch(changeStudentNumstInfo({ info: forthTypeQsAnswers }))
                dispatch(changeStudentTestsInfo({ info: allTtests }))


                // navigate('/new-test')
            }
        }

    }


    const examName = useSelector((state: AppStateType) => state.testR.testName)
    const subjjectName = useSelector((state: AppStateType) => state.subjectR.saveSubjectName)
    const currentExamNameClone = useSelector((state: AppStateType) => state.testR.currentExamName)


    // const currentExamName = useSelector((state: AppStateType) => state.testR.currentExamName)
    // const currentSubjectName = useSelector((state: AppStateType) => state.testR.currentSubjectName)
    const createExam: () => void = async () => {
        makeNewTestCompFunc()

        console.log(subjjectName, currentSubjectName, currentExamName, 'subjjectName')
        await aDispatch(sendQuestionFunc({ info: allTtests, name: examName, subjjectName: currentSubjectName, textInfo: chAnsQuest, otherInfo: nwTestsqInfo, questionCount: forthTypeQsAnswers }))
        navigate('/admin')

    }


    const updateExam: () => void = async () => {
        makeNewTestCompFunc()


        await aDispatch(updateQuestionFunc({ info: allTtests, name: currentExamNameClone, subjjectName: currentSubjectName, textInfo: chAnsQuest, otherInfo: nwTestsqInfo, questionCount: forthTypeQsAnswers }))
        navigate('/admin')

    }





    const setImageFunc = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const selectedFile = fileInput.files && fileInput.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    const [allQuestionArr, setAllQuestionArr] = useState<Array<QuestionType>>([])

    useEffect(() => {
        let fstArr: any = []
        getAllTestss.map((val) => {
            val.questions.map((val1) => {
                val1.questionType.map((val2) => {
                    fstArr.push(val2)
                })
            })
        })
        console.log(fstArr)
        setAllQuestionArr(fstArr)
    }, [getAllTestss])

    const [isShow, setIsShow] = useState<boolean>(true)


    const handleBody = (e: any) => {

        setBody(e)
        // setQuestionText(e.target.value)
        setQuestionText(body)

    }

    const deletFuncCom = async (val: QuestionType) => {


        getAllTestss.map((val1) => {
            if (val1.category.toLowerCase() === val.selectedLvlValue) {
                val1.questions.map((val2) => {
                    if (val2.uniqName === val.selectedRpValue) {

                        aDispatch(deleteQuestionFunc({ val, val1, subjjectName: currentSubjectName, name: subjjectName }))


                    }
                })
            }
        })


    }

    const deleteInpFunc = (id: string) => {
        let arrClone = [...answerArr]

        arrClone.map((val, ind) => {
            if (val.id === id) {
                arrClone.splice(ind, 1)
            }
        })

        arrClone.map((val, ind) => {
            val.idNum = ind
        })

        setAnswerArr(arrClone)

        console.log(arrClone)
    }

    const addInput = () => {
        let arrClone = [...answerArr]

        if (arrClone.length < 4) {
            let obj = {
                id: uuidv4(),
                text: '',
                picture: '',
                idNum: arrClone.length,
            }

            arrClone.push(obj)
        }
        setAnswerArr(arrClone)

        console.log(arrClone, 'answerArr adding')
    }

    const changeInpTextFunc = (e: any, id: string) => {

        let arrClone = [...answerArr]

        arrClone.map((val) => {
            if (val.id === id) {
                val.text = ''
                val.text += e
            }
        })
        setAnswerArr(arrClone)


        console.log(arrClone, 'answerArr change textt')
    }



    const setInpImageFunc = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const fileInput = e.target;
        const selectedFile = fileInput.files && fileInput.files[0];

        let arrClone = [...answerArr]

        arrClone.map((val) => {
            if (val.id === id && selectedFile) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    val.picture = e.target?.result as string
                    setAnswerArr(arrClone)

                };

                reader.readAsDataURL(selectedFile);
            }
        })



    }

    const [isUpdateQuestion, setIsUpdateQuestion] = useState<boolean>(false)
    let [questionUpdateText, setQuestionUpdateText] = useState<QuestionType | null>(null)



    const updateQuestionItems = (val: QuestionType, ind: number) => {
        setActiveId(ind)
        console.log(val)

        setSelectedVRpalue(val.selectedRpValue)
        setSelectedVLvlalue(val.selectedLvlValue);
        setPointAns(val.questionPoint)
        setQuestionText(val.questionText)
        setBody(val.questionText)
        setQuestionDescText(val.questionDescText)

        if (val?.selectedImage) {
            setSelectedImage(val.selectedImage)
        }


        let newData: any = []
        val?.answersInputs?.map((val1, ind) => {
            newData.push({
                id: uuidv4(),
                idNum: val1.idNum,
                text: val1.text,
                picture: val1.picture
            })
        })

        console.log(newData, 'newData')


        let obj: any = {
            input0: val.secTypeQsAnswers?.input0,
            input1: val.secTypeQsAnswers?.input1,
            input2: val.secTypeQsAnswers?.input2,
            input3: val.secTypeQsAnswers?.input3,
            input4: val.secTypeQsAnswers?.input4,
        }

        setSecTypeQsAnswers(obj)


        if (val.forthTypeBQsAnswers) {
            setForthTypeQsAnswers(val.forthTypeBQsAnswers)
        }

        if (val.thirdTypeQsAnswers) {
            setThirdTypeQsAnswers(val.thirdTypeQsAnswers)

        }


        setAnswerArr(newData)
        // setQuestionUpdateTextClone(val)
        setIsUpdateQuestion(true)
        setQuestionUpdateText(val)
        setIsShow(false)
        console.log(val, 'val')
    }






    const items: TabsProps['items'] = [

        {
            key: '2',
            label: (<div onClick={() => setIsShow(true)}>Հարցերի ավելացում</div>),
            children: (

                <Row className={styles.question_big_content_overlay}>
                    <Col span={12} className={styles.question_big_content_s}>
                        {
                            allQuestionArr.map((val, ind) => {
                                return (
                                    <div className={styles.question_big_content_s_1_content}>
                                        <div className={styles.question_big_content_s_1} dangerouslySetInnerHTML={{ __html: val.questionText }}>

                                        </div>
                                        <div className={styles.question_big_content_s_2_container}>
                                            <div className={styles.question_big_content_s_2}>
                                                <button onClick={() => updateQuestionItems(val, ind)}><FaPencil /></button>
                                            </div>

                                            <div className={styles.question_big_content_s_2} onClick={() => deletFuncCom(val)}>
                                                {
                                                    loadCompHk
                                                        ?
                                                        <div className={styles.login_content_text_item_loader}>
                                                            <img src={loader} alt="" />
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <button><FaTrash /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Col>

                    <Col span={12} className={styles.question_big_content_fs}>
                        {
                            isShow
                                ?
                                <div className={styles.add_tstt_btn_ovrl}>
                                    <button className={styles.add_tstt_btn} onClick={() => setIsShow(false)}>
                                        Ավելացնել հարց
                                    </button>
                                </div>
                                :
                                <>
                                    <div className={styles.right_side_content}>
                                        <div className={styles.right_side_1}>
                                            Գեներացնել թեստը
                                        </div>
                                        <div className={styles.right_side_2_1}>
                                            <div className={styles.right_side_2_1_1}>
                                                Բարդություն
                                            </div>
                                            <div className={styles.right_side_2_1_2}>
                                                {

                                                    <select onChange={handleSelectLvlpChange}>
                                                        <option value="a" selected>A մակարդակ</option>
                                                        <option value="b">B մակարդակ</option>
                                                        <option value="c">C մակարդակ</option>
                                                    </select>
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.right_side_2}>
                                            <div className={styles.right_side_2_1}>
                                                <div className={styles.right_side_2_1_1}>
                                                    Կատեգորիա
                                                </div>
                                                <div className={styles.right_side_2_1_2}>
                                                    {

                                                        selectedLvlValue === 'a'
                                                            ?
                                                            <select onChange={handleSelectRpChange}>
                                                                <option value="choose" selected>Ընտրովի պատասխաններ</option>
                                                            </select>
                                                            :
                                                            selectedLvlValue === 'b'
                                                                ?
                                                                <select onChange={handleSelectRpChange}>
                                                                    <option value="short" selected>Կարճ պատասխաններ</option>
                                                                    <option value="shortbtype">Կարճ պատասխաններ B</option>

                                                                </select>
                                                                :
                                                                selectedLvlValue === 'c'
                                                                    ?
                                                                    <select onChange={handleSelectRpChange}>
                                                                        <option value="shortbtype" selected>Կարճ պատասխաններ B</option>
                                                                        <option value="shortandvariant">Կարճ և տարբերակներով պատասխաններ</option>
                                                                    </select>
                                                                    :
                                                                    null

                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.right_side_2_2}>
                                                <div className={styles.right_side_2_1_1_b}>
                                                    Միավոր
                                                </div>
                                                <div className={styles.right_side_2_1_2}>
                                                    <select onChange={(e) => setPointAns(e.target.value)}>
                                                        <option value="0.25" selected>0.25 միավոր</option>
                                                        <option value="0.5">0.5 միավոր</option>
                                                        <option value="1">1 միավոր</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.right_side_3}>
                                            <div className={styles.right_side_2_1_1}>
                                                Խնդրում ենք գրեք հարցը
                                            </div>
                                            <div className={styles.right_side_2_2_3_b_tp_2}>
                                                {
                                                    <ReactQuill
                                                        placeholder='fegrkg'
                                                        onChange={handleBody}
                                                        value={body}
                                                        modules={
                                                            {
                                                                toolbar: [
                                                                    [
                                                                        { header: "1" },
                                                                        { header: "2" },
                                                                        { header: [3, 4, 5, 6] },

                                                                    ],
                                                                    [
                                                                        "bold",
                                                                        "italic",
                                                                        "underline",
                                                                        "strike",
                                                                        "blockquote"
                                                                    ],
                                                                    ["code-block"]
                                                                ]
                                                            }
                                                        }
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.right_side_3}>
                                            <div className={styles.right_side_2_1_1}>
                                                Խնդրում ենք գրեք նկարագրությունը
                                            </div>
                                            <div className={styles.right_side_2_2_3_b_tp}>
                                                {


                                                    <textarea value={questionDescText} onChange={(e) => setQuestionDescText(e.target.value)} ></textarea>
                                                }
                                            </div>
                                        </div>

                                        <div className={styles.right_side_3}>
                                            <div className={styles.right_side_2_1_1}>
                                                Խնդրում ենք տեղադրեք նկար
                                            </div>
                                            <div className={styles.right_side_2_2_3_b_tp}>
                                                <input name="file-input" className={styles.file_input__input} id="file-input" type="file" onChange={setImageFunc} accept="image/png, image/jpeg" />
                                                <label className={styles.file_input__label} htmlFor='file-input'>Upload file</label>
                                            </div>
                                            <div className={styles.right_side_2_2_3_b_tp_pic}>
                                                {

                                                    <img src={selectedImage ? selectedImage : ''} alt="" />
                                                }
                                            </div>
                                        </div>

                                        <div className={styles.right_side_4}>
                                            <div className={styles.right_side_2_1_1}>
                                                Խնդրում ենք գրեք պատասխանները
                                            </div>
                                            <div className={styles.right_side_3_2}>
                                                {

                                                    selectedRpValue === 'choose'
                                                        ?
                                                        <>
                                                            {
                                                                answerArr.map((val, ind) => {
                                                                    return (
                                                                        <>
                                                                            <div className={styles.right_side_3_2_t}>
                                                                                <div className={styles.right_side_2_1_2_1}>
                                                                                    {
                                                                                        ind === chckbxIndex
                                                                                            ?
                                                                                            <input checked onClick={() => setChckbxIndex(val.idNum)} type="radio" name='tstf' />

                                                                                            :
                                                                                            <input onClick={() => setChckbxIndex(val.idNum)} type="radio" name='tstf' />

                                                                                    }
                                                                                </div>
                                                                                <div onClick={() => deleteInpFunc(val.id)} className={styles.right_side_2_1_2_2_del}>
                                                                                    <FaRegTrashCan />
                                                                                </div>

                                                                                <div className={styles.right_side_2_1_2_2}>
                                                                                    {/* <input value={ind === 0 ? answersInputs.input0 : ind === 1 ? answersInputs.input1 : ind === 2 ? answersInputs.input2 : answersInputs.input3} onChange={handleAnswerInputChange} type="text" name={`input${val.id}`} /> */}
                                                                                    <input value={val.text} placeholder='Խնդրում ենք գրեք հարցի պատասխանը' type="text" onChange={(e) => changeInpTextFunc(e.target.value, val.id)} />
                                                                                </div>
                                                                                <div className={styles.right_side_2_1_2_3c_img_prt}>
                                                                                    <div className={styles.right_side_2_1_2_3c_img_prt_1}>
                                                                                        <input type="file" id={`file-input${ind}`} className={styles.file_input__input} onChange={(e) => setInpImageFunc(e, val.id)} accept="image/png, image/jpeg" />
                                                                                        <label className={styles.file_input__label_b} htmlFor={`file-input${ind}`}>Upload file</label>
                                                                                    </div>
                                                                                    <div className={styles.right_side_2_1_2_3c_img_prt_2}>
                                                                                        <img src={val.picture ? val.picture : pic} alt="" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            {/* <div> */}
                                                            <div onClick={() => addInput()} className={styles.right_side_2_1_2_2_del}><FaPlus /></div>
                                                            {/* </div> */}
                                                        </>

                                                        :
                                                        selectedRpValue === 'short'
                                                            ?
                                                            <div className={styles.right_side_4_sq}>
                                                                {
                                                                    ansSecArr.map((val, ind) => {
                                                                        let propertyName = `input${val.id}`
                                                                        return (
                                                                            <div className={styles.test_content_third_content_4_1_1_2_1}>
                                                                                <input onChange={handleSecAnswerInputChange} id={`inp${ind}`} onInput={() => {

                                                                                    document.getElementById(`inp${ind + 1}`)?.focus()

                                                                                }} value={secTypeQsAnswers[propertyName]} type="text" name={`input${val.id}`} maxLength={1} className={styles.txtinp} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            :
                                                            selectedRpValue === 'shortandvariant'

                                                                ?
                                                                <div className={styles.right_side_4_sq}>

                                                                    <div className={styles.right_side_4_sq_e}>




                                                                        <div className={styles.right_side_4_sq_e}>
                                                                            {
                                                                                thirdTypeQsAnswers === 'yes'
                                                                                    ?
                                                                                    <>

                                                                                        <div>
                                                                                            <div>
                                                                                                Ճիշտ է
                                                                                            </div>
                                                                                            <div>

                                                                                                <input checked type="radio" name='1' onClick={() => setThirdTypeQsAnswers('yes')} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div>
                                                                                            <div>
                                                                                                Սխալ է
                                                                                            </div>
                                                                                            <div>
                                                                                                <input type="radio" name='1' onClick={() => setThirdTypeQsAnswers('no')} />
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                    :
                                                                                    <>

                                                                                        <div>
                                                                                            <div>
                                                                                                Ճիշտ է
                                                                                            </div>
                                                                                            <div>

                                                                                                <input type="radio" name='1' onClick={() => setThirdTypeQsAnswers('yes')} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div>
                                                                                            <div>
                                                                                                Սխալ է
                                                                                            </div>
                                                                                            <div>
                                                                                                <input type="radio" name='1' onClick={() => setThirdTypeQsAnswers('no')} />
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                            }


                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                :
                                                                selectedRpValue === 'shortbtype'

                                                                    ?
                                                                    <div>
                                                                        <input value={forthTypeBQsAnswers} type="text" onChange={(e) => setForthTypeQsAnswers(e.target.value)} />
                                                                    </div>
                                                                    :

                                                                    null
                                                }





                                            </div>
                                        </div>
                                        <div className={styles.right_side_5}>
                                            <div className={styles.right_side_5_1}>
                                                <div className={styles.right_side_5_1_1}>
                                                    <span>Հարցերի քանակը</span>
                                                    {
                                                        selectedRpValue === 'choose'
                                                            ? firstQuestType.length
                                                            : selectedRpValue === 'short'
                                                                ? secondQuestType.length
                                                                : selectedRpValue === 'shortandvariant'
                                                                    ? thirdQuestType.length
                                                                    :
                                                                    selectedRpValue === 'shortbtype'
                                                                        ?
                                                                        forthQuestType.length
                                                                        :
                                                                        null
                                                    }
                                                </div>
                                            </div>

                                            {
                                                loadCompHk
                                                    ?
                                                    <div className={styles.login_content_text_item_loader}>
                                                        <img src={loader} />
                                                    </div>
                                                    :
                                                    null
                                            }

                                            <div className={styles.right_side_5_2}>
                                                {
                                                    isUpdateQuestion
                                                        ?
                                                        <button onClick={() => sendNewQuestion(false)}>Թարմացնել հարցը</button>
                                                        :

                                                        <button onClick={() => sendNewQuestion(true)}>Ավելացնել</button>
                                                }
                                            </div>
                                            <div className={styles.right_side_5_2}>
                                                <button onClick={() => {
                                                    setIsShow(true)
                                                    setIsUpdateQuestion(false)
                                                    setQuestionUpdateText(null)
                                                    setBody('')
                                                    setPointAns('0.25')
                                                    setQuestionText('')
                                                    setQuestionDescText('')
                                                    setChckbxIndex(0)
                                                    setForthTypeQsAnswers('')
                                                    setThirdTypeQsAnswers('yes')
                                                    setSelectedImage('')
                                                    setSelectedVRpalue('choose')
                                                    setSelectedVLvlalue('a');
                                                    setSecTypeQsAnswers({
                                                        input0: '',
                                                        input1: '',
                                                        input2: '',
                                                        input3: '',
                                                        input4: '',
                                                    })
                                                    setAnswerArr([
                                                        {
                                                            id: uuidv4(),
                                                            idNum: 0,
                                                            text: '',
                                                            picture: ''
                                                        },
                                                        {
                                                            id: uuidv4(),
                                                            idNum: 1,
                                                            text: '',
                                                            picture: ''
                                                        },
                                                        {
                                                            id: uuidv4(),
                                                            idNum: 2,
                                                            text: '',
                                                            picture: ''
                                                        },
                                                        {
                                                            id: uuidv4(),
                                                            idNum: 3,
                                                            text: '',
                                                            picture: ''
                                                        }
                                                    ])
                                                }}>Չեղարկել</button>
                                            </div>
                                        </div>
                                    </div >


                                </>
                        }
                    </Col>
                </Row>
            ),
        },

    ];

    return (
        <>
            <div className={styles.test_content}>

                <div className={styles.test_content_title}>
                    {currentExamName}
                </div>


                <Tabs
                    // tabPosition={'left'}
                    items={items}
                    type="card"
                    style={{ width: '100%', paddingTop: '3em' }}
                >
                    {items.map(item => (
                        <TabPane tab={item.key} key={item.key} >
                            {item.children}
                        </TabPane>
                    ))}
                </Tabs>

            </div>
            <div className={styles.create_button_contents}>
                <div className={styles.create_button_contents_loader}>
                    {
                        !loadComp
                            ?
                            null
                            :
                            <div className={styles.login_content_text_item_loader}>
                                <img src={loader} alt="" />
                            </div>
                    }
                </div>

                <button onClick={() => {
                    navigate('/admin')
                }}>Չեղարկել</button>
                {
                    isuporNot
                        ?
                        <button onClick={updateExam}>Թարմացնել</button>

                        :
                        <button onClick={createExam}>Ստեղծել</button>



                }

            </div>
        </>
    )
}

export default TestComp