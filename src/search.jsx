import React, {useState} from 'react'
import axios from 'axios'

let Search = (props) => {
  const [query, setQuery] = useState('')
  const [queries, setQueries] = useState([])

  const handleChange = (e) =>{
    setQuery(e.target.value);
  }

  const handleSubmit = () => {
    axios.get(`https://api.datamuse.com/words?sp=${str}`)
      .then((res) => {
        let data = res.data;
        let temp = [];
        data.word.forEach((word) => {
          temp.push(word);
        })
        return temp
      })
      .then((words) => {
        setQueries(words);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange}required></input>
      </form>
      <div>
        {queries.length > 0 ? queries : ''}
      </div>
      <h1>HELLO?</h1>
    </div>
  )
}

export default Search