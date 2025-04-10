import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//create token 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req,res) => {

    try {

        const { name, email, password } = req.body;

        if ([name, email,password].some((field) => field?.trim() === "")){
            return res.status(400).json({success:false,message:"All fields are required"})
        } 

        const existedUser = await userModel.findOne({email});

        if(existedUser){
            return res.status(409).json({message:"User already registered"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.status(400).json({ message: "Please enter a strong password" })
        }

        //hashing user password
        const hashedPassword = await bcrypt.hash(password,10); 

        const newUser = await userModel.create({
            name,
            email,
            password:hashedPassword,
        })

        //check user created or not 

        const createdUser = await userModel.findById(newUser._id).select(" -password ")

        if(!createdUser){
            return res.status(500).json({ message:"Something went wrong while registering the user"})
        }

        const token = createToken(createdUser._id)

        res.status(200).cookie("token",token).json({success:true,token})
        
    } 
    catch (error) {
        return res.status(500).json({success:false,message:error.message})

    }

}


//login
const loginUser = async (req,res) => {

    try {

        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({success:false,message:"email and password are required"})
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        
        res.status(200).cookie("token",token).json({success:true,token});

    }
    catch (error) {

        return res.status(500).json({success:false,message:error.message})
        
    }



}

//logout
const logoutUser = async(req,res) => {
    
    const {id} = req.body

    

}

export {
    loginUser,
    registerUser,
    logoutUser,
}