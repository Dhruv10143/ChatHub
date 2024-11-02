import user from '../Modal/User.js'

export const addUser= async (request,response)=>{
     try{
         let exist= await user.findOne({sub:request.body.sub});
         if(exist){
            response.status(200).json({msg:'user already exist'});
            return;
         }
         const newUser=new user(request.body);
         await newUser.save();
         return response.status(200).json(newUser);

     }catch(error){
        return response.status(500).json(error.message);

     }
};
export const getUsers=async(req,res)=>{
   try{
      const Users= await user.find({});
      return res.status(200).json(Users);
   }catch(error){
      return res.status(500).json(error.message);

   }
}
