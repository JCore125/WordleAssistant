import React, {useState} from 'react';
import axios from 'axios';

let Form = (props) => {
  const [one, setOne] = useState({letter: '', box: 'white'})
  const [two, setTwo] = useState({letter: '', box: 'white'})
  const [three, setThree] = useState({letter: '', box: 'white'})
  const [four, setFour] = useState({letter: '', box: 'white'})
  const [five, setFive] = useState({letter: '', box: 'white'})

  let yellows = [];
  let yellowMem = {};
  let misses = [];

  //let alphabet = props.alphabet;


  let handleSubmit = (e) => {
    e.preventDefault();
    let str = '';
    if(one.box !== 'green') {
      let color = prompt('What color was box one?');
      let temp = {...one};
      if(color === 'green'){
        temp.box = 'green';
        setOne(temp);
        str += one.letter;
      } else if(color === 'black') {
        misses.push(one.letter);
        str += '?';
      } else if(color === 'yellow') {
        yellows.push(one.letter);
        temp.box = 'yellow'
        yellowIndex(one.letter, 0);
        setOne(temp);
        str += '?';
      } else {
        str += '?';
      }
    } else{
      str += one.letter;
    }
    if(two.box !== 'green') {
      let color = prompt('What color was box two?');
      let temp = {...two};
      if(color === 'green'){
        temp.box = 'green';
        setTwo(temp);
        str += two.letter;
      } else if(color === 'black') {
        misses.push(two.letter);
        str += '?';
      } else if(color === 'yellow') {
        temp.box = 'yellow';
        setTwo(temp);
        yellowIndex(two.letter, 1);
        yellows.push(two.letter);
        str += '?';
      } else {
        str += '?';
      }
    } else {
      str += two.letter;
    }
    if(three.box !== 'green') {
      let color = prompt('What color was box three?');
      let temp = {...three};
      if(color === 'green'){
        temp.box = 'green';
        setThree(temp);
        str += three.letter;
      } else if(color === 'black') {
        misses.push(three.letter);
        str += '?';
      } else if(color === 'yellow') {
        temp.box = 'yellow'
        setThree(temp);
        yellowIndex(three.letter, 2);
        yellows.push(three.letter);
        str += '?';
      } else {
        str += '?';
      }
    } else{
      str += three.letter;
    }
    if(four.box !== 'green') {
      let color = prompt('What color was box four?');
      let temp = {...four};
      if(color === 'green'){
        temp.box = 'green';
        setFour(temp);
        str += four.letter;
      } else if(color === 'black') {
        misses.push(four.letter);
        str += '?';
      } else if(color === 'yellow') {
        temp.box = 'yellow'
        setFour(temp);
        yellowIndex(four.letter, 3);
        yellows.push(four.letter);
        str += '?';
      } else {
        str += '?';
      }
    } else{
      console.log('four is already green adding' + four.letter)
      str += four.letter;
    }
    if(five.box !== 'green') {
      let color = prompt('What color was box five?');
      let temp = {...five};
      if(color === 'green'){
        temp.box = 'green';
        setFive(temp);
        str += five.letter;
      } else if(color === 'black') {
        misses.push(five.letter);
        str += '?';
      } else if(color === 'yellow') {
        temp.box = 'yellow'
        setFive(temp);
        yellowIndex(five.letter, 4);
        yellows.push(five.letter);
        str += '?';
      } else {
        str += '?';
      }
    } else{
      str += five.letter
    }

    handleYellow(yellows);
    handleMiss(misses);
    handleAlphabet([...yellows, ...misses])
    query(str);
  }

  let query = (str) => {
    console.log(`I will now query for ${str}`)
    axios.get(`https://api.datamuse.com/words?sp=${str}`)
      .then((res) => {
        let keys = Object.keys(yellowMem);
        let data = res.data;
        let suggestions = ['Suggestions: '];
        for(let i = 0; i < data.length; i++){
          if(data[i].word.indexOf(' ') === -1){
            let noMisses = missCheck(misses, data[i].word);
            if(noMisses){
              let check = true;
              let word = data[i].word;
              if(keys.length > 0){
                //console.log('length larger than one')
                keys.forEach((letter) => {
                  if(word.indexOf(letter) === -1) {
                    //console.log(word + ' does not contain ' + letter )
                    check = false;
                  } else {
                    let idx = yellowMem[letter];
                    idx.forEach((index) => {
                      if(word.indexOf(letter) === index){
                        //console.log('index mismatch')
                        check = false;
                        return;
                      }
                    })
                  }
                })
              }
              if(check){
              suggestions.push(data[i].word)
              }
            }
          }
          //console.log(yellowMem)
        }
        props.setSuggestions(suggestions);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  let yellowIndex = (letter, idx) => {
    if(!yellowMem[letter]){
      yellowMem[letter] = [idx];
    } else{
      yellowMem[letter].push(idx);
    }
  }

  let missCheck = (letters, word) => {
    if(letters.length === 0) {
      return true;
    }
    for(let i = 0; i < letters.length; i++){
      if(word.indexOf(letters[i]) !== -1){
        return false;
      }
    }
    return true;


  }

  let handleMiss = ((letter) => {props.handleMiss(letter)});

  let handleYellow = ((letter) => {props.handleYellow(letter)});

  let handleAlphabet = ((letter) => {props.handleAlphabet(letter)});

  return(
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input className="wordBox" type="text" maxlength="1" style={{backgroundColor: one.box}}required onChange={(e) => {
          setOne({letter: e.target.value, box: 'blank'})
        }}/>
        <input className="wordBox" type="text" maxlength="1" style={{backgroundColor: two.box}} required onChange={(e) => {
          setTwo({letter: e.target.value, box: 'blank'})
        }}/>
        <input className="wordBox" type="text" maxlength="1" style={{backgroundColor: three.box}} required onChange={(e) => {
          setThree({letter: e.target.value, box: 'blank'})
        }}/>
        <input className="wordBox" type="text" maxlength="1" style={{backgroundColor: four.box}} required onChange={(e) => {
          setFour({letter: e.target.value, box: 'blank'})
        }}/>
        <input className="wordBox" type="text" maxlength="1" style={{backgroundColor: five.box}} required onChange={(e) => {
          setFive({letter: e.target.value, box: 'blank'})
        }}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Form;