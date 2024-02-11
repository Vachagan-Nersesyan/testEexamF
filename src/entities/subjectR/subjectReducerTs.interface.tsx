import { ForthTypeQsAnswersType } from "entities/nTestR/nTestReducerTs.interface"
import { AllExamInfoType, CategoryInfoType, NewTestInfoType } from "entities/testR/testReducerTs.interface"

export interface InitialStateType {
    loading: boolean,
    error: string | null,
    saveSubjectName: string,
    allExams: Array<SubjectType>
}

export interface SubjectType {
    subjectName: string,
    exams: Array<SubjectExamType>,
    date: any,
    picture: string,
    teacherName: string | undefined
}

export interface SubjectExamType {
    name: string,
    subjjectName: string,
    info: Array<CategoryInfoType>,
    otherInfo: NewTestInfoType,
    questionCount: ForthTypeQsAnswersType,
    textInfo: AllExamInfoType
}
