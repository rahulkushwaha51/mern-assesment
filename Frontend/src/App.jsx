import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Home from './component/home/Home'
import { useSelector } from 'react-redux'
function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);


  return (
    <>
      <Routes>
        <Route path='/home' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
