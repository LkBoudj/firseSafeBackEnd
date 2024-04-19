import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import session from "express-session";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import local, { serializeUser, deserializeUser } from "./strategy/local.mjs";
import { pathJoin } from "../direFilePath.mjs";

// routers
import { streamRouter, authRouter } from "./routers/index.mjs";

const app = express();

//videos path

app.use(express.static("public"));
session;
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
//initialization
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(local);
//morgan
app.use(morgan("dev"));
// cors origin path
app.use(cors({ origin: "*" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/stream", streamRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    data: null,
    errors: [
      {
        message: error.message,
      },
    ],
  });
});

export default app;
