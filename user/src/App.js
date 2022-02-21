
import './App.css';
import NavBar from './NavBar'
import Home from './sections/Home';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ViewBlog from './sections/ViewBlog';
import CreateBlog from './sections/CreateBlog';
import UpdateBlog from './sections/UpdateBlog';
import Saved from './sectionTwo/Saved';
import Auth from './sectionAuth/Auth';
import Register from './sectionAuth/Register';
function App() {
  return (
    <div className='App'>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Auth />}>
        </Route>
      </Routes> 
      <Routes>
        <Route path="/register" element={<Register />}>
        </Route>
      </Routes> 
      <Routes>
        <Route path="/home" element={<Home />}>
        </Route>
      </Routes> 
      <Routes>
        <Route path="/saved" element={<Saved />}>
        </Route>
      </Routes> 
      <Routes>
        <Route path="/viewblog/:id" element={<ViewBlog />}>
        </Route>
      </Routes>
      <Routes>
        <Route path="/updateblog/:id" element={<UpdateBlog />}>
        </Route>
      </Routes>
      <Routes>
        <Route path="/createblog" element={<CreateBlog />}>
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
