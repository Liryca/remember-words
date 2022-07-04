import React from 'react';
import './DeleteModal.css';
import { Dictionary } from '../../types/dictionaryTypes';
import { sendDeletedWord } from '../../api/api'

interface PropsType {
    words: Dictionary;
    setWords: (x:any) => void;
    index: number
    setIndex: (x: number) => void
    show: boolean;
    setShow: (x: boolean) => void;
    closeModal: (x: React.MouseEvent) => void;
}


const DeleteModal: React.FC<PropsType>= ({ words, setWords,  index,setIndex, show, setShow, closeModal}) => {
    

    function deleteCard(e: React.MouseEvent) {
        e.stopPropagation();
     
        setWords((prev: Dictionary) => prev.filter(i => i.id !== words[index].id))
        if (words[index] === words[words.length - 1]) {
            setIndex(0)
        }
        setShow(false)
        sendDeletedWord(words[index]); 
    }

    return (
        <div className='delete-modal'>
        <div className='wrapper-delete-modal' hidden={!show}>
                <div className="delete-modal-background">
                    <div className='delete-modal-card'>
                    <h2>You want to delete the card?</h2>
                    <button className='delete-modal-button' onClick={deleteCard}>Yes</button>
                    <button className='delete-modal-button' onClick={closeModal}>No</button>
                    </div>
                  
                {/* <img className='img-modal-close' src={close} alt="close" /> */}
            </div>
        </div>
    </div>
    );
};

export default DeleteModal;