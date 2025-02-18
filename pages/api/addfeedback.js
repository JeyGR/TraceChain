import { verify } from "jsonwebtoken";
import Feedback from "../../lib/models/feedback";
import User from "../../lib/models/user";
import connectDb from "../../lib/mongoose";

export default async function handler(req,res){
    if(req.method==="GET"){
        res.json({msg:"GET is not allowed"});
    }
    else{
        try {
            await connectDb();
            const {pid, content, user} = req.body.item;
            const decode = verify(user, process.env.JWT_SECRET);
            const userEmail= decode.email;
            const userData =await User.findOne({uuid:decode.uuid})
            const feedback = new Feedback({product:pid, content:content, user:userData.name, userEmail:userData.email});
            await feedback.save();
            return res.json({msg:"success", feedback:feedback});
        } catch (error) {
            console.log("Error in adding a feedback : ", error);
            res.json({msg:"Something went wrong"});
        }
    }
}