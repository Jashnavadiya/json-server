import React from 'react'
import ProductShowPage from './pages/ProductShowPage'
import AddProduct from './pages/AddProduct'
import {  Routes, Route } from "react-router-dom";
import Test from './pages/test';
import Nav from './Components/nav';

const App = () => {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<ProductShowPage/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/test" element={<Test/>}/>
        
      </Routes>
        
    </>
  )
}

export default App