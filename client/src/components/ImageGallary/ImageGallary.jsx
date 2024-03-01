// ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Header';

const ImageGallery = ({}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images when the component mounts
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/image/fetch-all');
        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
        } else {
          console.error('Error fetching images');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-8">
      <h2 className='text-2xl text-center font-bold my-3'>Welcome to Memories App</h2>
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

    </>
  );
};

export default ImageGallery;
