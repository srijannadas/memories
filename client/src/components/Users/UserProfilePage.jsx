import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/${username}`);
        setUser(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/${username}/images`);
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchUserData();
    fetchUserImages();
  }, [username]);

  const handleFollow = async () => {
    console.log(user._id);
    try {
      if (isFollowing) {
        // Unfollow user
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/${user.username}/unfollow`);
        setIsFollowing(false);
      } else {
        // Follow user
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/${user.username}/follow`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };
  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">{user.username}'s Public Profile</h1>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Followers: {user.followerCount}</span>
          <span className="text-gray-500">Following: {user.followingCount}</span>
        </div>
        <button
          onClick={handleFollow}
          style={{
            backgroundColor: '#2471A3',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #1E40AF',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image._id} className="shadow-xl relative overflow-hidden flex items-center justify-center">
              <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${image.filename}`} alt={`Uploaded by ${user.username}`} className="object-cover object-center transition-transform transform hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
