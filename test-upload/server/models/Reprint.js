const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    //   get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const reprintSchema = new Schema(
  {
    title: {
      type: String,
      required: "Please enter a Title for your Reprint post!",
      minLength: 1,
    },
    asset: {
      type: String,
      required: "Please enter a valid Reprint asset for your post!",
    },
    author: {
      type: String,
      required: "Please enter your Username!",
    },
    caption: {
      type: String,
      maxLength: 500,
    },
    marketListing: {
      type: String,
      required:
        "Please enter the URL to the Market Listing of the acutal NFT that the Reprint asset is derived from!",
      match: [/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,"Please enter a valid Market Listing URL!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter to format createdAt data before it gets to the controllers
      // get: (createdAtVal) => dateFormat(createdAtVal),
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
      virutals: true
    },
  }
);
reprintSchema.virtual('commentCount').get(function() {
    return this.comments.length
})

reprintSchema.virtual('likeCount').get(function() {
    return this.likes.length
})

const Reprint = model("Reprint", reprintSchema);

module.exports = Reprint;
