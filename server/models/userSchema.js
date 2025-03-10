import mongoose, { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    bio: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  },
  {
    timestamps: true,
  }
);


schema.pre("save", async function(next) {

  if(!this.isModified("password")) next();
    this.password = await hash(this.password, 10);
});

export const User = mongoose.models.User || model("User", schema);
