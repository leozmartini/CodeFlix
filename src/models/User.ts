import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    lastLogin: string;
}

const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    lastLogin: String
});

const User = mongoose.model<IUser>('User', UserSchema);

module.exports = User;
