import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import {getIO} from "../socket.js"
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text, image } = req.body;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required.",
      });
    }

    if (!text?.trim() && !image) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty.",
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      text: text?.trim() || "",
      image: image || "",
      seenBy: [req.user._id],
    });

    conversation.lastMessage = message._id;
    await conversation.save();
const io = getIO();

const receiverId = conversation.participants.find(
  (id) => id.toString() !== req.user._id.toString()
);

io.to(receiverId.toString()).emit(
  "receive-message",
  populatedMessage
);
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name email avatar");

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: populatedMessage,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};