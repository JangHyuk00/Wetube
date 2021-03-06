import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest: "uploads/videos/"});
const multerAvatar = multer({dest: "uploads/avatar/"});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    } else {
        next()
    }
};

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next()
    } else {
        res.redirect(routes.home);
    }
};

export const uploadAvatar = multerAvatar.single("avatar");
export const uploadVideo = multerVideo.single("videoFile");
//single means i am going to upload only one file