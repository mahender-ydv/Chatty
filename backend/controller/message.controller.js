import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getAIResponse } from "../lib/gemini.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//     });

//     await newMessage.save();

//     console.log("Hello")
//     if(receiverId == "68c91a6dbeb8f9c08035f404"){
//       const aiText = await getAIResponse(text);

//       const aiMessage = new Message({
//         senderId : "68c91a6dbeb8f9c08035f404" , 
//         receiverId : req.user._id,
//         text : aiText,
//         image: "",
//       });
//       console.log(aiMessage.text);
//       res.status(201).json([newMessage, aiMessage]);


//       return;

//     }

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }
//     io.to(receiverId).emit("stopTyping", { userId: senderId });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };







export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params; // receiver user ID
    const senderId = req.user._id;

    // Upload image if provided
    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Save user message
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // If sending to a normal user
    if (receiverId !== "68c91a6dbeb8f9c08035f404") { // bot ID
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

      // Stop typing event
      io.to(receiverId).emit("stopTyping", { userId: senderId });

      return res.status(201).json(newMessage);
    }

    // --- If sending to AI bot ---
    const aiText = await getAIResponse(text);

    const aiMessage = new Message({
      senderId: receiverId, // bot ID
      receiverId: senderId, // original user
      text: aiText,
      image: "",
    });
    await aiMessage.save();

    
    const userSocketId = getReceiverSocketId(senderId);
    if (userSocketId) io.to(userSocketId).emit("newMessage", aiMessage);

    return res.status(201).json([newMessage, aiMessage]);

  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
