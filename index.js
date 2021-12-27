const express = require("express");
const app = express();
const port = 3000;

const config = require("./config/key")

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

const mongoose = require("mongoose");
mongoose
  .connect(
    config.mongoURI
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
