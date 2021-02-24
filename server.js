const express = require("express");
const path = require("path");
const app = express();

//Bodyparser Middleware
app.use(express.json());

app.use("/api/sites", require("./routes/sites"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Set up port
// const port = process.env.PORT || 5000;
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
