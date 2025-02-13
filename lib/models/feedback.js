import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const FeedbackSchema = mongoose.Schema({
    product:{
        type:String,
        requried:[true,"Product requried"],
    },
    content:{
        type:String,
        required:[true,"Content required"],
    },
    date:{
        type:Date,
        default: Date.now,
    },
    user:{
        type:String,
        required:[true,"User require"],
    },
    uuid:{
        type:String,
        default:()=>uuidv4(),
    }
})

const Feedback= mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);