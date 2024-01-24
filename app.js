const express = require("express");

const app = express();

const PORT = 3000;

const routers = require("./routers/index");

app.set("view engine", "ejs");
// app.use("/views", express.static("views"));
app.use(express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true }));

app.use(routers);

app.listen(PORT, () => {
  console.log(`Pair Project testing % ${PORT}`);
});
