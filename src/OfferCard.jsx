import './OfferCards.css'
import mobile from './assets/mobileoffer.webp'
import redmiFive from './assets/redminote5.webp'

function OfferCard(props){
    return (
        <>
        <div className='maincontainer'>
        <div className='offercontainerr'>
           <div className='pricediv'>
            <h2 className='headdingoffer'>{props.name}</h2>
            
                <p className='pricep'> From</p>
                <p className='price'>₹{props.price}</p>

            
            
            <button className='btncard'>Shop Now</button>
            </div>
            <div className='image'>
            <img src={mobile} alt="mobileoffer" className='imgmbl' />
            </div>
            
            </div>
            </div>
            </>
    );
}
export default OfferCard