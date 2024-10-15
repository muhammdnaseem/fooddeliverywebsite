import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({}); // Add state for sizes
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    const [food_list, setFoodList] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [category_list, setCategoryList] = useState([]);
    const [deal_list, setDealList] = useState([]);

    const addToCart = async (itemId, selectedSizes) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
        }
    };

    const handleSizeChange = async (itemId, oldSize, newSize) => {
        const oldItemKey = `${itemId}-${oldSize}`;
        const newItemKey = `${itemId}-${newSize}`;
    
        // Move the quantity from the old size to the new size in the cartItems state
        const updatedCartItems = setCartItems((prev) => {
            const newCartItems = { ...prev };
    
            // Transfer the quantity from old size to new size
            if (newCartItems[oldItemKey]) {
                const quantity = newCartItems[oldItemKey];
                delete newCartItems[oldItemKey]; // Remove the old size
                newCartItems[newItemKey] = (newCartItems[newItemKey] || 0) + quantity; // Add quantity to the new size
            }
    
            return newCartItems;
        });
    
        // Send the updated cart data to the backend
        if (token) {
            try {
                await axios.post(`${url}/api/cart/update`, {
                    itemId,
                    oldSize,
                    newSize
                }, { headers: { token } });
            } catch (error) {
                console.error("Error updating cart size:", error);
            }
        }
    
        // Update the selected size state
        setSelectedSizes((prev) => ({ ...prev, [itemId]: newSize }));
    
        // Calculate subtotal for the updated item
        const itemInfo = food_list.find((product) => product._id === itemId);
        const updatedSubtotal = itemInfo ? itemInfo.sizes.find((s) => s.size === newSize)?.price * (updatedCartItems[newItemKey] || 0) : 0;
    
        console.log('Updated Subtotal for Item:', updatedSubtotal);
    
        // Update the total amount after size change
        const updatedTotalAmount = getTotalCartAmount(); // This function should be defined to calculate the total
        console.log('Updated Total Amount:', updatedTotalAmount);
    };
    
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemKey in cartItems) {
            if (cartItems[itemKey] > 0) {
                const [itemId, selectedSize] = itemKey.split('-'); // Split key to get itemId and size
                const itemInfo = food_list.find((product) => product._id === itemId);

                if (itemInfo) {
                    // Find the price for the selected size
                    const sizeInfo = itemInfo.sizes.find(size => size.size === selectedSize) ||
                        itemInfo.sizes.find(size => size.size === "Regular") ||
                        itemInfo.sizes[0]; // Default to first available size if no "Regular" size

                    if (sizeInfo) {
                        totalAmount += sizeInfo.price * cartItems[itemKey]; // Use the price of the selected size
                    }
                } else {
                    console.warn(`Item with ID ${itemId} not found in food_list`);
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const fetchUserDetails = async (token) => {
        try {
            
            const response = await axios.post(url + "/api/user/details", {}, { headers: { token } });
            
           
           
            setUserDetails(response.data.data); // Update the state with user details
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Add this function to your StoreContextProvider

const updateUserDetails = async (userData) => {
    if (token) {
        try {
            console.log(userData);
            const response = await axios.put(url + "/api/user/update", userData, {
                headers: { token }
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


  
    

    const fetchCategoryList = async () => {
        const response = await axios.get(url + "/api/category/list");
        setCategoryList(response.data.data);
    };

    const fetchDealList = async () => {
        const response = await axios.get(url + "/api/deal/list");
        setDealList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchCategoryList();
            await fetchDealList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await fetchUserDetails(localStorage.getItem("token")); // Fetch user details after loading the token
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        category_list,
        userDetails, // Include user details in context
        deal_list,
        cartItems,
        selectedSizes,  // Pass selectedSizes to the context
        setCartItems,
        addToCart,
        removeFromCart,
        handleSizeChange,  // Export handleSizeChange
        getTotalCartAmount,
        url,
        token,
        setToken,
        updateUserDetails, // Include updateUserDetails in context
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
