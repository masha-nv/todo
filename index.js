const express = require("express");
const app = express();
const port = 3000;
const todoRoutes = require("./routes/todoRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/todos", todoRoutes);
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => console.log(`APP IS RUNNING ON PORT ${port}`));
