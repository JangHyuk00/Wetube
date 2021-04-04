import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {facebookLoginCallback, githubLoginCallback, kakaoLoginCallback} from "./controllers/userController";
import routes from "./routes";

// use means use a strategy from passport
passport.use(User.createStrategy());

passport.use(new GithubStrategy(
    {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
);
passport.use(new KakaoStrategy(
    {
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
));

// "hey passport, only send the user id as cookie"
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});