import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    adminKey: string;
    username: string;
    password: string;
    lastLogin: string;
}

const UserSchema: Schema = new Schema({
    adminKey: String,
    username: String,
    password: String,
    lastLogin: String
});

const User = mongoose.model<IUser>('User', UserSchema);

module.exports = User;
