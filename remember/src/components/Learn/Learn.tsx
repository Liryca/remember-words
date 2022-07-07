import { getWordsFromServer } from '../../api/api';
import { Word, Dictionary } from '../../types/dictionaryTypes';
import { useState, useEffect } from 'react';
import SwitchCards from '../SwitchCards/SwitchCards';
import Card from '../Card/Card';
import './Learn.css';

const Learn: React.FC = () => {

    const [index, setIndex] = useState(0)
    const [words, setWords] = useState<Dictionary>([]);
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {

        getWordsFromServer().then((w:Dictionary) => {
            setWords(w.filter((item: Word) => item.mark === false))
            setLoaded(!loaded)
        })


    }, [])

    if (loaded === false) {
        return  <div></div>
     }
   

    return (


        <div className='cards'>
            {
                words.length ?
                    <div>
                        <Card key={index} setWords={setWords} words={words} index={index} setIndex={setIndex} />
                        <SwitchCards index={index} setIndex={setIndex} words={words} setWords={setWords} selected='' />
                    </div>

                    : <div className='wrapper-cards-message'>
                        <h2>Add new words to continue</h2>
                        <div className='cards-message'>You learned all the cards</div>
                    </div>
            }


        </div>
    );
};

export default Learn;

