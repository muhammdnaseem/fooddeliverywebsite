// src/Slider/Slider.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { StoreContext } from '../context/StoreContext'; // Import context
import './Slider.css';
import { Button } from 'react-bootstrap';
import FoodItem from '../FoodItem/FoodItem';
import StarRating from '../StarRating';

const Slider = ({
    data = [],
    design = {},
    title = "Slider",
    onSlideClick,
    buttonTitle,
    buttonNav,
    slidesToShowSlide
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(slidesToShowSlide);
 // Handle slides responsively
    const slideRef = useRef(null);
    const { url, food_list = [] } = useContext(StoreContext);

    const totalSlides = data.length;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Responsive logic within the Slider
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 992) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(slidesToShowSlide);
            }
        };

        handleResize(); // Set slidesToShow initially
        window.addEventListener('resize', handleResize); // Add event listener

        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    // Adjust slide position based on the current index
    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(-${(90 / slidesToShow) * currentIndex}%)`;
        }
    }, [currentIndex, slidesToShow]);

    return (
        <div className="slider-container" style={design.container}>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="slider-title" style={design.title}>{title}</h2>

                {buttonTitle && buttonNav && (
                    <Button
                        variant="warning"
                        className="header-button"
                        onClick={buttonNav}
                    >
                        {buttonTitle}
                    </Button>
                )}
            </div>

            <div className="slider-arrow-container">
                <IoIosArrowBack className="slider-arrow left-arrow" onClick={handlePrev} />
                <IoIosArrowForward className="slider-arrow right-arrow" onClick={handleNext} />
            </div>

            <div className="slider-wrapper mt-5">
                <div
                    className="slider-content"
                    ref={slideRef}
                    style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        width: '94%',
                    }}
                >
                    {/* {title === "Recommended foods" ? (
                        food_list.map((item) => (
                            <div key={item._id} className="slide" style={{ ...design.slide, width: `${100 / slidesToShow}%` }}>
                                <FoodItem {...item} />
                            </div>
                        ))
                    )  : ( */}
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="slide "
                                style={{
                                    ...design.slide,
                                    width: `${101 / slidesToShow}%`,
                                    backgroundColor: index % 2 === 0 ? design.backgroundColorFirst : design.backgroundColorSecond,
                                }}
                                onClick={() => onSlideClick && onSlideClick(item.title)}
                            >
                                
                                <img
                                    src={
                                        title === "Here Fom Our Customer" ? (
                                            item.image  // Provide a default image path if needed
                                        ) : (
                                            `${url}/${item.imageFolder}/${item.image}` // Use the dynamic URL for other titles
                                        )
                                    }
                                    
                                    alt={item.title}
                                    className={title === "Here From Our Customer" ? "customer-slide-image" : "slide-image"}
 
                                    style={design.slideImage}
                                />
                                <div 
                                className='slide-product-info'
                                style={{ ...design.slideProductInfo,
                                
                                    marginTop: '0px', textAlign: 'left', width: '100%', height: '100%' }}>
                                    <p className="slide-title"
                                        style={{
                                            ...design.slideTitle,
                                            backgroundColor: index % 2 === 0 ? design.backgroundColorSecond : design.backgroundColorFirst,
                                            color: index % 2 === 0 ? design.colorSecond : design.colorFirst,
                                        }}
                                    >{item.title}</p>

                                    {item.productname && item.price && item.dealdescription && (
                                        <div 
                                        className='slide-info'
                                        style={{
                                            ...design.slideInfo,
                                            color: index % 2 === 0 ? design.colorFirst : design.colorSecond }}>
                                            <div style={design.slideFoodDescription}>
                                            <p
                                            className='product-name'
                                            style={design.slideProductName}
                                            >{item.productname}</p>
                                            <h3
                                            className='product-price'
                                             style={design.slidePrice}>${item.price}</h3>
                                            </div>
                                            
                                            <p
                                            className='product-description'
                                            >{item.dealdescription}</p>
                                        </div>
                                    )}
                                    {item.name && item.rating && item.review &&  (
                                        <div className='text-center mx-3'
                                         style={{ marginTop: '0px', color: index % 2 === 0 ? design.colorFirst : design.colorSecond }}>
                                            <p
                                            style={{fontWeight: 'normal', height: '100px'}}
                                            >{item.review}</p>
                                            <h3>{item.name}</h3>
                                            <StarRating rating={item.rating} />
                                            
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                     {/* )} */}
                </div>
            </div>

            <div className="slider-dots">
                {data.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Slider;
