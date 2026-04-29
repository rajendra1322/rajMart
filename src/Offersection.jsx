import OfferCard from './OfferCard';
import './Offersection.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                

                    <div><OfferCard name="Redmi Note 3"  price={9000} /></div>
                    <div><OfferCard name="Redmi Note 5"  price={10000} /></div>
                    <div><OfferCard name="Redmi Note 6"  price={11000} /></div>
                    <div><OfferCard name="Redmi Note 7"  price={12000} /></div>
                    <div><OfferCard name="Redmi Note 8"  price={13000} /></div>
                    <div><OfferCard name="Redmi Note 9"  price={14000} /></div>
                    <div><OfferCard name="Redmi Note 12"  price={14000} /></div>
                    <div><OfferCard name="Redmi Note 13"  price={15000} /></div>
           
        
            </Slider>
        
            

        </div>
        
        
        
        
        
        
        
        
        
        
        
        

    );
}
export default Offersection