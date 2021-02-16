const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

const PORT =  process.env.PORT || 4000;

app.use(express.json({ extended: true }));
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(PORT, '0.0.0.0',() => { 
    console.log(`Server ready and running! on port ${PORT}`)
});