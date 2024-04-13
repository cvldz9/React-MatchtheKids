import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import MatchGame from './components/matchgame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MatchGame />
      
    </>
  )
}

export default App
