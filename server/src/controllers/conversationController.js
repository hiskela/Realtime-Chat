import Conversation from "../models/Conversation.js";
import asyncHandler from "../utils/asyncHandler.js"

export const createConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });

    res.status(201).json(conversation);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.user._id,
  })
    .populate("participants", "name email avatar isOnline lastSeen")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "name",
      },
    })
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    data: conversations,
  });
});