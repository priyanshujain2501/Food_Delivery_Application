import mongoose from "mongoose";


const foodSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required : true,
        },
        description:{   
            type:String,
            required:true,
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type:String,
            required:true,
        },
        category:{
            type: String,
            required: true,
        }
    },
    {timestamps:true}
)

export const foodModel = mongoose.model("food",foodSchema) 

// "food" is the name of the MongoDB collection(Mongoose will automatically convert it to "foods" in the database due to pluralization rules).
// foodModel is the JavaScript variable that holds the Mongoose model, which you will use in queries.