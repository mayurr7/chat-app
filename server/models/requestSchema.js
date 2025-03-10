import mongoose,{ Schema, Types, model } from "mongoose";


const schema = new Schema(
  {
    content: String,

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },

    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    recevier: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.models.Request || model("Request", schema);
