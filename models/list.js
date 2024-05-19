import { Schema, model, models } from 'mongoose';

const ListSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    subscribers: [{
        type: String,
        required: true,
    }],
    link: {
        type: String,
        unique: [true, 'Link already exists!'],
        required: [true, 'Link is required!'],
        default: '',
    },
    friends: [{
        friendId: {
        type: Number,
        },
        name: {
        type: String,
        },
        day: {
        type: Number,
        min: 1,
        max: 31,
        },
        month: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const List = models.List || model("List", ListSchema);

export default User;