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
        newPassword: "",
        confirmpassword: "",
        otp: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
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

    const handleGoogleLogin = () => {
        window.open(`${url}/api/user/auth/google`, '_self');
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <img
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon}
                    alt="close"
                    className='close-button'
                />

                <div className="login-popup-title">
                    <h1>
                        <span>W</span>elcome {currentState === 'Login' && (<><span>B</span>ack</>)}
                    </h1>
                    <br />
                    {currentState === 'Sign Up' && (<h2><span>S</span>ign <span>U</span>p</h2>)}
                    {currentState === 'Login' && (<h2><span>L</span>ogin</h2>)}
                </div>

                <div className="login-popup-tabs my-3">
                    <div
                        className="active-indicator"
                        style={{ left: currentState === 'Login' ? '0%' : '50%' }}
                    ></div>

                    <span
                        className={currentState === 'Login' ? 'active' : ''}
                        onClick={() => setCurrentState('Login')}
                    >
                        Login
                    </span>

                    <span
                        className={currentState === 'Sign Up' ? 'active' : ''}
                        onClick={() => setCurrentState('Sign Up')}
                    >
                        Sign Up
                    </span>
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
                                <>
                                    <input
                                        name='name'
                                        onChange={onChangeHandler}
                                        value={data.name}
                                        type="text"
                                        placeholder='Your name'
                                        required
                                    />
                                    <div className="email-input-wrapper">
                                        <input
                                            name="email"
                                            onChange={onChangeHandler}
                                            value={data.email}
                                            type="email"
                                            placeholder="Email"
                                            required
                                        />
                                        <button className="send-otp-button">Send OTP</button>
                                    </div>
                                    <input
                                        name="otp"
                                        onChange={onChangeHandler}
                                        value={data.otp}
                                        type="text"
                                        placeholder="Enter OTP"
                                        required
                                    />
                                    <input
                                        name="password"
                                        onChange={onChangeHandler}
                                        value={data.password}
                                        type="password"
                                        placeholder='Password'
                                        required
                                    />
                                    <input
                                        name='confirmpassword'
                                        onChange={onChangeHandler}
                                        value={data.confirmpassword}
                                        type="password"
                                        placeholder='Confirm Password'
                                        required
                                    />
                                </>
                            )}
                            {currentState === 'Login' && (
                                <>
                                    <input
                                        name='email'
                                        onChange={onChangeHandler}
                                        value={data.email}
                                        type="email"
                                        placeholder='Email'
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
                                    <p
                                        className="forgot-password"
                                        onClick={() => setCurrentState('Forgot Password')}
                                    >
                                        Forgot password?
                                    </p>
                                </>
                            )}
                        </>
                    )}
                </div>

                <button type='submit'>
                    {currentState === 'Sign Up' ? 'Create Account' : currentState === 'Forgot Password' ? 'Send Reset Link' : currentState === 'New Password' ? 'Reset Password' : 'Login'}
                </button>

                {currentState === 'Sign Up' &&
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By clicking, sign up you agree to our <a href="#">terms of use</a> and <a href="#">privacy policy</a></p>
                    </div>
                }

                <div className="login-popup-socials">
                    <img src={assets.google} alt="Google" onClick={handleGoogleLogin} />
                   
                    <img src={assets.facebook} alt="Facebook" />
                </div>
            </form>
        </div>
    );
};

export default LoginPopup;
