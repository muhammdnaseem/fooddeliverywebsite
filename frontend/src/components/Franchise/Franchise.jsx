import React, { useContext, useState } from 'react';
import './Franchise.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Container, Button } from 'react-bootstrap';
import { assets } from './../../assets/assets';

const Franchise = () => {
  const { updateUserDetails } = useContext(StoreContext);
  const navigate = useNavigate();

  // Initialize form data without user information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '', // Message field
  });

  // State to track focus on inputs
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    message: false,
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
    // Optionally, you can navigate or show a success message
    navigate('/success'); // Example navigation after successful submission
  };

  return (
    <Container className='w-50 py-5 mt-3'>
      <form onSubmit={handleSubmit}>
        <section className="contact-us-section text-center">
          <img src={assets.contact_us} alt="Logo" className="contact-us-image p-4" />
          <h2 className='text-start'>Get In Touch</h2>
          <h3 className='text-start'>We are here for you, how can I help you!</h3>

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

          <div className="input-container">
            <label className={focus.message || formData.message ? "floating-label" : "d-none"}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              placeholder='Your message...'
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={() => handleBlur('message')}
              required
              className={focus.message || formData.message ? "textarea-focused" : ""}
            />
          </div>

          <Button type="submit" variant='warning' className="header-button">Submit</Button>
        </section>
      </form>
    </Container>
  );
};

export default Franchise;
