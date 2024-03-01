import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import ImageUpload from './components/upload';
import ImageGallery from './components/ImageGallary/ImageGallary';
import AllImageGallery from './components/AllImages';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import AddPostButton from './components/AddPostButton';
import AddPostModal from './components/AddPostModal';
import UsersPage from './components/Users/Users';
import UserProfilePage from './components/Users/UserProfilePage';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'))

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddPost = (image) => {
    // Implement your logic for adding the post
    // You can use the image here
    console.log('Added post with image:', image);

    // After adding the post, close the modal
    closeModal();
  };
  const [isLoggedIn, setLoggedIn] = useState(false);

  

  const handleLogout = () => {
    // Clear the token from localStorage and update the login state
    localStorage.removeItem('token');
    setLoggedIn(false);
    
  };
  return (
    <>
    <BrowserRouter>
    <AddPostButton onClick={openModal} isAuthenticated={isAuthenticated} />
    <AddPostModal isOpen={isModalOpen} onClose={closeModal} onAddPost={handleAddPost} />
    <Routes>
      <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
      <Route path='/register' element={<Register setLoggedIn={setLoggedIn}/>}/>
      <Route path="/profile" element={<Profile  isAuthenticated={isAuthenticated}/> }/>
      <Route path="/" element={<ImageGallery isLoggedIn={isLoggedIn} onLogout={handleLogout}/> }/>
      <Route path="/users" element={<UsersPage/>}/>
      <Route path="/:username" element={<UserProfilePage/>} />
    </Routes>

    </BrowserRouter>

    
    </>
  );
}

export default App;
