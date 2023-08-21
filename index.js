require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.route");
const { doctorRoute } = require("./routes/doctor.route");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/doctor", doctorRoute);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server running on port ${process.env.PORT}`);
});
