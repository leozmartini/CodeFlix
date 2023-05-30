import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    adminKey: string;
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    adminKey: String,
    username: String,
    password: String
});

const User = mongoose.model<IUser>('User', UserSchema);

module.exports = User;
