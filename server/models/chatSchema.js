import mongoose,{ Schema, Types, model } from "mongoose";

const Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.models.Chat || ("Chat", Schema);
