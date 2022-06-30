import React from 'react';
import './Card.css';
import Modal from '../Modal/Modal';
import Control from '../Control/Mark';
import speaker from './images/speaker.png';
import edit from './images/edit.png';
import trash from './images/trash.png';
import {Dictionary } from '../../types/dictionaryTypes';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { sendDeletedWord } from '../../api/api'


interface PropsType {
    setWords: (x: any) => void;
    words: Dictionary
    index: number,
    setIndex: (x: any) => void

}

const Card: React.FC<PropsType> = ({setWords, words, index, setIndex }) => {

    const [show, setShow] = useState(false);
    const path = useLocation().pathname;
    const divRef = React.useRef<HTMLDivElement | null>(null);

 
    function handleModalOpen(e: React.MouseEvent) {
        e.stopPropagation();
        setShow(true);
    }

    const handleModalClose = (e: React.MouseEvent) => {
        const value = (e.target as HTMLInputElement).className;
        if (value === 'img-modal-close') {
            setShow(false);
        }
    };

    function voiсe(e: React.MouseEvent) {
        e.stopPropagation()
        const utterance = new SpeechSynthesisUtterance(words[index].englishVersion)
        utterance.lang = 'en-GB';
        utterance.volume = 1
        return speechSynthesis.speak(utterance)
    }

    function toggleCard() {
        if (divRef !== null) {
            divRef.current?.classList.toggle('is-flipped')
        }
    }


    function deleteCard(e: React.MouseEvent) {
        e.stopPropagation();
        setWords((prev: Dictionary) => prev.filter(i => i.id !== words[index].id))
        if (words[index] === words[words.length - 1]) {
            setIndex(0)
        }
        sendDeletedWord(words[index])

    }

    return (
        <div className='wrapper-card'>
            <Control word={words[index]} setWords={setWords} />
            <div className='scene'>
                <div ref={divRef} className='card' onClick={toggleCard}>

                    <div className="card__face card__face--front" >

                        <div className='card-control'>
                        {path === '/learnWords' && <img src={speaker} alt='speker' onClick={voiсe} />}
                            <img src={trash} alt='' onClick={deleteCard} />
                            <img src={edit} alt='edit' onClick={handleModalOpen} />
                        </div>

                        <div className='card-speaker'>
                            {path === '/repeatWords' ? <p> {words[index].rusVersion}</p> : <p>{words[index].englishVersion}</p>}
                           
                        </div>
                    </div>


                    <div className="card__face card__face--back" >

                        <div className='card-control'>
                        {path === '/repeatWords' && <img src={speaker} alt='speaker' onClick={voiсe} />}
                          
                            <img src={trash} alt='' onClick={deleteCard} />
                            <img src={edit} alt='editor' onClick={handleModalOpen} />
                        </div>
                        <div className='card-speaker'>
                            {path === '/repeatWords' ? <p> {words[index].englishVersion}</p> : <p>{words[index].rusVersion}</p>}
                          
                        </div>
                    </div>
                </div>
            </div>
            <Modal words={words} index={index} show={show} closeModal={handleModalClose} setWords={setWords} />
        </div>
    )
};

export default Card;