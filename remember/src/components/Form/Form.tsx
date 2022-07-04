import React from 'react';
import { Word} from '../../types/dictionaryTypes';
import './Form.css';


interface PropsType {
    title:string
    word: Word;
    getResponse: () => void;
    addWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitWord: () => void;
    message: string;

}

const Form: React.FC<PropsType> = ({  title, word, getResponse, submitWord, message,addWord }) => {

    return (
        <div className='wrapper-form' >
            <p className='message'>{message}</p>

            <form className='form'>
                <h2>{title}</h2>
                <input aria-label="eng" className='form-input' value={word.englishVersion} type='text' name='englishVersion' placeholder="English" onChange={addWord}></input>
                <input aria-label="rus" className='form-input' value={word.rusVersion} type='text' name="rusVersion" placeholder="Russian" onChange={addWord}></input>
                <input aria-label="example" className='form-input' value={word.example} type='text' name="example" placeholder="Example" onChange={addWord}></input>

                <div className='dictionaryButtons'>
                    <button className='dictionaryButton' type='button' onClick={submitWord}>Add</button>
                    <button className='dictionaryButton' type='button' onClick={getResponse}>Translate</button>
                </div>
            </form>
        </div>
    );
};


export default Form;