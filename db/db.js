

const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE || "postgres://localhost/to_do_list_1"
);


module.exports = {
    db
}