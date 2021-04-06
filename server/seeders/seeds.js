const db = require("../config/connection");
const { User, Reprint } = require("../models");
const faker = require("faker");
const printf = require("util").format;

db.once("open", async () => {
  // Reset model
  await User.deleteMany({});
  await Reprint.deleteMany({});

  // Create initial user for testing purposes
  // TODO: Add in more fields based on Aidan's diagram if needed
  // create user data
  const userData = [];

  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create followers
  for (let i = 0; i < 20; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let followersId = userId;

    while (followersId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      followersId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne(
      { _id: userId },
      { $addToSet: { followers: followersId } }
    );
  }

  // create followed
  for (let i = 0; i < 20; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let followedId = userId;

    while (followedId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      followedId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne(
      { _id: userId },
      { $addToSet: { followed: followedId } }
    );
  }

  // create reprints
  let createdReprints = [];
  for (let i = 0; i < 20; i += 1) {
    const title = faker.name.title();
    const asset = faker.hacker.noun();
    const caption = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const marketListing = faker.internet.url();
    // create author name from a random User's username
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    const { username: author } = createdUsers.ops[randomUserIndex];
    const createdReprint = await Reprint.create({
      title,
      asset,
      caption,
      author,
      marketListing,
    });
    await User.updateOne(
      { _id: userId },
      { $push: { reprints: createdReprint._id } },
      { runValidators: true }
    );

    createdReprints.push(createdReprint);
  }

  // create favorites
  for (let i = 0; i < 70; i += 1) {
    // get random Reprint id
    const randomReprintIndex = Math.floor(
      Math.random() * createdReprints.length
    );
    const { _id } = createdReprints[randomReprintIndex];

    // get random User id
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    await User.updateOne(
      { _id: userId },
      { $push: { favorites: { _id } } },
      { runValidators: true }
    );
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    // create author name from a random User's username
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username: author } = createdUsers.ops[randomUserIndex];
    // target random Reprint
    const randomReprintIndex = Math.floor(
      Math.random() * createdReprints.length
    );
    const { _id: reprintId } = createdReprints[randomReprintIndex];

    await Reprint.updateOne(
      { _id: reprintId },
      { $push: { comments: { commentBody, author } } },
      { runValidators: true }
    );
  }

  // create likes
  for (let i = 0; i < 100; i += 1) {
    // get a random User id
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id } = createdUsers.ops[randomUserIndex];

    // add like to random Reprint
    const randomReprintIndex = Math.floor(
      Math.random() * createdReprints.length
    );
    const { _id: reprintId } = createdReprints[randomReprintIndex];

    await Reprint.updateOne(
      { _id: reprintId },
      { $push: { likes: { _id } } },
      { runValidators: true }
    );
  }



  // Signal to developer that seeding finished
  const bgGreen = "\x1b[32m",
    colorReset = "\x1b[0m";

  console.info(printf("%Seeds successful! %s %s"), bgGreen, colorReset);
  process.exit(0);
});