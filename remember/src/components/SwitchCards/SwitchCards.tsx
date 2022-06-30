import React from 'react';
import right from '../SwitchCards/images/right.png';
import left from '../SwitchCards/images/left.png';
import { getWordsFromServer } from '../../api/api';
import { Dictionary, Word } from '../../types/dictionaryTypes';
import { useLocation } from 'react-router-dom';


export const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
export const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
export const lastWeek = Date.now() - (6 * 86400000);

interface PropsType {
    index: number;
    setIndex: (x: any) => void;
    words: Dictionary;
    setWords: (x: any) => void;
    selected: string



}

const SwitchCards: React.FC<PropsType> = ({ index, setIndex, words, setWords, selected }) => {

    const path = useLocation().pathname;



    function goForward() {
        if (index === words.length - 1) {
            setIndex(0);
            getWordsFromServer().then((w) => {
                console.log(selected)
                path === '/learnWords' ?
                    setWords(w.filter((item: { mark: boolean; }) => item.mark !== true)) :
                    selected === 'lastMonth' ? setWords(w.filter((word: Word) => word.date >= lastMonth).filter((item: { mark: boolean }) => item.mark === true)) :
                        selected === 'lastWeek' ? setWords(w.filter((word: Word) => word.date >= lastWeek).filter((item: { mark: boolean }) => item.mark === true)) :
                            selected === 'lastYear' ? setWords(w.filter((word: Word) => word.date >= lastYear).filter((item: { mark: boolean }) => item.mark === true)) :
                                setWords(w.filter((word: Word) => word.date >= lastMonth).filter((item: { mark: boolean }) => item.mark === true))

            })
        } else {
            setIndex((prev: number) => {
                return prev + 1
            })
        }
    }

    function goBackward() {
        if (index === 0) {
            setIndex(words.length - 1)
        } else {
            setIndex((prev: number) => {
                return prev - 1
            })
        }
    }

    return (
        <div className='cards-images'>
            {<img onClick={goBackward} src={left} alt='left'></img>}
            <p className='cards-amount'>{index + 1}/{words.length}</p>
            {<img onClick={goForward} src={right} alt='right'></img>}
        </div>

    );
};

export default SwitchCards;