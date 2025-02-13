import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const OfficerSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, 'Name is required'],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
    },
    designation:{
        type:String,
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    products:[{
        type:String,
    }],
    uuid:{
        type:String,
        default :()=> uuidv4(),
        unique:true,
    }
})


const Officer = mongoose.models.Officer || mongoose.model('Officer', OfficerSchema);


export default Officer;