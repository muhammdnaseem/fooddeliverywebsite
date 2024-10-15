import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from './../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "" 
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currentState === 'Login') {
            newUrl += "/api/user/login";
        } else if (currentState === 'Forgot Password') {
            newUrl += "/api/user/forgotpassword";
            const response = await axios.post(newUrl, { email: data.email });

            if (response.data.success) {
                alert('Reset link sent to your email!');
                setCurrentState('Login'); 
            } else {
                alert(response.data.message || 'Something went wrong. Please try again.');
            }
            return;
        } else if (currentState === 'New Password') {
            newUrl += "/api/user/resetpassword";
            const response = await axios.post(newUrl, { newPassword: data.newPassword });
            if (response.data.success) {
                alert('Password reset successfully!');
                setCurrentState('Login');
            } else {
                alert(response.data.message || 'Something went wrong. Please try again.');
            }
            return;
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            if (currentState === 'Login') {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
                if (currentState === 'Forgot Password') {
                    setCurrentState('New Password'); 
                }
            }
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>

                {/* Tabs for Login and Sign Up */}
                <div className="login-popup-tabs">
                    <span className={currentState === 'Login' ? 'active' : ''} onClick={() => setCurrentState('Login')}>Login</span>
                    <span className={currentState === 'Sign Up' ? 'active' : ''} onClick={() => setCurrentState('Sign Up')}>Sign Up</span>
                </div>

                <div className="login-popup-inputs">
                    {currentState === 'New Password' ? (
                        <input 
                            name='newPassword' 
                            onChange={onChangeHandler} 
                            value={data.newPassword} 
                            type="password" 
                            placeholder='New Password' 
                            required 
                        />
                    ) : currentState === 'Forgot Password' ? (
                        <input 
                            name='email' 
                            onChange={onChangeHandler} 
                            value={data.email} 
                            type="email" 
                            placeholder='Your email' 
                            required 
                        />
                    ) : (
                        <>
                            {currentState === 'Sign Up' && (
                                <input 
                                    name='name' 
                                    onChange={onChangeHandler} 
                                    value={data.name} 
                                    type="text" 
                                    placeholder='Your name' 
                                    required 
                                />
                            )}
                            <input 
                                name='email' 
                                onChange={onChangeHandler} 
                                value={data.email} 
                                type="email" 
                                placeholder='Your email' 
                                required 
                            />
                            <input 
                                name='password' 
                                onChange={onChangeHandler} 
                                value={data.password} 
                                type="password" 
                                placeholder='Password' 
                                required 
                            />
                        </>
                    )}
                </div>

                <button type='submit'>
                    {currentState === 'Sign Up' ? 'Create Account' : currentState === 'Forgot Password' ? 'Send Reset Link' : currentState === 'New Password' ? 'Reset Password' : 'Login'}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the <a href="#">terms of use</a> & <a href="#">privacy policy</a></p>
                </div>

                {currentState === 'Login' ? (
                    <p className='login-popup-forgot' onClick={() => setCurrentState('Forgot Password')}>Forgot password?</p>
                ) : currentState === 'Forgot Password' ? (
                    <p className='login-popup-forgot' onClick={() => setCurrentState('Login')}>Back to Login</p>
                ) : currentState === 'New Password' ? (
                    <p className='login-popup-forgot' onClick={() => setCurrentState('Login')}>Back to Login</p>
                ) : null}

                <div className="login-popup-socials">
                    <img src={assets.fb_icon} alt="Facebook" />
                    <img src={assets.g_icon} alt="Google" />
                    <img src={assets.in_icon} alt="LinkedIn" />
                </div>
            </form>
        </div>
    );
};

export default LoginPopup;
