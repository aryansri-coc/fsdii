import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{
    const fetchalldata = async() => {
      const rest = await fetch(`https://jsonplaceholder.typicode.com/todos`)
      const json = await rest.json()
      console.log(json)
    }
    fetchalldata()
  },[])
  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default App
