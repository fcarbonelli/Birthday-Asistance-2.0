import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user's friends", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const friendId = request.headers.get("X-Friend-Id");

    // Find the user by ID
    await User.findByIdAndUpdate(params.id, {
      $pull: { friends: { _id: friendId } },
    });

    return new Response("Friend deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting friend", { status: 500 });
  }
};