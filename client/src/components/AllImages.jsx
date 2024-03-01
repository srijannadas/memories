import React, { useState, useEffect } from 'react';

const AllImageGallery = () => {
  const [allImages, setAllImages] = useState([]);
  // const [token, setToken] = useState('your_jwt_token'); // Replace with a valid JWT token

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/image/fetch-all');

        if (response.ok) {
          const data = await response.json();
          setAllImages(data.images);
        } else {
          console.error('Failed to fetch all images');
        }
      } catch (error) {
        console.error('Error fetching all images:', error);
      }
    };

    fetchAllImages();
  }, []);

  return (
    <div>
      <h1>All Images</h1>
      <div className="row">
        {allImages.map((image, index) => (
          <div key={index} className="col-md-3 mb-3">
            <img
              src={`http://localhost:5000/uploads/${image.filename}`}
              alt={`Image ${index}`}
              className="img-fluid"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllImageGallery;
