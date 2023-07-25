const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://postgres:postgres@192.168.1.201:5432/postgres",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
});

module.exports = {
  datasource: AppDataSource,
};
