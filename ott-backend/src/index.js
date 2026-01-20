const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json()); // allows reading JSON body

// All user APIs will start with /api/users
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
