const app = require("express")();
const authRoutes = require("./routes/routes");

require("./config/db.js");

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use("/auth", authRoutes);
