import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import AddingWord from './components/AddingWord/AddingWord';
import Learn from './components/Learn/Learn';
import Repeat from './components/Repeat/Repeat';

const App: React.FC = () => {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<AddingWord />} ></Route>
          <Route path='/repeatWords' element={<Repeat />}></Route>
          <Route path='/learnWords' element={<Learn />}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
