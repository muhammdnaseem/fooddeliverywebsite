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
        newPassword: "" // New state for the new password
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
            // Send only the email for forgot password
            const response = await axios.post(newUrl, { email: data.email });

            console.log(response);
            // Handle the response
            if (response.data.success) {
                alert('Reset link sent to your email!');
                setCurrentState('Login'); // Optionally navigate back to login
            } else {
                alert(response.data || 'Something went wrong. Please try again.');
            }
            return; // Prevent further processing
        } else if (currentState === 'New Password') {
            newUrl += "/api/user/resetpassword";
            const response = await axios.post(newUrl, { newPassword: data.newPassword });
            // Handle the response
            if (response.data.success) {
                alert('Password reset successfully!');
                setCurrentState('Login');
            } else {
                alert(response.data.message || 'Something went wrong. Please try again.');
            }
            return; // Prevent further processing
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
                alert(response.data.message); // Show success message for other actions
                if (currentState === 'Forgot Password') {
                    setCurrentState('New Password'); // Switch to new password state after sending reset link
                }
            }
        } else {
            alert(response.data.message);
            console.log(response);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container" style={{zIndex: '9999'}}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'New Password' ? (
                        <>
                            <input 
                                name='newPassword' 
                                onChange={onChangeHandler} 
                                value={data.newPassword} 
                                type="password" 
                                placeholder='New Password' 
                                required 
                            />
                        </>
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

                <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : currentState === 'Forgot Password' ? 'Send Reset Link' : currentState === 'New Password' ? 'Reset Password' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currentState === 'Login' ? (
                    <>
                        <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                        <p><span onClick={() => setCurrentState('Forgot Password')}>Forgot Password?</span></p>
                    </>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                )}
            </form>
        </div>
    );
}

export default LoginPopup;
