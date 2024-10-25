
import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from './../context/StoreContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPopup = ({ setShowLogin }) => {
    const { loginUser, registerUser, forgotPassword, setToken } = useContext(StoreContext);

    const navigate = useNavigate(); // Initialize useNavigate

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
        
        if (currentState === 'Login') {
            // Call the loginUser function from context
            await loginUser(data.email, data.password); // Call loginUser directly
            // No need to handle response as loginUser already does it internally
    
        } else if (currentState === 'Sign Up') {
            // Call the registerUser function from context
            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
            };
            await registerUser(userData); // Call registerUser directly
            // No need to handle response as registerUser already does it internally
        } else if (currentState === 'Forgot Password') {
            // Handle Forgot Password logic
            const response = await forgotPassword(data.email);
            if (response.success) {
                alert('Reset link sent to your email!');
                setCurrentState('Login');
            } else {
                alert(response.message || 'Something went wrong. Please try again.');
            }

        } else if (currentState === 'New Password') {
            // Handle Reset Password logic
            const response = await resetPassword(data.newPassword);
            if (response.success) {
                alert('Password reset successfully!');
                setCurrentState('Login');
            } else {
                alert(response.message || 'Something went wrong. Please try again.');
            }
        }
    };

    const handleGoogleLogin = () => {
        const googleLoginUrl = `http://localhost:4000/api/user/auth/google`;
        window.open(googleLoginUrl, '_self');
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
