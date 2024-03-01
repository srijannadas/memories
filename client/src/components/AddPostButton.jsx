// AddPostButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AddPostButton = ({ onClick, isAuthenticated }) => {
  return (
    isAuthenticated && (
      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 bg-blue-500 p-4 rounded-full text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    )
  );
};

export default AddPostButton;
