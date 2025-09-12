const express = require("express");
const app = express();
const userRoute = require("./routes/User");
const contactRoute = require("./routes/Contact");
const courseRoute = require("./routes/Course");
const paymentRoute = require("./routes/Payments");
const profileRoute = require("./routes/Profile");

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://codemon-self.vercel.app", // your frontend URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running",
  });
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
