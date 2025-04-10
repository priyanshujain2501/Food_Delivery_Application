import mongoose from "mongoose";

export const connectDB = async () => {
    
    try {

        await mongoose.connect(`${process.env.URI}`)

        console.log("MongoDB is connected successfully")
        
    }
    catch (error) {

        console.log(error.message);       
        process.exit(1);
        
    }

}
