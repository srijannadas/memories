// AddPostModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set the root element for accessibility

const AddPostModal = ({ isOpen, onClose, onAddPost }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {navigate} = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleAddPost = async () => {
    try {
      // If you're using FormData to send files, create a FormData object
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Send a POST request to upload the image
      const response = await fetch('http://localhost:5000/image/upload', {
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the JWT token
        },
        body: formData,
      });

      if (response.ok) {
        // If the image is uploaded successfully, close the modal
        onClose();
        // You may also want to refresh the component that displays the images
        onAddPost();
        window.location.href = '/profile'
        
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Post Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
        },
      }}
    >
      <div>
        <h2 className="text-2xl mb-4">Add Post</h2>
        <form>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <button
            type="button"
            onClick={handleAddPost}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Add Post
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPostModal;
