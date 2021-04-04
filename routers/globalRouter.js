import { 
    getJoin, 
    postJoin, 
    getLogin,
    postLogin,
    logout, 
    githubLogin,
    postGithubLogIn,
    getMe,
    facebookLogin,
    kakaoLogin,
    postFacebookLogin,
    postKakaoLogin} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import express from "express";
import passport from "passport";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate("github", { failureRedirect: '/login' }),
    postGithubLogIn
);
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate("kakao", {failureRedirect: "/login"}),
    postKakaoLogin
)

export default globalRouter;