require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/chat", (req, res) => {
  res.send("chat world");
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  res.send("chat world");
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
