const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./Models/user");
const postModel = require("./Models/post");
const path = require("path");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const upload = require("./utils/multer");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  // res.render("login");
  res.render("login", { error: req.query.error || null });
});
app.get("/profile/upload", (req, res) => {
  res.render("profileUpload");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login", { error: req.query.error || null });
});
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("post"); //this will add the content of posts into user

  res.render("profile", { user });
});
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  // console.log(req.user);
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1); //remove the likes using splice
  }
  await post.save();
  res.redirect("/profile");
});
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/register", async (req, res) => {
  const { name, username, email, age, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) return res.status(500).send("Already Registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        name,
        username,
        email,
        age,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user._id }, "shhhhVivek");
      res.cookie("token", token);
      res.send("You have been Registered");
      res.redirect("/login");
    });
  });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let users = await userModel.findOne({ email: email });
  // if (!users) return res.status(500).send("Oops User not Found");
  if (!users) res.redirect("/login?error=notfound");

  bcrypt.compare(password, users.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: users._id }, "shhhhVivek");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.status(200).send("You have wrong credentials");
    }
  });
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  const { content } = req.body;
  const post = await postModel.create({
    user: user._id,
    content: content,
  });

  user.post.push(post._id);

  await user.save();

  res.redirect("/profile");
});

app.post("/edit/:id", async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});

app.post(
  "/upload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res, next) {
    if (!req.file) return res.send("No File selected");
    let user = await userModel.findOneAndUpdate(
      { email: req.user.email },
      { ProfilePic: req.file.filename }
    );
    await user.save();
    res.redirect("/profile");
  }
);

function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, "shhhhVivek");
    req.user = data;
    next();
  }
}

app.listen(3000);
