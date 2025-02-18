import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ProductsSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "Name is required"],
    },
    description:{
        type: String,
        required:[true, "Description is required"],
    },
    QR:{
        type: String,
    },
    cotherprops:{
        type:Map,
        of:mongoose.Schema.Types.Mixed,
        default:{},
    },
    uuid:{
        type:String,
        default:()=>uuidv4(),
    }
})

const Product = mongoose.models.Product || mongoose.model("Product", ProductsSchema);

export default Product;