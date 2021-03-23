import passport from "passport";
import User from "./models/User";

// use means use a strategy from passport
passport.use(User.createStrategy());

// "hey passport, only send the user id as cookie"
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());