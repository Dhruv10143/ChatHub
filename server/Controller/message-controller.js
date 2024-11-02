import message from "../Modal/Message.js"
import conversation from "../Modal/Conversation.js";
export const newMessage=async(request,response)=>{
    try{
         const newMessage=new message(request.body);
         await newMessage.save();
         await conversation.findByIdAndUpdate(request.body.conversationId,{message:request.body.text});
         return response.status(200).json('Message has been sent Successfully');
    }catch(error){
        return response.status(505).json(error.message);

    }

}
export const getMessage=async(req,res)=>{
    try{
         const messages=await message.find({conversationId:req.params.id});
         return res.status(200).json(messages);
    }catch(error){
         return res.status(500).json(error.message);
    }
}