import jwt from "jsonwebtoken";
import Officer from "../../lib/models/officer";
import connectDb from "../../lib/mongoose";

export default async function hanlder(req,res){
    try {
        if(req.method==="Post"){
            return res.json({msg:"Post is not allowed in this route"});
        }
        else{
            console.log(req.headers.token);
            
            const decode =jwt.verify(req.headers.token, process.env.JWT_SECRET);
            
            await connectDb();

            const officer = await Officer.findOne({uuid:decode.uuid});

            if(officer){
                return res.json({msg:"success", data:{name:officer.name, email:officer.email}});
            }
            else{
                return res.json({msg:"Session expired"});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({msg:"Unexpected error occured"});
    }
}