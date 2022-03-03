const router = require("express").Router();
const { Task } = require("../db/models");

router.get("/api/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (ex) {
    next(ex);
  }
});

router.post("/api/tasks/", async (req, res, next) => {
  try {
    res.status(201).send(await Task.generateRandom());
  } catch (ex) {
    next(ex);
  }
});

router.delete("/api/tasks/:id", async (req, res, next) => {
  try {
    const tasks = await Task.findByPk(req.params.id);
    await tasks.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
