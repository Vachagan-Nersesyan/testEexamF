import { NewTestInfoType, QuestionType } from "entities/testR/testReducerTs.interface"

export interface InitialStateType {
    loading: boolean,
    error: string | null,

    questCountInfo: QuestCountInfoType,
    allQuestTest: Array<QuestionType>,
    questInfo: NewTestInfoType
}

export interface QuestCountInfoType {
    [key: string]: string,

    thchoose: string,
    thshort: string,
    thshortanvariant: string,
    thshortb: string,
    thshortcctgry: string

}

export interface ForthTypeQsAnswersType {
    [key: string]: string,
    thchoose: string,

    thshort: string,
    thshortanvariant: string
    thshortb: string,
    thshortcctgry: string

}