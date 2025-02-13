import Officer from "../../lib/models/officer";
import { generateToken } from "../../lib/jwt";
import bcrypt from "bcryptjs";
import connectDb from "../../lib/mongoose";

export default async function handler(req,res){
    try {
        if(req.method==="Get"){
            return res.json({msg:"Get method is not allowed in the route"});
        }
        else{
            await connectDb();
            const {email, password} = req.body;
    
            const user = await Officer.findOne({email});
    
            if(!user){
                console.log("User does not exist");
                return res.json({msg:"User not found"});
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.json({msg:"Invalid credentials"});
            }
            else{
                const offToken = generateToken(user);
                return res.json({msg:"success", token:offToken});
            }
        }
    } catch (error) {
        console.log("Error in officer login: ", error);
        return res.json({msg:"Unexpected error occured"});
    }
}