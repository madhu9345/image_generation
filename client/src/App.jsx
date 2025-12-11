import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo, dalle } from './assets';
import { Home, CreatePost } from './pages';
import './index.css';

const App = () => {
  return (<BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img
          src={dalle}
          alt="logo"
          className="w-20 object-contain rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 shadow-md hover:scale-105 transition"
        />


      </Link>
      <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
        Create
      </Link>
    </header>
    <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/create-post' element={<CreatePost></CreatePost>}></Route>
      </Routes>

    </main>
  </BrowserRouter>)
};

export default App;
