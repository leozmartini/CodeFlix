import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    userType: Number;
    lastLogin: string;
}

const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    userType: Number,
    lastLogin: String
});

const User = mongoose.model<IUser>('User', UserSchema);

module.exports = User;
