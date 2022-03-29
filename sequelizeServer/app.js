const express = require("express");
// import session from 'express-session';

const cors = require("cors");
const Sequelize = require("sequelize");
// import db from './models/index'

// const router = require('./router')

const app = express();
const port = 3456;

// app.use(session({
//   secret: process.env.SECRET as string,
//   cookie: {
//     httpOnly: true,
//     secure: false
//   }
// }));
app.use(cors());
app.use(express.json()); //body parser
// app.use(router)

app.get("/", (req, res) => {
  try {
    res.send("server is connected!");
  } catch {
    res.send("server failed to connect");
    res.status(404);
  }
});
const sequelize = new Sequelize("AllForOne_DB", "postgres", "Rascals94!", {
  dialect: "postgres",
  host: "localhost",
  //   port: port,
});

// db.authenticate()
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => console.log(err, "ERROR"));
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
(async () => {
  await db.sequelize.sync();
  const port = port;
  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
})();

// async function bootstrap() {
//   await db.sequelize.sync();
// app.listen(port, () => {
//   console.log(`I'm listening on port ${port}`);
// });
// }

// bootstrap();
