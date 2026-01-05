const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const dbConnection = require("./src/config/dbConnection");
const userRouter = require("./src/routes/userRoute");
const authRouter = require("./src/routes/authRoute");
const productRouter = require("./src/routes/productRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const reviewRouter = require("./src/routes/reviewRoute");
const orderRouter = require("./src/routes/orderRoute");

require("dotenv").config();


const Port = process.env.PORT || 8000;
const app = express();
dbConnection();
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
];

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "src", "images")));
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//routes
app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/product", productRouter)
app.use("/category", categoryRouter)
app.use("/review", reviewRouter)
app.use("/order", orderRouter)


//server
app.listen(Port, () => {
    console.log(`Server is running on PORT : ${Port}`)
})