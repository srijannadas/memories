import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ3YTY5OGU3Mzc4Yzk3N2QxNDEzNmEiLCJpYXQiOjE3MDg2MzE3MzR9.EZQTq8S8NkvFYcEI5J4KVREuXq2WtiXQVKVf6_Bxi18'); // Replace with a valid JWT token

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/image/upload', {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
        // You can handle further actions, such as updating the UI or redirecting the user.
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" className='form-control' onChange={handleImageChange} />
      <button onClick={handleUpload} className='btn btn-primary'>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
