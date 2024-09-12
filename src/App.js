import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Uploader from './components/uploader/Uploader';
import Blog from './components/blogs/blog1';
import { ImageProvider } from './context/ImageContext'; 

const App = () => {
  return (
    <ImageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploader" element={<Uploader />} />
          <Route path="/blog/:id" element={<Blog />} />
          </Routes>
      </Router>
    </ImageProvider>
  );
};

export default App;
