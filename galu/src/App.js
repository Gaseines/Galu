import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';

import { db } from './db'

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Menu />
      
    </div>
  );
}

export default App;
