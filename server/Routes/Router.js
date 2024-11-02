import express, { application } from 'express'
import { addUser,getUsers } from '../Controller/user-controller.js';
import { newConversation } from '../Controller/conversation-controller.js';
import { getConversation } from '../Controller/conversation-controller.js';
import { getMessage, newMessage } from '../Controller/message-controller.js';
import { uploadFile,getImage} from '../Controller/image-controller.js';
import upload from '../utils/upload.js'
const route=express.Router();
route.post('/add',addUser);
route.get('/users',getUsers);
route.post('/conversation/add',newConversation);
route.post('/conversation/get',getConversation);
route.post('/message/add',newMessage);
route.get('/message/get/:id',getMessage);
route.post('/file/upload',upload.single("file"),uploadFile);
route.get('/file/:filename',getImage);
export default route; 