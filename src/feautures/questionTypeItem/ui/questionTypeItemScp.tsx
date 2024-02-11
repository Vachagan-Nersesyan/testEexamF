import React, { useEffect, useState } from 'react'
import styles from './questionTypeItemStl.module.css'
import { OwnProps } from './questionTypeItemTs.interface'

const QuestionTypeItem: React.FC<OwnProps> = ({ getWritenTestForthAnswers, questCount, val }) => {
    const initialInputsState: string[] = ['', '', '', '', '']; // Adjust the number of elements as needed

    // State to manage all input values
    const [getWritenTestForthAnswersHk, setGetWritenTestForthAnswersHk] = useState<any>(null)

    const [shortTypeQuestionItemNumbersNum, setShortTypeQuestionItemNumbersNum] = useState<number | null>(null)
    const [shortTypeQuestionItemNumbers, setShortTypeQuestionItemNumbers] = useState<string[]>(initialInputsState);

    // Event handler to update input values
    const setShortTypeQuestionItemNumbersFunc = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs = [...shortTypeQuestionItemNumbers];
        newInputs[index] = event.target.value;
        setShortTypeQuestionItemNumbers(newInputs);
    };

    useEffect(() => {
        if (getWritenTestForthAnswersHk) {

            getWritenTestForthAnswers(shortTypeQuestionItemNumbers.join(''), getWritenTestForthAnswersHk);
        }

    }, [shortTypeQuestionItemNumbers])

  

    return (
        <>
            {
                [...new Array(5)].map((val6, ind6) => {
                    let o = `input${ind6 + 1}`
                    return (
                        <>
                            <div className={styles.make_test_content_in_item_in_txt_content_s_item_2_1}>
                                <input
                                    id={`inppt${ind6}`}
                                    onInput={() => {

                                        document.getElementById(`inppt${ind6 + 1}`)?.focus()

                                    }}
                                    onChange={(e) => {
                                        console.log(shortTypeQuestionItemNumbers, initialInputsState, 'shortTypeQuestionItemNumbers,initialInputsState')
                                        setShortTypeQuestionItemNumbersFunc(ind6)(e);
                                        setGetWritenTestForthAnswersHk(e)
                                        // getWritenTestForthAnswers(shortTypeQuestionItemNumbers.join(''), e);
                                    }}
                                  
                                    value={shortTypeQuestionItemNumbers[ind6]}
                                    type="text"
                                    style={
                                        val.questionDescText.length > 20 || val.questionText.length
                                            ?
                                            {
                                                fontSize: '2.1em',
                                                width: '35%'

                                            }
                                            :
                                            {
                                                height: '15px',
                                                width: '55%'
                                            }
                                    }
                                    name={`${questCount}`} maxLength={1} className={styles.txtinp} />
                            </div>
                        </>
                    )
                })
            }
        </>
    )

}

export default QuestionTypeItem