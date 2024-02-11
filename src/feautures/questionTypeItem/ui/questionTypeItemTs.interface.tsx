import { QuestionType } from "entities/testR/testReducerTs.interface";

export interface OwnProps {
    getWritenTestForthAnswers: (shortAnswers: string | null, questNum: any) => void,
    questCount: number,
    val: QuestionType,
}