import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.jsx';
import './index.css';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Register from './Pages/LoginSignUp/Register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "about" element = {<About />} />
         
          <Route path = "book" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
        </Route>
      </Routes>
      <Routes>
      <Route path = "Register" element = {<Register />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
)
