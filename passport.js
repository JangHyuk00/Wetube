import passport from "passport";
import User from "./models/User";

// use means use a strategy from passport
passport.use(User.createStrategy());