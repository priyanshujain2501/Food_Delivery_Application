import { foodModel } from "../models/food.model.js";
import fs from 'fs'


//add food item in collection
const addFood = async (req,res) => {

    try {
        const image_filename = req.file?.filename || "";

        if(image_filename === ""){
            return res.status(400).json({success:false,message: "All fields are required" })
        }
    
        const {name,description,price,category} = req.body;
    
        if([name, description, category].some((field) => field?.trim() === "")){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        if(price === "" || !price){
            console.log("Invalid price")
            return res.status(400).json({success:false, message:"All fields are required" })
        }
    
        const food = await foodModel.create({
            name,
            description, 
            price, 
            image:image_filename, 
            category,
        })
    
        if(!food){
            res.status(500).json({success:false,message:"Failed to create food item"})
        }
    
        res.status(200).json({success:true,message:"Food added"})
    } 
    catch (error) {
        console.log("catch")
        res.status(500).json({success:false,message:error.message})
    }

}


//all food item list
const listFood = async (req,res) => {

    try {

        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
        
    } 
    catch (error) {
        
        res.status(500).json({ success: false, message:"Error fetching foods"})

    }

}

//remove food item from collection
const removeFood = async (req,res) => {

    try {

        const food = await foodModel.findById(req.body.id);

        if(!food){
            return res.status(400).json({ success: false, message: "Food item not found",error})
        }

        //delete images from uploads folder
        fs.unlink(`uploads/${food.image}`,() => {})

        await food.deleteOne();

        res.status(200).json({success:true,message:"Food item removed"})

    }
    catch (error) {
        
        res.status(500).json({success:false,message:"Server error",error})

    }

}

export {
    addFood,
    listFood,
    removeFood,
}