import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.js";
import colors from "colors";
import RouterProduct from "./routes/RouterProduct.js";
import RouterUsers from "./routes/RouterUsers.js";
import RouterOrder from "./routes/RouterOrder.js";
import path from "path";
import uploadRoutes from "./routes/UploadRoutes.js";
import cloudinary from "cloudinary";
const app = express();

connectDB();
dotenv.config();
console.log("server conncected now");

app.use(express.json());

// if(process.env.NODE_ENV==='development'){
//     app.use(morgan('dev'))

// }

app.use("/api/products", RouterProduct);
app.use("/api/users", RouterUsers);
app.use("/api/orders", RouterOrder);
app.use("/api/upload", uploadRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);

app.use(errorHandler);

//connect cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
