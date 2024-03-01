// UsersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
            <Link key={user._id} to={`/${user.username}`}>
          <a class="group relative block bg-black">
          <img
            alt=""
            src="https://source.unsplash.com/random/?user"
            class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />
        
          <div class="relative p-4 sm:p-6 lg:p-8">
        
            <p class="text-xl font-bold text-white sm:text-2xl">{user.username}</p>
        
            <div class="mt-32 sm:mt-48 lg:mt-64">
              <div
                class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <p class="text-sm text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
                  quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
                </p>
              </div>
            </div>
          </div>
        </a>
        </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default UsersPage;
