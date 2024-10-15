import React, { useContext, useState } from 'react';
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const UserDetails = () => {
  const { userDetails, setToken, updateUserDetails } = useContext(StoreContext);
  const navigate = useNavigate();

  const user = userDetails.length > 0 ? userDetails[0] : null;

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    mobile: '',
    password: '',
    card: '1234 6789 1234 6789',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(formData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className="profile">
      {user ? (
        <div className="user-details">
          <form onSubmit={handleSubmit}>
            <section className="section">
              <h2>My Account <i>ⓘ</i></h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
              <button className="save-btn" type="submit">Save</button>
            </section>

            <section className="section">
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <div className="button-group">
                <button className="change-btn" type="button">Change</button>
                <button className="save-btn" type="submit">Save</button>
              </div>
            </section>

            <section className="section">
              <h2>Password</h2>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <input
                type="password"
                placeholder="Current Password"
              />
              <button className="save-btn" type="submit">Save</button>
            </section>

            <section className="section">
              <h2>Payment Method</h2>
              <input
                type="text"
                name="card"
                value={formData.card}
                onChange={handleChange}
                placeholder="Debit Card"
                readOnly
              />
            </section>
          </form>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default UserDetails;
