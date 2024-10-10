import React, { useContext, useState } from 'react';
import './UserDetails.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const UserDetails = () => {
  const { userDetails, setToken, updateUserDetails } = useContext(StoreContext);
  const navigate = useNavigate();

  const user = userDetails.length > 0 ? userDetails[0] : null;

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(formData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className='profile'>
      {user ? (
        <div className="user-details">
          <h1>Edit User Details</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Verified:</label>
              <span>{user.isVerified ? "Yes" : "No"}</span>
            </div>
            <button type="submit">Update</button>
          </form>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
}

export default UserDetails;
