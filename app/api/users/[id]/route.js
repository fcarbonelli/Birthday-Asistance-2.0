import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PATCH = async (request, { params }) => {
    const { isPublic } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        user.isPublic = isPublic;

        await user.save();

        return new Response("Successfully updated the User Public Profile", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};