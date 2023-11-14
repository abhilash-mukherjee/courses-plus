
const express = require('express')
const mongoose = require('mongoose');
const { Admin, User, Course } = require('./db');
const {authenticateAdmin, authenticateUser} = require('./middlewares/auth.js')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express()
const port = 3000
const USER_ROLE = "User";
const ADMIN_ROLE = "Admin";

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.json());
app.use(cors());

function generateJWT(username, role) {
  const token = jwt.sign({ username }, role === USER_ROLE ? process.env.SECRET_KEY_USER : process.env.SECRET_KEY_ADMIN, { expiresIn: '1h' });
  return token;
}

//Admin Routes

app.post('/admin/signup', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(403).json({ message: "Please give your username and password" });
  }
  else {
    const admin = await Admin.findOne({ username: req.body.username });
    if (admin) return res.status(403).json({ message: "admin already exists" });
    try {
      const newAdmin = await Admin.create(
        {
          username: req.body.username,
          password: req.body.password
        }
      )
      await newAdmin.save();
      const token = generateJWT(newAdmin.username, ADMIN_ROLE);
      res.json({
        message: "User created successfully",
        token
      });
    }
    catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.post('/admin/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(403).json({ message: "Please give your username and password" });
  }
  else {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin || admin.password !== req.body.password)
      return res.status(403).json({ message: "Invalid Login" });
    try {
      const token = generateJWT(admin.username, ADMIN_ROLE);
      res.json({
        message: "Logged In successfully",
        token
      });
    }
    catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.post('/admin/courses', authenticateAdmin, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'course created successfully', courseID: course.id });
});

app.put('/admin/courses/:courseId', authenticateAdmin, async (req, res) => {
  try {
    console.log(req.params.courseId);
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (!course) {
      res.status(403).json({message: 'Course not found'});
      return;
    }
    else {
      res.json({ message: 'couse updated successfully', course });
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
);

app.get('/admin/courses', authenticateAdmin, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

app.get('/admin/me', authenticateAdmin, async (req, res) => {
  res.json({ 
    username: req.admin.username,
    message: "Fetched admin details successfully"
   });
});

//user paths

app.post('/users/signup', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    console.log(JSON.stringify(req.body));
    res.status(403).json({ message: "Please give your username and password" });
  }
  else {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(403).json({ message: "user already exists" });
    try {
      const newUser = new User(
        {
          username: req.body.username,
          password: req.body.password,
          purchasedCourses: []
        }
      )
      await newUser.save();
      const token = generateJWT(newUser.username, USER_ROLE);
      res.json({
        message: "User created successfully",
        token
      });
    }
    catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.post('/users/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(403).json({ message: "Please give your username and password" });
  }
  else {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password)
      return res.status(403).json({ message: "Invalid Login" });
    try {
      const token = generateJWT(user.username, USER_ROLE);
      res.json({
        message: "Logged In successfully",
        token
      });
    }
    catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
});

app.get('/users/courses', authenticateUser, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

app.post('/users/courses/:courseId', authenticateUser, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    if (!req.user.purchasedCourses.some(purchasedCourse => purchasedCourse.toString() === req.params.courseId)) {
      req.user.purchasedCourses.push(course.id);
      await req.user.save();
      res.json({ message: 'course purchased successfully', user: req.user });
    }
    else {
      res.json({ message: 'course already purchased' });
    }
  }
  else {
    res.status(403).json({ message: "course not found" });
  }
});

app.get('/users/purchasedCourses', authenticateUser, async (req, res) => {
  const user = await User.findById(req.user.id).populate('purchasedCourses')
  res.json({ purchasedCourses: user.purchasedCourses || [] });
});

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("App connected")).catch(e => console.log(error.message));


