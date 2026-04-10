import './Card.css'
import image from "./assets/JioMartSale.webp"
import bag from './assets/ssb.webp'

function Card(props){
    return (
        <div className='cardCantainer'>
            <img src={bag} alt="couponImage" className='couponI' />
            <div className='offer'>
                <h1>Flat 50% off</h1>
                <h3>Min.order value ₹249</h3>
                <button className='btncard'>Shop Now</button>

            </div>
            <div className='couponCode'>
                <p className='coupon'>Coupon Code:</p>
                <p className='couponNo'>DEAL50</p>
            </div>



        </div>

    );
}
export default Card