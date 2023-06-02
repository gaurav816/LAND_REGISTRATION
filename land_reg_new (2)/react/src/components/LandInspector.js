import React from 'react'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom';
import RegisterLand from './RegisterLand';
import Explore from './Explore';

const LandInspector = (props) => {
  return (
    <>
    <Navbar isLandInspector={true} />
    <h1 className='text-center pt-4 pb-4'>REGISTER NEW LAND</h1>
    <Routes>
      <Route path='/' element={<RegisterLand myWeb3Api={props.myWeb3Api} account={props.account} />} />
      <Route path='/explore' element={<Explore myWeb3Api={props.myWeb3Api} account={props.account} isAdmin={true} />} />
    </Routes>
    </>
  )
}

export default LandInspector