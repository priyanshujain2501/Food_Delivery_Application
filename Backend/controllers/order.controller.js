import dotenv from 'dotenv'
dotenv.config();

import {orderModel} from '../models/order.model.js'
import {userModel} from '../models/user.model.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend
const placeOrder = async (req,res) => {

    const frontend_url = "https://food-delivery-application-iota.vercel.app";

    try {

        // const {paymentMethod} = req.body.paymentMethod;
        // const promoAmt = req.body.promoAmt;

        const newOrder = await orderModel.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentType:"COD",
        })

        //clear user cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 85,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 85,
            },
            quantity: 1,
        })

        // line_items.push({
        //     price_data:{
        //         currency:"inr",
        //         product_data : {
        //             name : "Promo Discount",
        //         },
        //         unit_amount: -promoAmt*100*85,
        //     },
        //     quantity:1,
        // });

        // if(paymentMethod === "card"){
        //     const session = await stripe.checkout.sessions.create({
        //         line_items: line_items,
        //         mode: "payment",
        //         success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //         cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        //     })

        //     return res.status(200).json({ success: true, session_url: session.url })

        // }
        // else if(paymentMethod === "upi"){
        //     const paymentIntent = await stripe.paymentIntents.create({
        //         amount: amount*100*85,
        //         currency:"inr",
        //         payment_method_types:["upi"],
        //     });
        // }


        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

            return res.status(200).json({ success: true, session_url: session.url })

        // res.status(200).json({ success: true, session_url: `${frontend_url}/upi-payment?orderId=${newOrder._id}`, })

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

const verifyOrder = async (req,res) => {

    const {orderId,success} = req.body;

    try {
        
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"}) 
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }

    } 
    catch (error) {
        res.json({success:false,message:"Error"})
    }

}

//user orders fro frontend
const userOrders = async (req,res) => {

    try{

        const orders = await orderModel.find({userId:req.body.userId});

        res.json({success:true,data:orders})

    }
    catch(error){   
        res.json({success:false,message:"Error"})
    }

}

//listing orders for admin panel
const listOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})

        res.json({success:true,data:orders})

    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

//api for updating order status
const updateStatus = async (req,res) => {
    
    try{

        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

        res.json({success:true,message:"Status Updated"})

    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus,
}