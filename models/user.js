import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  image: {
    type: String,
  },
  link: {
    type: String,
    unique: [true, 'Link already exists!'],
    required: [true, 'Link is required!'],
    default: '',
  },
  isPublic: {
    type: Boolean,
    default: false,
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
    sendEmail: {
      type: Boolean,
      default: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;