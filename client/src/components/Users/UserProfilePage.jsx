import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header';

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/${username}`);
        console.log(response.data);
        setUser(response.data.user);
        // Check if the current user is already following this user
        // You need to implement this endpoint on your backend
        const followDataResponse = await axios.get(`http://localhost:5000/user/followData/${username}`);
        setIsFollowing(followDataResponse.data.isFollowing);
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

  const handleFollow = async () => {
    try {
      // Toggle follow status by sending a POST request to follow/unfollow endpoint
      const response = await axios.post(`http://localhost:5000/user/${isFollowing ? 'unfollow' : 'follow'}`, {
        username: user.username // Assuming you need to send the username of the user to follow/unfollow
      });
      setIsFollowing(!isFollowing); // Update local state after successful follow/unfollow
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
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
