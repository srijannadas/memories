// ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

const Profile = ({isAuthenticated}) => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    window.location.href= '/login'
  }
  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/image/fetch', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`, // Include the JWT token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
        } else {
          console.error('Error fetching user images');
        }
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchUserImages();
  }, []);

  return (
    <>
    <Header/>
    {isAuthenticated ? (
    <div className="container mx-auto mt-8">
      <h2 className='text-2xl text-center font-bold my-3'>Hi, {localStorage.getItem('userName')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="shadow-xl relative overflow-hidden flex items-center justify-center">
            <img
              src={`http://localhost:5000/uploads/${image.filename}`}
              alt={`Image ${index + 1}`}
              className=" object-cover object-center transition-transform transform hover:scale-105 "
            />
          </div>
        ))}
      </div>
    </div>

    ): window.location.href = 'login'}
    </>
  );
};

export default Profile;
