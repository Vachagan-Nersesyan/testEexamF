export interface InitialStateType {
    loading: boolean,
    error: string | null
}

export interface AnwersArrType {
    questNum: number,
    answer?: number | null,
    answerYesOrNot?: string| null,
    answerBtype?: string| null,
    shortAnswers?: string| null

}