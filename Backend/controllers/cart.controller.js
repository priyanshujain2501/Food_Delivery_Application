import {userModel} from "../models/user.model.js"



//add items to user cart(add cart items in database)
const addToCart = async(req,res) => {

    try {

        let userData = await userModel.findById(req.body.userId)

        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.status(200).json({success:true,message:"Item is added to cart successfully"})
        
    } 
    catch (error) {

        res.status(500).json({ success: false, message: error.messages})
        
    }
    
}

//remove items from user cart(remove cart items in database)
const removeFromCart = async(req,res) => {
    
    try {
        
        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.status(200).json({success:true,message:"Removed from cart"})

    } 
    catch (error) {
        
        res.status(500).json({success:false,message:"Error"})

    }

}

//fetch user data from user cart(get cart items in database)
const getCart = async(req,res) => {

    try {

        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        res.json({success:true,cartData})
        
    } 
    catch (error) {
        res.status(500).json({success:false,message:"Error"});
    }

}


export {
    addToCart,
    removeFromCart,
    getCart,
}