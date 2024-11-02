import Conversation from '../Modal/Conversation.js';

export const newConversation = async (request, response) => {
    try {
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;

        // Ensure that senderId and receiverId are properly checked as an array
        const exist = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
        if (exist) {
            return response.status(200).json('Conversation already exists');
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        });

        await newConversation.save();
        return response.status(200).json('Conversation saved successfully');
    } catch (error) {
        return response.status(500).json(error.message);
    }
};
export const getConversation=async(req,res)=>{
    try{
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        let conversation= await Conversation.findOne({members:{$all:[senderId,receiverId] }});
        return res.status(200).json(conversation);
    }catch(error){
        return res.status(500).json(error.message);
        
    }
}
