import { useMemo, useState } from 'react'
import Name from './Name'

const App = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  const memoizedNameValue = useMemo(() => {
    console.log('nameValue recalculated!');
    return name ? name.toUpperCase() : '';
  }, [name])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{ marginLeft: '10px' }}
      />
      <Name nameValue={memoizedNameValue} />
    </div>
  )
}

export default App
