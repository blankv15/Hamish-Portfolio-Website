import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import profilePic from '../src/assets/profile.png'
import { Card } from '@mantine/core';
import DisplayCard from './components/DisplayCard';
import SomeData from './assets/data/someData.json';
import TabSection from './components/TabSection';

function App(SomeData) {
  const [count, setCount] = useState(0)

  const cardInfo = SomeData;

  return (
    <>


      <div className='hero'>
        <img className='Profile-Pic' src={profilePic} />
        <h1 className='heroText'>Hey, I'm <span className='name'>Hamish Chhagan.</span> I Like to build Things. Here you can find my latest work and what I'm doing at the moment</h1>

      </div>

      <div className='current-projects'>
        <h2>Recent Projects</h2>
        <div className="card-grid-container">

            <DisplayCard 
              image_url="https://picsum.photos/300/160"
              title="Norway Fjord Adventures"
              description="With Fjord Tours you can explore more of the magical fjord lndscapes with tours and activities on and around the fjords of Norway"
              buttonText="Read More"
              
              />
                          <DisplayCard 
              image_url="https://picsum.photos/300/160"
              title="Norway Fjord Adventures"
              description="With Fjord Tours you can explore more of the magical fjord lndscapes with tours and activities on and around the fjords of Norway"
              buttonText="Read More"
              
              />
                          <DisplayCard 
              image_url="https://picsum.photos/300/160"
              title="Norway Fjord Adventures"
              description="With Fjord Tours you can explore more of the magical fjord lndscapes with tours and activities on and around the fjords of Norway"
              buttonText="Read More"
              
              />
        </div>




        
      </div>


      <div>
        <h2>My Skills</h2>
        <TabSection/>

      </div>


    </>
  )
}

export default App
