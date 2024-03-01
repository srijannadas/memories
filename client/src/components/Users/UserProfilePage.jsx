
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header';

const UserProfilePage = () => {
  const {username} = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/${username}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/${username}/images`);
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchUserData();
    fetchUserImages();
  }, [username]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">{user.username}'s Public Profile</h1>

      <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image._id} className="shadow-xl relative overflow-hidden flex items-center justify-center">
            {/* Display image or other details */}
            <img src={`http://localhost:5000/uploads/${image.filename}`} alt={`Uploaded by ${user.username}`} className=" object-cover object-center transition-transform transform hover:scale-105 " />
            {/* Add more details or actions if needed */}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default UserProfilePage;
