import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);


  const [name, setName] = useState("");
  useEffect(() => {
    console.log(name);
  }, [name]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json));
  }, []);


  return (
    <>
      <div> <h1>Hello click + for count +1</h1></div>
      <br />
      <br />
      <div> {count} </div>
      <div>
        <button onClick={() => setCount(count + 1)}> + </button>
        <button onClick={() => setCount(Math.max(0, count - 1))}> - </button>
        <input type="text" onChange={(e) => { setName(e.target.value) }} />
      </div>
    </>
  )
}

export default App
