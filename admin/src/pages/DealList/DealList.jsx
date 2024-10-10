import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const DealList = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/deal/list`)
   
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeDeal = async (dealId) =>{
    const response = await axios.post(`${url}/api/deal/remove`,{id:dealId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error('Error');
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Deals List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Deal Title</b>
            <b>Description</b>
            <b>Product</b>
            <b>Off %</b>
            <b>Time</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              {/* <img src={`${url}/images/`+item.image} alt="" /> */}
              <p>{item.dealtitle}</p>
              <p>{item.dealdescription}</p>
              <p>{item.dealproduct?.name}</p>
              <p>{item.offpercentage}%</p>
              <p>{item.dealtime}hours</p>
              <p onClick={()=> removeDeal(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DealList