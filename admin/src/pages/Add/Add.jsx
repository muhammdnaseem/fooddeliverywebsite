import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        category: 'Salad', // Default category
        sizes: [{ size: 'Regular', price: '' }] // Default size
    });
    const [isMultipleSizes, setIsMultipleSizes] = useState(false); // State to check if multiple sizes are needed

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${url}/api/category/list`);
            if (response.data.success) {
                setCategory(response.data.data);
            } else {
                toast.error("Error fetching categories");
            }
        } catch (error) {
            toast.error("Error fetching categories");
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeChange = (index, field, value) => {
        const newSizes = [...data.sizes];
        newSizes[index][field] = value;
        setData(prev => ({ ...prev, sizes: newSizes }));
    };

    const addSizeField = () => {
        setData(prev => ({
            ...prev,
            sizes: [...prev.sizes, { size: '', price: '' }] // Add a new size field
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('image', image);
    
        // Handle sizes
        formData.append('sizes', JSON.stringify(data.sizes)); // Correctly append sizes as a JSON string
    
        const response = await axios.post(`${url}/api/food/add`, formData);
    
        if (response.data.success) {
            setData({
                name: '',
                description: '',
                category: 'Salad',
                sizes: [{ size: 'Regular', price: '' }] // Reset to default size
            });
            setImage(null);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
            console.log(response);
        }
    };
    

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" value={data.category}>
    {category.map((item) => (
        <option key={item._id} value={item._id}>{item.categoryname}</option>
    ))}
</select>

                </div>

                <div className="size-toggle">
                    <label>
                        <input
                            type="checkbox"
                            checked={isMultipleSizes}
                            onChange={() => setIsMultipleSizes(prev => !prev)}
                        />
                        Allow Multiple Sizes
                    </label>
                </div>

                {isMultipleSizes ? (
                    <>
                        {data.sizes.map((sizeObj, index) => (
                            <div key={index} className="size-inputs">
                                <input
                                    type="text"
                                    placeholder="Size"
                                    value={sizeObj.size}
                                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={sizeObj.price}
                                    onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addSizeField}>Add Another Size</button>
                    </>
                ) : (
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            onChange={(e) => handleSizeChange(0, 'price', e.target.value)} // Handle single price input
                            value={data.sizes[0].price}
                            type="number"
                            placeholder='$20'
                            required
                        />
                    </div>
                )}

                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
