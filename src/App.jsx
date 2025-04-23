import React from 'react'
import { Routes, Route } from "react-router";
import History from './Pages/Home/History/History';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/history' element={<History />}/>

      </Routes>
    </div>
  )
}

export default App