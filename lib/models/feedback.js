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
    user:{
        type:String,
        required:[true,"User required"],
    },
    userEmail:{
        type:String,
        required:[true,"Email required"]
    },
    uuid:{
        type:String,
        default:()=>uuidv4(),
    },
},{
    timestamps:true
})

const Feedback= mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
console.log(mongoose.models);

export default Feedback;