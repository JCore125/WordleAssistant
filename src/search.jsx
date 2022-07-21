import React, {useState} from 'react'
import axios from 'axios'

let Search = (props) => {
  const [query, setQuery] = useState('')
  const [queries, setQueries] = useState([])

  const handleChange = (e) =>{
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("QUERYING" + query)
    axios.get(`https://api.datamuse.com/words?sp=${query}`)
      .then((res) => {
        let data = res.data;
        let temp = [];
        data.forEach((word) => {
          temp.push(word.word)
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
        <input type='text' onChange={handleChange}minlength="5" maxlength="5"required></input>
      </form>
      <div className="queries">
        {queries.length > 0 ? queries.map((item) => <div>{item}</div>) : ''}
      </div>
    </div>
  )
}

export default Search