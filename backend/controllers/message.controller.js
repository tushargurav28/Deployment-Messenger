import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
   try{

/*
const {message } = req.body is simple of const message = req.body.message

that take input from user as message

*/

    const {message} = req.body;



  /*
  this id came from request parameter

  */
    const {id:reciverId} = req.params;


  /*
  this id came from from protect route or middleware
  */

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants:{$all:[senderId,reciverId]},
    })

    if(!conversation){
       conversation = await Conversation.create({
         participants:[senderId,reciverId],
       })
    }

    const newMessage = new Message(
      {
         senderId,
         reciverId,
         message,
      }
    )
    if(newMessage){
      conversation.message.push(newMessage);
    }



    // This will run parallel
   
    // await conversation.save();
    // await newMessage.save();




    await Promise.all([conversation.save(),newMessage.save()])
   
    // SOCKET IO

    const receiverSocketId = getReceiverSocketId(reciverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}





    res.status(201).json(newMessage)


   }catch(error){
    console.log("Error in sendMessage controller:",error.message)
    res.status(500).json({error:"Internal server error"})
   }
}








export const getMessages = async (req, res)=>{

  try{

    const {id:userToChatId} =req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants :{$all :[senderId,userToChatId]},
    }).populate("message")


    if(!conversation) return res.status(200).json([]);

    const messages = conversation.message




    res.status(200).json(conversation.message)




  }catch(error){
    console.log("Error in getMessages controller:",error.message)
    res.status(500).json({error:"Internal server error"})
   }

}



