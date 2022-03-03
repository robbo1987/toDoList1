const { db } = require("./db/db");
const { Task } = require("./db/models");
const tasks = require('./routes/tasks')

const init = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all([
      Task.create({ name: "Do the laundry" }),
      Task.create({ name: "Study for Fullstack" }),
      Task.create({ name: "Walk the Dogs" }),
      Task.create({ name: "Go Grocery Shopping" }),
      Task.generateRandom(),
      Task.generateRandom(),
      Task.generateRandom(),
    ]);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();

const express = require("express");
const app = express();
const path = require("path");

app.use('/', tasks)

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

