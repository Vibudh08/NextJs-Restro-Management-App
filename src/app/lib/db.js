const {username,password} = process.env

export const connectionStr =
  "mongodb+srv://"+username+":"+password+"@next-app.aonmehh.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Next-app";