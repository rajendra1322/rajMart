
export const getItem=()=>{
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export const saveCart=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));

};

export const addtocart=(product)=>{
    let cart=getItem();
    let existingProduct=cart.find(item=>item.productId===product._id);
    if(existingProduct){
        existingProduct.quantity+=1;
    }
    else{
        cart.push({productId:product._id,quantity:1});
    }
    saveCart(cart);

    window.dispatchEvent(new Event("cartUpdated"));
}

