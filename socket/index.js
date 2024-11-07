import {Server} from "socket.io";
const io=new Server(9000,{
    cors:{
       origin:'http://localhost:3000'
    }
})
let users=[];
const addUser=(userData,socketId)=>{
    !users.some(user=>user.sub == userData.sub) && users.push({ ...userData, socketId});
}

const remuser=(sockId)=>{
    const newusers = users.filter((user) =>  user.socketId !== sockId);
    users = newusers;
}

const getUser=(userId)=>{
    return users.find(user=>user.sub===userId);
}
io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on("disconnect", () => {
        io.emit("user_disconnected", socket.id);
        remuser(socket.id);
        io.emit("getUsers",users);
    })

    io.on("emitData", account => {
        io.emit("newDevice", {user:account, sockId:socket.id});
    })
    
    socket.on("addUsers",userData=>{
        addUser(userData,socket.id);
        io.emit("getUsers",users);
    });
    socket.on('sendMessage',data=>{
        const user = getUser(data.receiverId);
        user ? io.to(user.socketId).emit('getMessage',data) : console.log("User is offline");
    })
})
