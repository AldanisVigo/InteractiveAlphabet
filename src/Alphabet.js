import './Alphabet.css';
import { useEffect, useState } from 'react'
import TouchKeypad from './TouchKeypad';
import { useSpeechSynthesis } from 'react-speech-kit';
import InteractiveAlphabet from './InteractiveAlphabet';
import { Link } from 'react-router-dom'
function App() {
  const [userName,setUserName] = useState()
  const { speak } = useSpeechSynthesis();
  const [showKeyboard, setShowKeyboard] = useState(true)
  const [showInteractiveAlphabet,setShowInteractiveAlphabet] = useState(false)
  const [timeRemaining,setTimeRemaining] = useState(60)
  const [firstRun,setFirstRun] = useState(false)

  const onEnterPressed = () => {
    setShowKeyboard(false)
    setShowInteractiveAlphabet(true)
    speak({text : "Welcome " + userName + ". You can click on any of the letters to hear the sound of the letter. Try it for one minute. Then I'll ask you to identify some letters."})
    
    setTimeRemaining(1)

    let curTime = timeRemaining;
    var timer = setInterval(()=>{
      curTime = curTime - 1;
      setTimeRemaining(curTime)
      if(curTime === 0){
        clearInterval(timer)
      }
    },1000)

    var to = setTimeout(()=>{
      speak({text : "Time's up. Now let's try identifying them by their name."})
      lettersQuiz();
    },60000)
  }
  
  const [alpha,setAlpha] = useState([
        "a","b","c","d","e",
        "f","g","h","i","j",
        "k","l","m","n","o",
        "p","q","r","s","t",
        "u","v","w","x","y",
        "z"
    ])  
  const [right,setRight] = useState([])
  const [wrong,setWrong] = useState([])
  const [curLetter,setCurLetter] = useState(alpha[Math.floor(Math.random() * alpha.length)])
  const [selected,setSelected] = useState(null)
  const [captureSelected,setCaptureSelected] = useState(false)
  const [sayLetter, setSayLetter] = useState(true)

  useEffect(()=>{
    let _curLetter = curLetter
    let _selected = selected
    var selectionTimer = setInterval(()=>{
      if(_selected !== null){
        if(_curLetter === _selected){
          console.log("Found it")
          speak({text : "Correct! That's the letter " + _selected})
          right.push(_selected)
          setSelected(null)
          let newLetter = alpha[Math.floor(Math.random() * alpha.length)]
          setCurLetter(newLetter)
          speak({text : "Now find me the letter " + newLetter})
        }else if(_curLetter !== _selected){
          speak({text : "Wrong! That's the letter " + _selected + ". Try again, which one is the letter " + _curLetter})
          wrong.push(_selected)
          setSelected(null)
        }
      }
    },100)

    return ()=>{
      clearInterval(selectionTimer)
    }
  },[selected,setSelected,speak,setCurLetter,curLetter,alpha,right,wrong])

  const [showWhatToWorkOn,setShowWhatToWorkOn] = useState(false)
  const [showSuccess,setShowSuccess] = useState(false)
  
  const lettersQuiz = () => {
    setSayLetter(false)
    speak({text : "Let's begin by finding the letter " + curLetter})
    setCaptureSelected(true)
    setTimeRemaining(60)
    let curTime = timeRemaining;
    
    var timer = setInterval(()=>{
      curTime = curTime - 1;
      setTimeRemaining(curTime)

      if(curTime === 0){
        clearInterval(timer)
        setCaptureSelected(false)
        setSayLetter(true)
      }
    },1000)



    setTimeout(()=>{
      speak({text : "Time's up. Let's do it again."})
      setSelected(null)
      setCurLetter(alpha[Math.floor(Math.random() * alpha.length)])
      const score = (right.length / (right.length + wrong.length)) * 100
      console.log(score)
      if(score < 50){
        setShowInteractiveAlphabet(true)
        speak({text : "You have some work to do."})
        speak({text : "You have to work on recognizing the highlighted letters"})
        setShowWhatToWorkOn(true)
        setSayLetter(true)
        setCaptureSelected(false)
      }else if(score < 70){
        speak({text : "You are almost there. Just a few more letters to remember and you'll be an alphabet genius."})
        speak({text : "You have to work on recognizing the highlighted letters"})
        setShowWhatToWorkOn(true)
        setSayLetter(true)
        setCaptureSelected(false)
      }else if(score >= 100){
        speak({text : "You did it!"})
        speak({text : "Now you know the entire alphabet. Now it's time to learn how to read whole words."})
        setShowWhatToWorkOn(false)
        setSayLetter(false)
        setCaptureSelected(false)
        setShowSuccess(true)
      }
    },60000)
  }

  const beginActivity = () => {
    setFirstRun(true)
    speak({text : "Welcome to the Interactive Alphabet. Please enter your name below, or have someone help you put your name below. Remember the letters of your name. Let's get started."})
  }

  if(firstRun == false){
    return <div className="begin">
      <div style={{display : 'grid', gridTemplateRows : '1fr 2fr'}}>
        <span>Let's get ready to learn the alphabet.</span>
        <button onClick={beginActivity}> Begin </button>
      </div>
    </div>
  }else{
    return <div className="App">
      <header>
        <div className="logo">
          <Link to="/">Back</Link> &nbsp;&nbsp;&nbsp;Interactive Alphabet
        </div>
      </header>
      {timeRemaining && timeRemaining + " seconds remaining."}<br/>
      {right && "Right Answers: " + right.length}<br/>
      {wrong && "Wrong Answers: " + wrong.length}<br/>
      {isNaN((right.length / wrong.length + right.length) * 100) ?"Score: " + 0 + "%" : "Score: " + (right.length/ (right.length + wrong.length)) * 100 + "%"}<br/>
      {showKeyboard && <TouchKeypad placeholder="Your Name" value={userName || ''} setValue={setUserName} onEnter={onEnterPressed}/>}
      {showInteractiveAlphabet && <InteractiveAlphabet sayLetter={sayLetter} captureSelected={captureSelected} setSelected={setSelected} wrong={wrong} showWhatToWorkOn={showWhatToWorkOn}/>}
      {showSuccess && <div>
        <h1>Congratulations! You did it! Now you know the entire alphabet.</h1>
      </div>}
      {/* {selected && selected} */}
    </div>
  }
}

export default App;
