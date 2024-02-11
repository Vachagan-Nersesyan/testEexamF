import { SubjectExamType } from "entities/subjectR/subjectReducerTs.interface"

export interface InitialStateType {
    allInfo: AllInfoType,
    allInfoArr: Array<AllInfoAType>,
    wrongQuestArr: Array<AllInfoAType>,
    subjectName: string,
    examYear: number,
    examType: string,
    loading: boolean,
    error: string | null,
    allTests: Array<CategoryInfoType>,
    allTestsBeta: Array<CategoryInfoType>,
    testName: string,
    testhrt: Array<string>,
    isRnd: boolean,
    currentExamName: string,
    currentSubjectName: string | undefined,
    otherInfo: AllExamInfoType | null,
    allExamflInfo: null | SubjectExamType
}

export interface CategoryInfoType {
    id: number,
    category: string,
    questions: Array<CategoryInfoQuestType>
}

export interface CategoryInfoQuestType {
    id: number,
    questionType: Array<QuestionType>,
    uniqName: string
}


export interface AllExamInfoType {
    subjectName: string,
    examYear: number,
    examType: string,
    classNumber: string,
    teachersName: string
}

export interface AllInfoType {
    chooseAnswerQuest: string,
    shortAnswerQuest: string,
    shortAnswerBQuest: string,
    chooseAnswerBQuest: string,
    shortAnswerCQuest: string,
    shortAnswerDQuest: string,
    shortAnswerEQuest: string,

    wrongChooseAnswerQuest: string,
    wrongShortAnswerQuest: string
}


export interface AllInfoAType {
    id: number,
    countValue: string,
    selectedValue: string,
    isLoopEnd: boolean,
    lastIndex: number,
    initNumber: number,
    longName: string
}


export interface QuestionType {
    selectedRpValue: string,
    questionPoint: string,
    questionText: string,
    selectedImage?: string | null,
    questionDescText: string,
    selectedLvlValue: string,
    chckbxIndex?: number,
    answersInputs?: Array<AnswersInputsType>,
    secTypeQsAnswers?: SecTypeQsAnswersType,
    thirdTypeQsAnswers?: string,
    forthTypeBQsAnswers?: string
}

// export interface AnswersInputsType {
//     input0: string,
//     input1: string,
//     input2: string,
//     input3: string,
// }

export interface AnswersInputsType {
    id: string
    idNum: number,
    text: string,
    picture: string,
    // input2: string,
    // input3: string,
}


export interface SecTypeQsAnswersType {
    [key: string]: string,
    input0: string,

    input1: string,
    input2: string,
    input3: string,
    input4: string,
}

export interface ThirdTypeQsAnswersType {
    [key: string]: string,

    B: string,
    C: string,
    D: string,
}

export interface NewTestInfoType {
    [key: string]: string,
    building: string,
    resultNum: string,
    clssNum: string,
    arName: string,
    teachName: string,
    date: any,
    clssNm: string,

}