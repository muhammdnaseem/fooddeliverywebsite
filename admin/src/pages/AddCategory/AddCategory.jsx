import React, {useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [categoryImage, setCategoryImage] = useState(false);
    const [data, setData] = useState({
        categoryname:'',
        categorydetails:'',
    })

    const onChangeHandler = (event) => {
        const categoryname = event.target.name; // Use event.target.name instead
        console.log(categoryname); // This will now print the correct name
        const value = event.target.value;
        setData(data => ({ ...data, [categoryname]: value }));
    };
    

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('categoryname', data.categoryname)
        formData.append('categorydetails', data.categorydetails)
        formData.append('categoryImage', categoryImage)
        const response = await axios.post(`${url}/api/category/add`, formData);

        if(response.data.success){
            setData({
                categoryname:'',
                categorydetails:'',
            })
            setCategoryImage(false);
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={categoryImage? URL.createObjectURL(categoryImage):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setCategoryImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Category name</p>
                <input onChange={onChangeHandler} value={data.categoryname} type="text" name='categoryname' placeholder='Type Here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Category Details</p>
                <textarea onChange={onChangeHandler} value={data.categorydetails} name="categorydetails" rows='6' placeholder='Write content here' required></textarea>
            </div>
            
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add