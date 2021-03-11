import routes from "../routes";
import Video from "../models/Video";

export const home = async(req,res) => {
    try{
        const videos = await Video.find({});    //find all the video in DB
        res.render("home", {pageTitle: "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", {pageTitle: "Home", videos:[]});
    }
    
};
export const search = (req,res) => {
    const {query:{term: searchingBy}} = req;
    res.render("search", {pageTitle: "Search", searchingBy, videos})
};

export const getUpload = (req,res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async(req,res) => {
    const {
        body: {
            title, description
        },
        file: {path}
    } = req;
    const newVideo = await Video.create({
        //same with models/Video
        fileUrl: path,
        title,
        description
    })
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req,res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", {pageTitle: video.title, video})
    } catch(error) {
        res.redirect(routes.home);
    }
};
export const getEditVideo = async(req,res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
    } catch(error) {
        res.redirect(routes.home)
    }
};
export const postEditVideo = async(req,res) => {
    const{
        params:{id},
        body:{title, description}
    } = req;
    try {
        // i want to update but get info from it
        // _id created automatically to make sure we have unique id
        await Video.findOneAndUpdate({_id: id}, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch(error) {
        res.redirect(routes.home)
    }
};
export const deleteVideo = async(req,res) => {
    const{
        params:{id}
    } = req;
    try {
        await Video.findOneAndRemove({_id: id});
    } catch(error){}
    res.redirect(routes.home)
};