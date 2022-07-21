import React, {useState, useEffect} from 'react'
import Form from './form.jsx';
import Search from './search.jsx';

let App = (props) => {

  const [alphabet, setAlphabet] = useState('abcdefghijklmnopqrstuvwxyz');
  const [yellow, setYellow] = useState([]);
  const [suggestions, setSuggestions] = useState(['Suggestions: ']);
  const [miss, setMiss] = useState('');


  let handleYellow = (letter) => {
    //let tempA = alphabet;
    let tempY = [...yellow];
    letter.forEach((char) => {
     // tempA = tempA.replace(char, '');
      tempY.push(char);
    })
    //console.log('Yellow handle: ' + tempA);
    //setAlphabet(tempA);
    setYellow(tempY);
  }

  let handleMiss = (letter) => {
    //let tempA = alphabet;
    let tempM = miss;
    letter.forEach((char) => {
      //tempA = tempA.replace(char, '');
      tempM += char;
    })
    //console.log('Black handle: ' + tempA)
    //setAlphabet(tempA);
    setMiss(tempM);
  }

  let handleAlphabet = (letters) => {
    let temp = alphabet;
    letters.forEach((char) => {
      temp = temp.replace(char, '');
    })
    setAlphabet(temp);
  }

  return(
    <div className="page">
      <h1>JD's Wordle Assistant</h1>
      <Form  handleMiss={handleMiss}  handleYellow={handleYellow} suggestions={suggestions} setSuggestions={setSuggestions} handleAlphabet={handleAlphabet}/>
      <div><span>Yellows:</span>{yellow} </div>
      <div><span>Incorrect guesses:</span>{miss} </div>
      <div><span>Letters you have yet to use:</span> </div>
      <div>{alphabet}</div>
      <div>{suggestions.map((data, index) =>
      <div>
        {data}
      </div>
      )}
      <br></br>
      <div>Check a word database yourself! Use "?" for wildcards.</div>
      </div>
      <Search/>
    </div>
  )
}

export default App;