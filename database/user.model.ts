import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portifolioWebSite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  name: { String, required: true },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: { String, require: true, unique: true },
  password: String,
  bio: String,
  picture: String,
  location: String,
  portifolioWebSite: String,
  reputation: {
    type: Number,
    default: 0
  },
  saved: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  joinedAt: {
    type: Date,
    default: Date.now
  }
})


const User = models.User || model('User', UserSchema)

export default User
