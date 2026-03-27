import OfferCard from './OfferCard';
import './Offersection.css'
import React, { useEffect,useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

function Offersection(){
    

   

    
    var settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed:3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  
    return(
        <div className='offersection'>
            <Slider {...settings}> 
                

                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={5000} /></div>
           
        
            </Slider>
        
            

        </div>
        
        
        
        
        
        
        
        
        
        
        
        

    );
}
export default Offersection