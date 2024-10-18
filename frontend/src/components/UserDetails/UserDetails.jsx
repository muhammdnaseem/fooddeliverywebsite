import React, { useContext, useState } from 'react';
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Container } from 'react-bootstrap';

const UserDetails = () => {
  const { userDetails, setToken, updateUserDetails } = useContext(StoreContext);
  const navigate = useNavigate();
console.log(userDetails);
console.log(userDetails); // Debugging

const user = userDetails && Object.keys(userDetails).length > 0 ? userDetails : null;


  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    mobile: '',
    password: '',
    currentpassword: '',
    card: '1234 6789 1234 6789',
  });

  // State to track focus on inputs
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
    currentpassword: false,
    card: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (name) => {
    setFocus({ ...focus, [name]: true });
  };

  const handleBlur = (name) => {
    setFocus({ ...focus, [name]: !!formData[name] });
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
    <Container fluid className='my-5 py-5'>
      {user ? (
        <Container className='w-50'>
          <form onSubmit={handleSubmit}>
            <section className="section">
              <h2>My Account <i>ⓘ</i></h2>
              <div className="input-container">
                <label className={focus.name || formData.name ? "floating-label" : "d-none"}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder='Name'
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                />
              </div>
              <div className="input-container">
                <label className={focus.mobile || formData.mobile ? "floating-label" : "d-none"}>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder='Mobile Number'
                  value={formData.mobile}
                  onChange={handleChange}
                  onFocus={() => handleFocus('mobile')}
                  onBlur={() => handleBlur('mobile')}
                />
              </div>
              <button className="save-btn" type="submit">Save</button>
            </section>

            <section className="section">
              <h2>Email</h2>
              <div className="input-container">
                <label className={focus.email || formData.email ? "floating-label" : "d-none"}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                />
              </div>
              <div className="button-group">
                <button className="change-btn" type="button">Change</button>
                <button className="save-btn" type="submit">Save</button>
              </div>
            </section>

            <section className="section">
              <h2>Password</h2>
              <div className="input-container">
                <label className={focus.password || formData.password ? "floating-label" : "d-none"}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
              </div>
              <div className="input-container">
                <label className={focus.currentpassword || formData.currentpassword ? "floating-label" : "d-none"}>Current Password</label>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={formData.currentpassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('currentpassword')}
                  onBlur={() => handleBlur('currentpassword')}
                />
              </div>
              <button className="save-btn" type="submit">Save</button>
            </section>

            <section className="section">
              <h2>Payment Method</h2>
              <div className="input-container">
                <label className={focus.card || formData.card ? "floating-label" : "d-none"}>Debit Card</label>
                <input
                  type="text"
                  name="card"
                  placeholder='Debit Card'
                  value={formData.card}
                  onChange={handleChange}
                  onFocus={() => handleFocus('card')}
                  onBlur={() => handleBlur('card')}
                />
              </div>
              <div className="button-group">
                <button className="change-btn" type="button">Change</button>
                <button className="save-btn" type="submit">Save</button>
              </div>
            </section>
          </form>
          {/* <button className="logout-btn" onClick={logout}>Logout</button> */}
        </Container>
      ) : (
        <p>No user details available.</p>
      )}
    </Container>
  );
};

export default UserDetails;
