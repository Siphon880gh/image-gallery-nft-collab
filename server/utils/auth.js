const jwt = require('jsonwebtoken');
require("dotenv").config({path:"./config/.env"});
const process = require("process");

// For permanently revoking user
const { User } = require("../models");

// set token secret and expiration date
const secret = process.env.JWT_PASS; // TODO: Future production version will have this in an .env file
const secretGoogleCloud = {
  auth: process.env.GOOGLE_CLOUD_AUTH,
  storage: process.env.GOOGLE_CLOUD_STORAGE2
}

const expiration = '2h';

// Auth error logging
const fs = require("fs");
const path = require("path");

module.exports = {

  // function for our authenticated routes
  authMiddlewareNewer: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    next();
  },

  // function for our authenticated routes
  authMiddleware: function({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      // const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { 
      username, 
      email, 
      _id, 
      secretGoogleCloudAuth: secretGoogleCloud.auth,
      secretGoogleCloudStorage: secretGoogleCloud.storage
    };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  permanentlyRevoke: async function (context) {

    // let token = req.body.token || req.query.token || req.headers.authorization;
    // const { data: context } = jwt.verify(token, secret, { expiresIn: expiration });
    
    if(context.user) {
      // console.log("Attempt deleting user id: " + context.user._id);
      const deletedUser = await User.findByIdAndRemove(context.user._id);
      if (!deletedUser) {
        // console.log({error:"Cannot find user to delete"});
      } else {
        // console.log({
        //   debug:`Should be deleted username ${context.user.username} / id ${context.user._id}`,
        //   deletedUser
        // });
        // console.log("Permanently revoked user on the server");
      }
    } // if
  } // permanentlyRevoke
};
