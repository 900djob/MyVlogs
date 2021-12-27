const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
require('dotenv').config();

const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
원래는 body-parser dependency를 사용해서
app.use(body-parser.urlencoded({extended: true}));
app.use(body-parser.json());
옵션을 작성해야 하지만
express 4.xx 버전 이상으로는 express에 body-parser 내장
*/
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 email을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일이 유효하지 않습니다.",
      });
    }
    //요청된 email이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 맞지 않습니다.",
        });
      //비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //token을 cookie에 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //auth 미들웨어를 통과해서 여기까지 왔으면 authentication이 통과했다는 말.
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    password: req.user.password,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send(res.json({ success: true }));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
