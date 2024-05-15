const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const app = express();
const port = 5000;

// If you want to use request.body then you have to use the middleware
app.use(express.json());

app.use("/api/authorization", require("./routes/authorization"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});