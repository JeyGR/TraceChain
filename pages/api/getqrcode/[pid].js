import QRcode from "qrcode";

export default async function handler (req,res){
    if(req.method==="POST"){
        return res.json({msg:"Post method is not allowed in this route"});
    }
    else{
        const {pid} = req.query;
        try {
            const QrCodeImage = await QRcode.toDataURL(pid, {type:"png"});
            const filename = `${pid}-qr-code.png`;
            res.json({msg:"success", qrCode: QrCodeImage , fileName : filename});
        } catch (error) {
            console.log("Error in generating QR code : ", error);
            return res.json({msg:"Something went wrong"});
        }
    }
}
export const config ={
    api:{
        bodyParser:{
            sizeLimit:"2mb",
        },
    },
    duration: 5,
}