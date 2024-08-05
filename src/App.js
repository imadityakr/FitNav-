import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Home from './Home.js';
import Navbar from './Navbar.js';
import Services from './Services.js';
import About from './About.js';
import Contact from './Contact.js';
import Testimonials from './Testimonials.js';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/testimonials" element={<Testimonials/>}/>
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;