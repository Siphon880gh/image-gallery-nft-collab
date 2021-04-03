const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')

// const favoriteSchema = new Schema(
//   {
//     reprintId: {
//       type: Schema.Types.ObjectId,
//       ref: "Reprint",
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//     id: false,
//   }
// );

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    reprints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reprint",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reprint",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followed: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// count reprints
userSchema.virtual("reprintCount").get(function () {
  return this.reprints.length;
});

// count followers
userSchema.virtual("followerCount").get(function () {
  return this.followers.length;
});

// count followed
userSchema.virtual("followedCount").get(function () {
  return this.followed.length;
});

// count favorites
userSchema.virtual("favoriteCount").get(function () {
  return this.favorites.length;
});

const User = model("User", userSchema);

module.exports = User;
