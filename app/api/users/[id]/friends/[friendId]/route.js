import { connectToDB } from "@utils/database";
import User from "@models/user";
const mongoose = require('mongoose');

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const friendId = new mongoose.Types.ObjectId(params.friendId);

    const friend = user.friends.find(friend => friend._id.equals(friendId));

    if (!friend) {
      return new Response("Friend not found", { status: 404 });
    }

    return new Response(JSON.stringify(friend), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch friend", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { sendEmail } = await request.json();

  try {
      await connectToDB();

      const user = await User.findById(params.id);

      if (!user) {
          return new Response("User not found", { status: 404 });
      }

      const friendId = new mongoose.Types.ObjectId(params.friendId);
      const friendIndex = user.friends.findIndex(friend => friend._id.equals(friendId));

      if (friendIndex === -1) {
        return new Response("Friend not found", { status: 404 });
      }

      if (sendEmail) {
        user.friends[friendIndex].sendEmail = sendEmail;
      }

      await user.save();

      return new Response("Successfully updated the User Send Email", { status: 200 });
  } catch (error) {
    console.log(error);
      return new Response("Error Updating User", { status: 500 });
  }
};