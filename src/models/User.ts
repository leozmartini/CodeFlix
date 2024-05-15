import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    userType: string;
    lastLogin: string;
}

const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    userType: String,
    lastLogin: String
});

const User = mongoose.model<IUser>('User', UserSchema);

module.exports = User;
