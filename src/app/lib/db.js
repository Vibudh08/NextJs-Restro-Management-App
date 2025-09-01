const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

export const connectionStr =
  "mongodb+srv://" +
  MONGO_USERNAME +
  ":" +
  MONGO_PASSWORD +
  "@next-app.aonmehh.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Next-app";
// console.log("Username:", process.env.MONGO_USERNAME);
// console.log("Password:", process.env.MONGO_PASSWORD);
