import { createContext, useState } from 'react';

export const WordContext = createContext();

const WordContextProvider = (props) => {
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [incorrectLocation, setIncorrectLocation] = useState([]);

    return (
        <WordContext.Provider
            value={
                {
                    correctLetters, setCorrectLetters, wrongLetters, setWrongLetters,
                    incorrectLocation, setIncorrectLocation
                }
            }>
            {props.children}
        </WordContext.Provider>
    )
}

export default WordContextProvider