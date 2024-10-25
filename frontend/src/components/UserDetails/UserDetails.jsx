import React, { useContext, useState, useEffect } from 'react';
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Container } from 'react-bootstrap';

const UserDetails = () => {
    const { userDetails, setToken, updateUserDetails } = useContext(StoreContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        currentpassword: '',
        card: '1234 6789 1234 6789',
    });

    const [isLoading, setIsLoading] = useState(true);

    // Sync form data when userDetails changes
    useEffect(() => {
        if (userDetails && userDetails.data) {
            setFormData({
                name: userDetails.data.name || '',
                email: userDetails.data.email || '',
                mobile: userDetails.data.mobile || '',
                password: '', // Password remains empty initially
                currentpassword: '', // Keep current password input empty
                card: '1234 6789 1234 6789',
            });
            setIsLoading(false);
        }
    }, [userDetails]);

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
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFocus = (name) => {
        setFocus((prevFocus) => ({ ...prevFocus, [name]: true }));
    };

    const handleBlur = (name) => {
        setFocus((prevFocus) => ({ ...prevFocus, [name]: !!formData[name] }));
    };

    // Function to update account details
    const updateAccountDetails = async (e) => {
        e.preventDefault();
        await updateUserDetails({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
        });
    };

    // Function to update password
    const updatePassword = async (e) => {
        e.preventDefault();
        // Check if current password is provided before updating
        if (formData.currentpassword) { 
            await updateUserDetails({
                password: formData.password,
                currentpassword: formData.currentpassword,
            });
            // Reset password fields after successful update
            setFormData((prevData) => ({ ...prevData, password: '', currentpassword: '' }));
        } else {
            alert('Please enter your current password.');
        }
    };

    // Function to update payment method
    const updatePaymentMethod = async (e) => {
        e.preventDefault();
        await updateUserDetails({ card: formData.card });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    };

    if (isLoading) return <p>Loading user details...</p>;

    return (
        <Container fluid className="my-5 py-5">
            <Container className="w-50">
                <form>
                    <section className="section">
                        <h2>My Account <i>ⓘ</i></h2>
                        <div className="input-container">
                            <label className={focus.name || formData.name ? 'floating-label' : 'd-none'}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Name"
                                onChange={handleChange}
                                onFocus={() => handleFocus('name')}
                                onBlur={() => handleBlur('name')}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label className={focus.mobile || formData.mobile ? 'floating-label' : 'd-none'}>Mobile Number</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                onFocus={() => handleFocus('mobile')}
                                onBlur={() => handleBlur('mobile')}
                            />
                        </div>
                        <button className="save-btn" onClick={updateAccountDetails}>Save</button>
                    </section>

                    <section className="section">
                        <h2>Email</h2>
                        <div className="input-container">
                            <label className={focus.email || formData.email ? 'floating-label' : 'd-none'}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                required
                            />
                        </div>
                        <button className="save-btn" onClick={updateAccountDetails}>Save</button>
                    </section>

                    <section className="section">
                        <h2>Password</h2>
                        <div className="input-container">
                            <label className={focus.password || formData.password ? 'floating-label' : 'd-none'}>New Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="New Password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                            />
                        </div>
                        <div className="input-container">
                            <label className={focus.currentpassword || formData.currentpassword ? 'floating-label' : 'd-none'}>Current Password</label>
                            <input
                                type="password"
                                name="currentpassword"
                                placeholder="Current Password"
                                value={formData.currentpassword}
                                onChange={handleChange}
                                onFocus={() => handleFocus('currentpassword')}
                                onBlur={() => handleBlur('currentpassword')}
                            />
                        </div>
                        <button className="save-btn" onClick={updatePassword}>Save</button>
                    </section>

                    <section className="section">
                        <h2>Payment Method</h2>
                        <div className="input-container">
                            <label className={focus.card || formData.card ? 'floating-label' : 'd-none'}>Debit Card</label>
                            <input
                                type="text"
                                name="card"
                                placeholder="Debit Card"
                                value={formData.card}
                                onChange={handleChange}
                                onFocus={() => handleFocus('card')}
                                onBlur={() => handleBlur('card')}
                            />
                        </div>
                        <button className="save-btn" onClick={updatePaymentMethod}>Save</button>
                    </section>
                </form>
            </Container>
        </Container>
    );
};

export default UserDetails;
