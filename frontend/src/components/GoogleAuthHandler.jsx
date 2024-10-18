// components/GoogleAuthHandler.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        try {
          const response = await axios.post('http://localhost:5000/api/user/auth/google', { code });
          
          if (response.data.success) {
            // Save token and navigate to dashboard or home
            localStorage.setItem('token', response.data.token);
            navigate('/'); // Redirect to home or dashboard
          } else {
            alert('Google authentication failed!');
            navigate('/'); // Redirect back to login if authentication fails
          }
        } catch (error) {
          console.error('Error during Google authentication:', error);
          alert('Authentication error, please try again!');
          navigate('/');
        }
      } else {
        navigate('/'); // Redirect if no code in the URL
      }
    };

    handleGoogleAuth();
  }, [location, navigate]);

  return <p>Authenticating...</p>;
};

export default GoogleAuthHandler;
