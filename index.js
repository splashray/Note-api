const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const cors = require("cors");
const path = require("path");

//import coustom middlware
const config = require("./utils/config");
const connectDB = require("./utils/dbConn");
const notFound = require("./middlewares/not-found");

//import custom router
const authRouter = require("./routes/authRouter");
const noteRouter = require("./routes/noteRouter");
const userRouter = require("./routes/userRouter");

const app = express();
connectDB();

//middleware
app.use(cors());
// app.use(cookieParser())
app.use(express.json());
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // #swagger.tags = ['Testing']
  // #swagger.summary = 'Testing API'
  // #swagger.description = 'Endpoint to check if API is working.'
  res.send(`Welcome to Note-Taking Api-
    Click <a href="https://note-taking-app-api.onrender.com/doc">here</a> for Documentation.`)
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.use("/api/user", userRouter);



app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(notFound);

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(config.PORT, () => {
    console.log(`connected to backend - ${config.PORT}`);
  });
});
//with this setup, app won't listen until mongoDB is cconnected. Helps avoid future error
