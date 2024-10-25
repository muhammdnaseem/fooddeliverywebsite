import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);


// Custom jwtDecode function
const jwtDecode = (token) => {
    if (!token) {
        throw new Error("Token is required for decoding");
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error("JWT does not have 3 parts");
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload)); // Decode Base64Url encoded payload

    return decodedPayload; // Return the decoded payload
};

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { label: 'Home', href: '/', active: false },
        { label: 'Menu', href: '/categories', active: false },
      ]);
      
    const [selectedSizes, setSelectedSizes] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem("token") || ""); 

    const [food_list, setFoodList] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [category_list, setCategoryList] = useState([]);
    const [deal_list, setDealList] = useState([]);

    // Function to update breadcrumb items
  const updateBreadcrumbs = (items) => {
    setBreadcrumbItems(items);
  };

    // Function to decode token and extract user ID
    const getUserIdFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.id; // Adjust if your token has a different structure
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    // StoreContext.js
const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${url}/api/user/forgotpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'An error occurred.' };
    }
};



    // Login User and Set Token in Context
    const loginUser = async (email, password) => {
        try {
            const response = await axios.post(`${url}/api/user/login`, { email, password });
            if (response.data.success) {
                const token = response.data.token;
                setToken(token);
                localStorage.setItem("token", token); // Store token locally
                await fetchUserDetails(token); // Fetch user details after login
                await loadCartData(token); // Load cart data
                const message = response.data.message;
                // navigate('/success_page', { state: { message: message } });
                alert(message);
            } else {
                alert(response.data.message);
                
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    };

    // Register User and Login on Success
    const registerUser = async (userData) => {
        try {
            const response = await axios.post(`${url}/api/user/register`, userData);
    
            if (response.data.success) {
                alert("Registration successful! Logging you in...");
                await loginUser(userData.email, userData.password); // Login after registration
            } else {
                alert(response.data.message || "Registration failed. Please try again."); // Fallback message
            }
        } catch (error) {
            console.error("Registration error:", error);
            
            // If the error response contains a message, show it
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Registration failed. Please try again."); // Generic message
            }
        }
    };
    

    const addToCart = async (itemId, selectedSize) => {
        const userId = getUserIdFromToken(token);
        const sizeToUse = selectedSize || food_list.find(item => item._id === itemId)?.sizes[0]?.size; // Default to the first size
    
        if (!userId || !sizeToUse) {
            console.log('User not logged in or selected size is missing.');
            return; // Early return
        }
    
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    
        try {
            const response = await axios.post(
                `${url}/api/cart/add`,
                { userId, itemId, selectedSize: sizeToUse },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            await loadCartData(token);
            
            return response.data; // Return the response data
        } catch (error) {
            console.error('Error adding to cart:', error);
            return null; // Optionally return null or throw an error
        }
    };
    
    

    const removeFromCart = async (itemId, selectedSize) => {
        const userId = getUserIdFromToken(token);
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            const itemKey = `${itemId}-${selectedSize}`;
    
            if (newCartItems[itemKey]) {
                newCartItems[itemKey] = Math.max((newCartItems[itemKey] || 0) - 1, 0);
                if (newCartItems[itemKey] === 0) {
                    delete newCartItems[itemKey]; // Remove item if quantity is 0
                }
            }
    
            return newCartItems;
        });
    
        try {
            await axios.post(
                `${url}/api/cart/remove`,
                { userId, itemId, selectedSize },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            await loadCartData(token);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
    

    const handleSizeChange = async (itemId, oldSize, newSize) => {
        const oldItemKey = `${itemId}-${oldSize}`;
        const newItemKey = `${itemId}-${newSize}`;

        setCartItems((prev) => {
            const newCartItems = { ...prev };

            // Move quantity from old size to new size
            if (newCartItems[oldItemKey]) {
                const quantity = newCartItems[oldItemKey];
                delete newCartItems[oldItemKey]; // Remove old size from cart
                newCartItems[newItemKey] = (newCartItems[newItemKey] || 0) + quantity;
            }
            return newCartItems;
        });

        // Send size change to backend (if needed)
        if (token) {
            try {
                await axios.post(`${url}/api/cart/update`, {
                    itemId,
                    oldSize,
                    newSize,
                }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.error("Error updating cart size:", error);
            }
        }

        // Update selectedSizes state
        setSelectedSizes((prev) => ({ ...prev, [itemId]: newSize }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        // Access items from cartItems
        const items = cartItems.items;

        for (const itemKey in items) {
            const quantity = items[itemKey];

            if (quantity > 0) {
                const [itemId, selectedSize] = itemKey.split('-');

                const itemInfo = food_list.find((product) => product._id === itemId);

                if (itemInfo) {
                    const sizeInfo =
                        itemInfo.sizes.find((size) => size.size === selectedSize) ||
                        itemInfo.sizes.find((size) => size.size === "Regular") ||
                        itemInfo.sizes[0]; // Default size

                    if (sizeInfo) {
                        totalAmount += sizeInfo.price * quantity;
                    }
                } else {
                    console.warn(`Item with ID ${itemId} not found in food_list`);
                }
            }
        }

        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setFoodList(response.data.data);
    };

    // Fetch User Details from API
    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get(`${url}/api/user/details`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Update User Details
    const updateUserDetails = async (userData) => {
        if (token) {
            const userId = getUserIdFromToken(token); // Retrieve userId from the token
            const updatedData = { userId, ...userData }; // Add userId to the userData
            console.log(updatedData); // Ensure this log shows the correct structure
           
            try {
                const response = await axios.patch(`${url}/api/user/update`, updatedData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                if (response.data.success) {
                    setUserDetails([response.data.data]); // Update state with the new user details
                } else {
                    console.error("Failed to update user details:", response.data.message);
                }
            } catch (error) {
                console.error("Error updating user details:", error);
            }
        }
    };
    

    // Fetch Category List
    const fetchCategoryList = async () => {
        const response = await axios.get(`${url}/api/category/list`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCategoryList(response.data.data);
    };

    // Fetch Deal List
    const fetchDealList = async () => {
        const response = await axios.get(`${url}/api/deal/list`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setDealList(response.data.data);
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.error('Failed to load cart data:', response.data.message);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const isTokenExpired = (token) => {
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
    };

    useEffect(() => {
        const initialize = async () => {
            if (token && !isTokenExpired(token)) {
                await loadCartData(token);
                await fetchUserDetails(token);
            } else {
                console.error('Token is expired or invalid. Please log in again.');
                setToken('');  // Clear invalid token
                localStorage.removeItem('token');  // Remove from localStorage
            }

            await fetchFoodList();
            await fetchCategoryList();
            await fetchDealList();
        };

        initialize();
    }, [token]);

    const contextValue = {
        food_list,
        category_list,
        userDetails,
        deal_list,
        cartItems,
        selectedSizes,
        setCartItems,
        addToCart,
        removeFromCart,
        handleSizeChange,
        getTotalCartAmount,
        url,
        token,
        setToken,
        updateUserDetails,
        loginUser,
        forgotPassword,
        registerUser,
        breadcrumbItems, 
        updateBreadcrumbs
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
