
import Feedback from "../../lib/models/feedback";
import connectDb from "../../lib/mongoose";

export default async function handler(req, res){
    if(req.method==="GET"){
        res.json({msg:"GET method not allowed"});
    }
    else{
        try {
            await connectDb();
            const {pid} = req.body;
            const feedbacks = await Feedback.find({product:pid}, {timestamps:0});
            res.json({msg:"success", feedbacks:feedbacks});
        } catch (error) {
            console.log("Error from getting feedbacks : ", error);
            res.json({msg:"Something went wrong"});
        }   
    }
}