import React, {useContext} from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';


const ExploreMenu = ({category, setCategory}) => {

    const { category_list = [] } = useContext(StoreContext);
    const url = "http://localhost:4000";

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Categories</h1>
        <p className='explore-menu=text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, exercitationem excepturi temporibus obcaecati voluptas vitae?</p>
        <div className="explore-menu-list">
            {category_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=> prev === item.categoryname ? 'All' : item.categoryname)} key={index} className="explore-menu-list-item">
                        
                        <img className={category===item.categoryname?'active':''} src={url + '/categoryimages/' + item.categoryimage} alt="" />
                        <p>{item.categoryname}</p>
                        <h6>{item.categorydetails}</h6>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu