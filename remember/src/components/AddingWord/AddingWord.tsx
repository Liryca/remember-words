import React from 'react';
import './AddingWord.css';
import Form from '../Form/Form';
import { getTranslatedWord, sendWordToServer } from '../../api/api';
import { useState } from 'react';

const AddingWord: React.FC = (): any => {

    const [newWord, setNewWord] = useState({
        englishVersion: '',
        rusVersion: '',
        example: '',
        mark: false,
        date: 0,
        id: 0
    });


    const [message, setMessage] = useState('')

    async function getResponse() {
        if (newWord.englishVersion) {
            getTranslatedWord(newWord).then(rusVersion =>
                setNewWord((prev) => ({
                    ...prev,
                    rusVersion: rusVersion.text[0]
                })));
        }
    }

 
    function addWord(e: React.ChangeEvent<HTMLInputElement>) {
        setNewWord((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            date: Date.now(),
            id: Date.now()

        }))


    }

    function submitWordNewWord() {
        if (newWord.englishVersion === '') {
            return
        }

        sendWordToServer(newWord).then(response => {
            if (response.status === 409) {
                setMessage('Dictinary have this word')
            } else {
                setMessage('Successfully')
            }
            console.log(response.status)


        })

        setNewWord({
            englishVersion: '',
            rusVersion: '',
            example: '',
            mark: false,
            date: 0,
            id: 0
        })

        setTimeout(() => setMessage(''), 1500)
    }

    return (
        <Form title='Add a new word' word={newWord} getResponse={getResponse} addWord={addWord} submitWord={submitWordNewWord} message={message} />

    )

}



export default AddingWord;