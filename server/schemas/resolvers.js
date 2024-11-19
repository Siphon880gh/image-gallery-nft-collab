const { User, Reprint } = require("../models");

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const Auth = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const myUser = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("reprints")
          .populate("favorites")
          .populate("followers")
          .populate("followed");

        return myUser;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("reprints")
        .populate("favorites")
        .populate("followers")
        .populate("followed");
    },
    usersByFilter: async (parent, { username }) => {
      return User.find({ username: {$regex: username, $options: "i"} })
        .select("-__v -password")
        .populate("reprints")
        .populate("followers")
        .populate("followed");
    },
    author: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("reprints")
        .populate("followers")
        .populate("followed");
    },
    userById: async (parent, { _id }) => {
      return User.findOne({ _id })
        .select("-__v -password")
        .populate("reprints")
        .populate("followers")
        .populate("followed");
    },
    reprint: async (parent, { title }) => {
      return Reprint.findOne({ title })
        .select("-__v")
        .populate("likes")
        .populate("comments");
    },
    reprintById: async (parent, { _id }) => {
      return Reprint.findOne({ _id })
        .select("-__v")
        .populate("likes")
        .populate("comments");
    },
    stream: async () => {
      return Reprint.find().select("-__v").populate("likes");
    },
    myFavorites: async (parent, args, context) => {
      if (context.user) {
        const myUser = await User.findOne({ _id: context.user._id })
          .select("-__v -password -followers -followed -reprints")
          .populate("favorites")

        return myUser;
      }

      throw new AuthenticationError("Not logged in");
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      // create User
      const user = await User.create(args);
      // assign JWT to User
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      // check for matching username
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // check password hash
      const correctPw = await user.isCorrectPassword(password);

      // check for matching password
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // sign JWT
      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const deletedUser = await Reprint.findOneAndDelete(
          { username: context.user.username }
        );
        return deletedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUserV2: async (parent, args, context) => {
      // User will be deleted from MongoDB inside server/utils/auth.js
      if(context.user) {
        Auth.permanentlyRevoke(context);
      }
    },
    addReprint: async (parent, args, context) => {
      if (context.user) {
        const reprint = await Reprint.create({
          ...args,
          author: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reprints: reprint._id } },
          { new: true }
        );

        return reprint;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    deleteReprint: async (parent, { reprintId }, context) => {
      if (context.user) {
        const deletedReprint = await Reprint.findOneAndDelete(
          { _id: reprintId, author: context.user.username },
          { runValidators: true }
        );

        const author = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { reprints: reprintId } },
          { new: true }
        );

        return author;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { reprintId, commentBody }, context) => {
      if (context.user) {
        const updatedReprint = await Reprint.findOneAndUpdate(
          { _id: reprintId },
          {
            $push: { comments: { commentBody, author: context.user.username } },
          },
          { new: true, runValidators: true }
        );

        return updatedReprint;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { reprintId, commentId }, context) => {
      if (context.user) {
        const updatedReprint = await Reprint.findOneAndUpdate(
          {
            $or: [
              { _id: reprintId, comments: { author: context.user.username } },
              { _id: reprintId, author: context.user.username },
            ],
          },
          {
            $pull: { comments: { _id: commentId } },
          },
          { new: true, runValidators: true }
        );

        return updatedReprint;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    follow: async (parent, { followedId }, context) => {
      if (context.user) {
        const followingUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { followed: followedId } },
          { new: true, runValidators: true }
        );
        const followedUser = User.findOneAndUpdate(
          { _id: followedId },
          { $addToSet: { followers: { _id: context.user._id } } },
          { new: true, runValidators: true }
        );
        return followedUser;
        // };
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    unfollow: async (parent, { followedId }, context) => {
      if (context.user) {
        const unfollowingUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { followed: followedId } },
          { new: true, runValidators: true }
        );
        const unfollowedUser = User.findOneAndUpdate(
          { _id: followedId },
          { $pull: { followers: context.user._id } },
          { new: true, runValidators: true }
        );
        return unfollowedUser;
        // };
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    like: async (parent, { reprintId }, context) => {
      if (context.user) {
        const updatedReprint = await Reprint.findOneAndUpdate(
          { _id: reprintId },
          { $addToSet: { likes: context.user._id } },
          { new: true, runValidators: true }
        );

        return updatedReprint;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    unlike: async (parent, { reprintId }, context) => {
      if (context.user) {
        const updatedReprint = await Reprint.findOneAndUpdate(
          { _id: reprintId },
          { $pull: { likes: context.user._id } },
          { new: true, runValidators: true }
        );

        return updatedReprint;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    favorite: async (parent, { reprintId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: reprintId } },
          { new: true }
        ).populate("favorites");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    unfavorite: async (parent, { reprintId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: reprintId } },
          { new: true }
        ).populate("favorites");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;

