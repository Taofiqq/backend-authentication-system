const app = require("express")();
const cors = require("cors");
const authRoutes = require("./routes/routes");
require("dotenv").config();
require("./config/db.js");

const bodyParser = require("express").json();

app.use(bodyParser);
app.use(cors());
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/auth", authRoutes);
