import React, {useContext} from 'react'
import './DealLine.css';
import { StoreContext } from '../context/StoreContext';
import { Container } from 'react-bootstrap';

const DealLine = () => {
  const { deal_list = []} = useContext(StoreContext);

  if (deal_list.length === 0) {
    return <div>Loading...</div>; // or some placeholder
}
  
  return (
   
      <div className="deal">
      {deal_list.map((item) => (
                    <span className="deal-text text-white" key={item._id}>
                        <span className='text-white' style={{ fontWeight: 'bold' }}>{item.dealtitle}!&nbsp;&nbsp;&nbsp;</span>
                        Get <span className='text-white' style={{ fontWeight: 'bold' }}> {item.offpercentage}% </span> off on the <span style={{ fontWeight: 'bold' }}> 
                          {item.dealproduct.name}
                           </span> today...
                    </span>
                ))}
      </div>
    

  )
}

export default DealLine