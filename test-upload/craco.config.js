const path = require('path')
const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'auth': JSON.stringify(["weffung@ucdavis.edu", "firebase-cloud-login-123"]),
            'storage': JSON.stringify({
              apiKey: "AIzaSyAtTwL6D5trrLf1h2xtTnGkMMzoralDl2o",
              authDomain: "reprint-fd4e0.firebaseapp.com",
              projectId: "reprint-fd4e0",
              storageBucket: "reprint-fd4e0.appspot.com",
              messagingSenderId: "828177439574",
              appId: "1:828177439574:web:e8f5e5cf9759e48c9f94f7"
            })
          }
        })
    ]
  },
}