import React from 'react';
import './Repeat.css';
import Card from '../Card/Card';
import SwitchCards from '../SwitchCards/SwitchCards';
import { useState, useEffect } from 'react';
import { getWordsFromServer } from '../../api/api';
import { Word } from '../../types/dictionaryTypes';


export const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
export const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
export const lastWeek = Date.now() - (6 * 86400000);



const Repeat: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [words, setWords] = useState<Word[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [selected, setselected] = useState('allTime');
    


    useEffect(() => {
        getWordsFromServer().then((data) => {
            setWords(data.filter((item: { mark: boolean }) => item.mark === true));
            setLoaded(!loaded);
        })
    }, [])


    
    speechSynthesis.speak(
        new SpeechSynthesisUtterance()
    );


    function sortedForDate(e: React.ChangeEvent<HTMLSelectElement>) {

        setselected(e.target.value);
        setIndex(0)

        getWordsFromServer().then(w => {
            if (e.target.value === 'lastMonth') {
                setWords(w.filter((word: Word) => word.date >= lastMonth).filter((item: { mark: boolean }) => item.mark === true))
            }
            else if (e.target.value === 'lastWeek') {
                setWords(w.filter((word: Word) => word.date >= lastWeek).filter((item: { mark: boolean }) => item.mark === true))
              
            }
            else if (e.target.value === 'lastYear') {
                setWords(w.filter((word: Word) => word.date >= lastYear).filter((item: { mark: boolean }) => item.mark === true))
            }
       
            else if(e.target.value==='allTime') {
                setWords(w.filter((item: { mark: boolean }) => item.mark === true))
            }
        })

    }

  
    return (
        <div className='cards'>
            <div className='select'>
                <select value={selected} onChange={sortedForDate}>
                    <option value="lastWeek">for the last week</option>
                    <option value="lastMonth">for the last month</option>
                    <option value="lastYear">for the last year</option>
                    <option value="allTime">during all this time</option>
                </select>
            </div>
            {words.length&&loaded ?
                <div>
                    <Card key={index} setWords={setWords} words={words} index={index} setIndex={setIndex}  />
                    <SwitchCards index={index} setIndex={setIndex} words={words} setWords={setWords} selected={selected}/>
                </div>
                :
                <div className='cards-message'>Mark the studied cards for further repetition</div>}

        </div>
    );
};

export default Repeat;


