import './Footer.css'
import userlogo from './assets/jiomartlogo.png'

function Footer(){
    return (
        <footer>
            <div className="mainFooter">
                <div className="footercol">
                    <h3>All Categories</h3>
                    
                        <a href="/">Grocery</a>
                        <a href="/">Electronics</a>
                        <a href="/">Fashion</a>
                        <a href="/">Home & afestyle</a>
                        <a href="/">premium fruits</a>
                        <a href="/">Books</a>
                        <a href="/">Furniture</a>
                    

                </div>
                 <div className="footercol">
                    <h3>Popular Categories</h3>
                    
                        <a href="/">Biscuits,drinks&packaged food</a>
                        <a href="/">Fruits and vegetables</a>
                        <a href="/">Fashion</a>
                        <a href="/">Home & afestyle</a>
                        <a href="/">premium fruits</a>
                        <a href="/">Books</a>
                        <a href="/">Furniture</a>
                    

                </div>
                <div className="footercol">
                    <h3>Custom Accounts</h3>
                    
                        <a href="/">Biscuits,drinks&packaged food</a>
                        <a href="/">Fruits and vegetables</a>
                        <a href="/">Fashion</a>
                        <a href="/">Home & afestyle</a>
                        <a href="/">premium fruits</a>
                        <a href="/">Books</a>
                        <a href="/">Furniture</a>
                    

                </div>
                <div className="footercol">
                    <h3>helps & Suppports </h3>
                    
                        <a href="/">Biscuits,drinks&packaged food</a>
                        <a href="/">Fruits and vegetables</a>
                        <a href="/">Fashion</a>
                        <a href="/">Home & afestyle</a>
                        <a href="/">premium fruits</a>
                        <a href="/">Books</a>
                        <a href="/">Furniture</a>
                    

                </div>
                <div className="contactDetails">
                    <h2>Contact Us</h2>
                    <p>Whatsapp us:534634663</p>
                    <p>Call us:9392948320</p>
                    <p></p>

                </div>
                
            </div>
            <hr />
            <div className='copyright'>
                <img src={userlogo} alt="userlogo" className='userlogo' />
                <p>{String.fromCodePoint(0x00A9)} 2025 all rights reserved .Reliance  Retail Ltd.</p>
                <p className='secondP'>Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+</p>
            </div>
        </footer>

    );
}
export default Footer