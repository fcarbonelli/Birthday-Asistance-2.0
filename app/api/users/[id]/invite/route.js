import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request, { query, params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ link: params.id }, { friends: 0 });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const { friend } = await request.json();
    const link = params.id;

    const user = await User.findOneAndUpdate({ link: link }, {
      $push: { friends: friend },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify("Success"), { status: 200 });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};