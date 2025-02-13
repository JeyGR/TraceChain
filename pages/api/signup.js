import connectDb from "../../lib/mongoose";
import Officer from "../../lib/models/officer";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../lib/jwt";

export default async function handler (req,res){
    if(req.method==="Get"){
        return res.json({msg:"Get is not allowed in this route"})
    }
    try {
        const {name, email, password} = req.body;
        console.log(name+","+email+","+password);
    
        await connectDb();
    
        const userExist = await Officer.findOne({email});
        if(userExist){
            return res.json({msg:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const officer = new Officer({name:name, email:email, password:hashedPassword});
        await officer.save();
    
        const Offtoken = generateToken(officer);
    
        res.status(200).json({msg:"success", offToken: Offtoken})
    } catch (error) {
        console.log(error);
        res.json({msg:"Error"});
    }
    
}