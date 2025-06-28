import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import profilePic from '../src/assets/profile.png'
import { Card } from '@mantine/core';
import DisplayCard from './components/DisplayCard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <div className='hero'>
        <img className='Profile-Pic' src={profilePic} />
        <h1 className='heroText'>Hey, I'm <span className='name'>Hamish Chhagan.</span> I Like to build Things. Here you can find my latest work and what I'm doing at the moment</h1>

      </div>

      <div className='current-projects'>
        <h2>Current Projects</h2>
        <DisplayCard/>


        
      </div>


    </>
  )
}

export default App
