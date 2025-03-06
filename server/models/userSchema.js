import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    avatar: {
        public_id: {
        type: String,
        require: true
        },    
        url: {
            type: String,
            require: true
        }
    }

},{
    timestamps: true,
}

);

export const User = models.User || ("User", Schema);