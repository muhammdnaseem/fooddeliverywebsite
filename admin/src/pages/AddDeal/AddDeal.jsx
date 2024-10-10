import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDeal = ({ url }) => {
    const [deal, setDeal] = useState([]);
    const [list, setList] = useState([]);
    
    const [data, setData] = useState({
        dealtitle: '',
        dealdescription: '',
        offpercentage: '',
        dealproduct: '',
        dealtime: ''
    });

    const fetchDeals = async () => {
        try {
            const response = await axios.get(`${url}/api/deal/list`);
            if (response.data.success) {
                setDeal(response.data.data);
            } else {
                toast.error("Error fetching deals");
            }
        } catch (error) {
            toast.error("Error fetching deals");
        }
    };

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching food list");
            }
        } catch (error) {
            toast.error("Error fetching food list");
        }
    };

    useEffect(() => {
        fetchDeals();
        fetchList();
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append('dealtitle', data.dealtitle);
        // formData.append('dealdescription', data.dealdescription);
        // formData.append('offpercentage', Number(data.offpercentage));
        // formData.append('dealtime', Number(data.dealtime)); 
        // formData.append('dealproduct', data.dealproduct);

        const dealData = {
            dealtitle: data.dealtitle,
            dealdescription: data.dealdescription,
            offpercentage: Number(data.offpercentage),
            dealtime: Number(data.dealtime),
            dealproduct: data.dealproduct
        };
        
        try {
            // console.log(dealData);
            const response = await axios.post(`${url}/api/deal/add`, dealData); // Use correct endpoint for adding deals

            if (response.data.success) {
                setData({
                    dealtitle: '',
                    dealdescription: '',
                    offpercentage: '',
                    dealtime: '',
                    dealproduct: ''
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
                console.log(response);
            }
        } catch (error) {
            toast.error("Error adding the deal");
            console.log(error);
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-product-name flex-col">
                    <p>Deal Title</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.dealtitle} 
                        type="text" 
                        name='dealtitle' 
                        placeholder='Type Here' 
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Deal Description</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.dealdescription} 
                        name="dealdescription" 
                        rows='6' 
                        placeholder='Write content here' 
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Deal Product</p>
                        <select 
                            onChange={onChangeHandler} 
                            name="dealproduct" 
                            value={data.dealproduct} 
                            required
                        >
                            <option value="" disabled>Select a product</option>
                            {list.map((item) => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Deal Time (in hours)</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.dealtime} 
                            type="number" 
                            name='dealtime' 
                            placeholder='Enter time' 
                            required
                        />
                    </div>
                    <div className="add-price flex-col">
                        <p>Off Percentage (%)</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.offpercentage} 
                            type="number" 
                            name='offpercentage' 
                            placeholder='Enter percentage' 
                            required
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default AddDeal;
