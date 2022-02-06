const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const path = require("path");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  //클라이언트에서 받은 비디오를 서버에 저장한다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnails", (req, res) => {
  //비디오의 썸네일과 러닝타임을 가져온다.
  let thumbsFilePath = "";
  let fileDuration = "";

  //비디오 정보 가져오기.
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    // console.dir(metadata);
    // console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });
  //썸네일 가져오기.
  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      // console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      // console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadVideo", (req, res) => {
  //비디오 정보들을 db에 저장한다.
  const video = new Video(req.body);
  video.save((err, doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })
});

router.get("/getVideos", (req, res) => {
  //db에서 비디오를 가져와서 클라이언트에 보낸다.
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, videos });
    })
});

router.post("/getVideoDetail", (req, res) => {
  //videoId를 이용해서 정보를 가져와서 VideoDetail로 보낸다.
  Video.findOne({"_id": req.body.videoId})
    .populate("writer")
    .exec((err, videoDetail) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, videoDetail });
    })

});

module.exports = router;
