import userModel from './../models/userModel.js';

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, selectedSizes } = req.body; // Destructure userId and itemId from the request body

        // Fetch the user's data
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || { items: {}, selectedSizes: {} }; // Initialize cartData if it doesn't exist

        // Build the key for the cart item
        const itemKey = `${itemId}-${cartData.selectedSizes[itemId]}`; // Default size is "Regular" if not set

        // Add or update the item quantity in the items object
        if (!cartData.items[itemKey]) {
            cartData.items[itemKey] = 1; // If item doesn't exist, set quantity to 1
        } else {
            cartData.items[itemKey] += 1; // Increment quantity
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};


// remove items to user cart
const removeFromCart = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'Removed from cart'});
    } catch (error) {
        console.log(error) ;
       res.json({success:false,message:'Error'});
    }
}

// update items to user cart
// update items in user cart when size is changed
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, oldSize, newSize } = req.body;

        // Fetch the user's data
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        // Build keys for the old and new sizes
        const oldItemKey = `${itemId}-${oldSize}`;
        const newItemKey = `${itemId}-${newSize}`;

        // If the old size exists, move the quantity to the new size
        if (cartData[oldItemKey]) {
            const quantity = cartData[oldItemKey];

            // Remove the old size from the cart
            delete cartData[oldItemKey];

            // Add the quantity to the new size
            cartData[newItemKey] = (cartData[newItemKey] || 0) + quantity;
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData });
        
        res.json({ success: true, message: 'Cart updated successfully' });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.json({ success: false, message: 'Error updating cart' });
    }
};



// fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error) ;
        res.json({success:false,message:'Error'});
    }
}


export {addToCart, removeFromCart, getCart, updateCart}
