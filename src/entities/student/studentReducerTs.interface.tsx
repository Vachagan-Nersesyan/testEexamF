import { QuestCountInfoType } from "entities/nTestR/nTestReducerTs.interface";
import { SubjectExamType } from "entities/subjectR/subjectReducerTs.interface";
import { AllExamInfoType, CategoryInfoType, NewTestInfoType } from "entities/testR/testReducerTs.interface";
import { AnwersArrType } from "entities/wTestR/wTestReducerTs.interface";

export interface InitialStateType {
    loading: boolean,
    error: string | null,

    numInfo: QuestCountInfoType,
    otherInfo: AllExamInfoType | null,

    allTests: Array<CategoryInfoType>,


    allExamExists: Array<SubjectExamType>,

    allAnswers: Array<AnwersArrType>,

    studentsAllInfo: Array<StudentsAllInfoType>,
    userUniqId: string,
    classCrntName: string

}

export interface StudentsAllInfoType {
    id: string,
    nameFirst: string,
    nameSecond: string,
    nameThird: string,

    classNumber: string,
    testNumber: number,
    isWriten: boolean,
    answersArr: Array<AnwersArrType>
}

export interface ShortTypeQuestionItemNumbersType {
    [key: string]: string;
    input1: string,
    input2: string,
    input3: string,
    input4: string,
    input5: string,
}