import React from "react"
import { useState } from 'react'
import './TouchKeypad.css';

const TouchKeypad = ({placeholder,value,setValue,onEnter}) => {
    const [alpha,setAlpha] = useState([
        "a","b","c","d","e",
        "f","g","h","i","j",
        "k","l","m","n","o",
        "p","q","r","s","t",
        "u","v","w","x","y",
        "z"
    ])  

    const [shiftStatus,setShiftStatus] = useState(false)

    const eraseChar = ()=>{
        setValue(value.substring(0,value.length - 1))
    }

    const shiftKeyboard = () => {
        if(shiftStatus === false){
            setAlpha(alpha.map(letter=>letter.toUpperCase()))
            setShiftStatus(true)
        }else{
            setAlpha(alpha.map(letter=>letter.toLocaleLowerCase()))
            setShiftStatus(false)
        }
    }

    return <div className="touch_keypad">
        <div className="touch_keypad_placeholder">{!value && placeholder}</div>
        <div>{value && value}</div>
        <br></br>
        <div className="touch_keypad_components">
            <div className="touch_keypad_left_components">
                <button onClick={shiftKeyboard}>SHIFT</button>
            </div>
            <div>
                {   alpha.map((letter,letter_index)=><button onClick={e=>setValue(value + letter)} className="keypad_key" key={letter_index}>{letter}</button>)}
            </div>
            <div className="touch_keypad_right_components">
                <button className="touch_keypad_delete_key" onClick={eraseChar}>
                    DEL
                </button>
                <button onClick={onEnter}>ENTER</button>
            </div>
        </div>
    </div> 
}

export default TouchKeypad