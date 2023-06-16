const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userControl");

const app = express();
app.use(bodyParser.json());

app.use("/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
