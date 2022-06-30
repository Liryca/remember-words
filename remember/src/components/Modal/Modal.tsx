import './Modal.css';
import React, { useState} from 'react';
import Form from '../Form/Form';
import close from './modalImg/close.png';
import { Dictionary} from '../../types/dictionaryTypes';
import { getTranslatedWord, sendWordsToServerModifiedWord} from '../../api/api';


interface PropsType {
    words: Dictionary;
    index: number
    show: boolean;
    closeModal: (x: React.MouseEvent) => void
    setWords: (x: any) => void


}

const Modal: React.FC<PropsType> = ({ words, index, show, closeModal, setWords }) => {

    const [message, setMessage] = useState('');

    async function getResponse() {

        if (words[index].englishVersion) {
            getTranslatedWord(words[index]).then(rusVersion =>
                setWords((prev: Dictionary) => {
                    return prev.map((w) => {
                        if (w.id === words[index].id) {
                            return {
                                ...words[index],
                                rusVersion: rusVersion.text[0]
                            }
                        } else {
                            return w
                        }
                    })

                }
                ));
        }
    }



  async function  addWord(e: React.ChangeEvent<HTMLInputElement>) {

        setWords((prev: Dictionary) => {
            return prev.map((w) => {
             if (w.id === words[index].id) {
                    return {
                        ...words[index],
                        [e.target.name]: e.target.value
                    }
             }
                else {
                    return w
                }

            })
        })


  }


    async function submitWord() {
        
       await sendWordsToServerModifiedWord(words[index]).then(response => {
            if (response.status === 201) {
                setMessage('Word changed successfully')
            }
            //  else {
            //     setMessage('Dictinary have this word')
            //     console.log(words)
            // }
        })

        // setTimeout(() => setMessage(''), 1500)
    }



    return (
        <div className='modal'>
            <div className='wrapper' hidden={!show}>
                <div className="modal-background" onClick={closeModal}  >
                    <img className='img-modal-close' src={close} alt="close" />
                    <Form title='Change a word' word={words[index]} addWord={addWord} getResponse={getResponse} submitWord={submitWord} message={message} />
                </div>
            </div>
        </div>

    );
};


export default Modal;