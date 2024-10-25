import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';
import { assets } from './../../assets/assets';
import ReviewModal from './ReviewModal';
import { Button, Container } from 'react-bootstrap';
import BreadcrumbNav from '../../components/BreadcrumbNav/BreadcrumbNav';

const MyOrders = () => {
    const { url, token, updateBreadcrumbs } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFoodIds, setSelectedFoodIds] = useState([]); // Change to an array

    const fetchOrders = async () => {
        
            const response = await axios.post(url + '/api/order/userorders', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

        setData(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }

        const newBreadcrumb = { label: 'My Orders', href: '/my-orders' };

    updateBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs.filter(item => item.label !== 'My Orders'), // Remove any existing category breadcrumb
      newBreadcrumb, // Add the new active category
    ]);
    }, [token, updateBreadcrumbs]);

    const handleAddReview = (foodIds) => {
        setSelectedFoodIds(foodIds); // Set food IDs for review
        setShowModal(true);
    };

    const handleSubmitReview = async (foodIds, rating, comment) => {
        const reviewData = {
            product: foodIds,
            rating,
            comment,
        };

        try {
            // Submit the review to your backend
            console.log(reviewData);
            const response = await axios.post(`${url}/api/food/review/`, reviewData, {
                headers: { token }
            });
            alert('Review submitted successfully!'); // Show success message
            console.log(response); // Optionally log the response
            fetchOrders(); // Refetch orders to see new reviews
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.'); // Show error message
        } finally {
            setShowModal(false); // Close the modal after submission
        }
    };

    const handleAddPayment = () => {
        // Logic to add payment
        console.log("Payment process initiated");
    };
    

    return (
        <div className='my-orders'>
            <Container>
            <BreadcrumbNav  /> 
            </Container>
              
           
            <div className="container mt-3">
            
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, itemIndex) => (
                           <span key={itemIndex}>
                           {item.name} x {item.quantity}
                           {itemIndex < order.items.length - 1 && <br />}
                         </span>
                         
                        ))}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p>
                        {order.payment ? "Paid" : 
                        <Button 
                        onClick={handleAddPayment}
                        variant="warning" className='review-header-button'
                        >
                            Add Payment
                            </Button>}
                        <b style={{marginLeft: '5px'}}>{order.status}</b></p>
                        

                        {order.status === 'Delivered' && (
                            <Button  variant="warning" className='review-header-button' onClick={() => handleAddReview(order.items.map(item => item._id))}>
                                Add Reviews 
                            </Button>
                        )}
                        {order.status !== 'Delivered' && (
                            <Button  variant="warning" className='review-header-button' disabled onClick={() => handleAddReview(order.items.map(item => item._id))}>
                            Add Reviews 
                        </Button>
                        )}
                    </div>
                ))}
            </div>
            {showModal && (
                <ReviewModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmitReview}
                    foodIds={selectedFoodIds} // Pass the array of food IDs
                />
            )}
        </div>
    );
};

export default MyOrders;
