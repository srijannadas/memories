import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ3YTY5OGU3Mzc4Yzk3N2QxNDEzNmEiLCJpYXQiOjE3MDg2MzE3MzR9.EZQTq8S8NkvFYcEI5J4KVREuXq2WtiXQVKVf6_Bxi18'); // Replace with a valid JWT token

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/image/fetch', {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
        } else {
          console.error('Failed to fetch images');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [token]);

  return (
    <>
    <h1>User Images</h1>
      <div className="row">
      {images.map((image, index) => (
         <div key={index} className="col-md-3 mb-3">
        <img src={`http://localhost:5000/uploads/${image.filename}`} alt={`Image ${index}`} className='img-fluid'/>
        </div>
      ))}
    </div>
    </>
  );
};

export default ImageGallery;
