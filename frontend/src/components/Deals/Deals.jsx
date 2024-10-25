import React, { useContext } from 'react';
import './Deals.css';
import { StoreContext } from '../context/StoreContext';
import Slider from '../Slider/Slider';

const Deals = ({ limit }) => {
  const { deal_list = [] } = useContext(StoreContext);

  if (deal_list.length === 0) {
    return <div>Loading...</div>;
  }

  const dealsToDisplay = deal_list.slice(0, limit);

  const sliderData = dealsToDisplay.map(item => ({
    image: item.dealproduct.image,
    imageFolder: "images",
    productname: item.dealproduct.name,
    title: item.dealtitle,
    offpercentage: item.offpercentage,
    price: item.dealproduct.sizes?.[0]?.price ?? 'N/A',
    dealdescription: item.dealdescription
  }));

  const sliderDesign = {
    container: { 
      backgroundColor: 'transparent', 
      padding: '20px', 
      borderRadius: '10px' 
    },
    title: { 
      color: '#262626', 
      fontSize: '2rem', 
      fontWeight: '700' 
    },
    slide: {
      margin: '10px', 
      padding: '20px', 
      borderRadius: '15px', 
      display: 'flex', 
      alignItems: 'left', 
      paddingTop: '20px', 
      flexDirection: 'row-reverse',
    },
    slideTitle: { 
      fontWeight: 'bold', 
      color: '#000', 
      textTransform: 'uppercase', 
      margin: '0', 
      borderRadius: '30px', 
      padding: '10px 0', 
      textAlign: 'center',
    },
    slideImage: { 
      width: '250px', 
      height: '260px', 
      borderRadius: '10px', 
      marginLeft: '20px' 
    },
    slideInfo: {
      marginTop: '40px', 
    },
    backgroundColorFirst: '#D43734', 
    colorFirst: 'white', 
    backgroundColorSecond: '#F8C400', 
    colorSecond: 'black',
  };
  
  // Determine responsive styles dynamically
  const getSlideStyle = () => {
    if (window.innerWidth < 768) {
      // Mobile styles
      return { display: 'block', flexDirection: 'column' };
    }
    // Default (desktop/tablet) styles
    return sliderDesign.slide;
  };
  

  return (
    <div className="best-deals">
      <div className="container mt-5">
        <Slider
          data={sliderData}
          design={sliderDesign}
          mobile={getSlideStyle}
          slidesToShowSlide={2} 
          title="Deals"
        />
      </div>
    </div>
  );
};

export default Deals;
