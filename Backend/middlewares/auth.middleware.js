//This middleware add user id with req.body to authenticate user

import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {

    const token = req.cookies.token || req.headers.token;

    if(!token){
        return res.status(401).json({success:false,message:"Unautherized : login again"})
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = token_decode.id;

        next();
        
    } 
    catch (error) {
        
        res.staus(500).json({success:false,message:"Error : Something went wrong"});

    }

}


export default authMiddleware;