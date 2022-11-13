const express = require("express");
const app = express();
const seed = require("./db/seed");
const { userRouter, showRouter } = require("./routes");
const cors = require('cors')

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);
app.use("/shows", showRouter);

app.listen(5001, () => {
  seed();
  console.log("Listening on port 5001");
});

module.exports = app;
