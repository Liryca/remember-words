import React from 'react';
import up from '../Control/images/up.png';
import down from '../Control/images/down.png';
import { Word,Dictionary } from '../../types/dictionaryTypes';
import { sendWordsToServerModifiedWord} from '../../api/api';



interface PropsType {
    word: Word,
    setWords: (x: any) => void
}

const Control: React.FC<PropsType> = ({ word, setWords }) => {
    

    async  function markWord() {
  
  await setWords((prev: Dictionary) => {
           return [...prev.map(i => {
               if (i.id === word.id) {
                   i.mark = !word.mark
                   return i
               }
               return i
           })]
          
       })
      
       sendWordsToServerModifiedWord(word)
       
   }

    return (
            <div className='control'>
                {!word.mark ?
                    <div className='status-false' onClick={markWord}>
                        <p>Don't show again</p>
                        <p>know</p>
                        <img className='upArrow' src={up} alt='up' />
                    </div> :
                    <div className='status-true' onClick={markWord}>
                        <p style={{ color: '#e04f4f' }}>know</p>
                        <img className='upArrow' src={down} alt='up' />
                        <p>Cancel status</p>
                    </div>
                }
            </div>
        );
    };

    export default Control;