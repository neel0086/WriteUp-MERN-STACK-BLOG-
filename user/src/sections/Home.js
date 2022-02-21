
import React from 'react'
import Categories from './Categories';
import NavOpt from './NavOpt';
import Pic from './Pic';
function Home() {
  return (
    <>
        <Pic />
        <div style={{padding:'12px'}}>
        <NavOpt />
          <Categories />
          </div>
    </>
  )
}

export default Home