const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE || "postgres://localhost/to_do_list_1"
);

const Task = db.define("task", {
  name: Sequelize.DataTypes.STRING,
});

Task.generateRandom = function () {
  return this.create({ name: `Task ${Math.round(Math.random() * 5000)}` });
};

const init = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all([
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
const path = require('path')

app.get('/', (req,res) => res.sendFile(path.join(__dirname,"index.html")))

app.get("/api/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (ex) {
    next(ex);
  }
});

app.post('/api/tasks/', async(req,res,next) => {
  try{  res.status(201).send(await Task.generateRandom())

  }
  catch(ex) {
    next(ex)
  }
})

app.delete("/api/tasks/:id", async (req, res, next) => {
  try {
    const tasks = await Task.findByPk(req.params.id);
    await tasks.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
