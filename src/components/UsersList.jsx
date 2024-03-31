import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';
import Navbar from './Navbar';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div className="users-list-container">
      <h1 className="users-list-heading">Users List</h1>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div>
                <h2>{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Creation Date:</strong> {new Date(user.creationAt).toLocaleString()}</p>
                <p><strong>Updated Date:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default UsersList;
