import "./interactiveAlphabet.css"
import { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';

const InteractiveAlphabet = ({sayLetter,captureSelected,setSelected,showWhatToWorkOn,wrong}) => {
    const { speak } = useSpeechSynthesis();

    const [alpha,setAlpha] = useState([
        "a","b","c","d","e",
        "f","g","h","i","j",
        "k","l","m","n","o",
        "p","q","r","s","t",
        "u","v","w","x","y",
        "z"
    ])  
    
    const onLetterClick = (letter) => {
        if(sayLetter === true){
            speak({text: letter})
        }

        if(captureSelected === true){
            console.log("Selected the " + letter + " letter.")
            setSelected(letter)
        }
    }

    return <div className="interactive_alphabet">
        { alpha && alpha.map((letter,letter_index)=><button style={{ background : showWhatToWorkOn === true ? wrong.includes(letter) ? 'white' : 'black' : "black"}} className="interactive_alphabet_letter" onClick={e=>onLetterClick(letter)} key={letter_index}>{letter}/{letter.toUpperCase()}</button>)}
    </div>
}

export default InteractiveAlphabet