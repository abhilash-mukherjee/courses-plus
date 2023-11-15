
const express = require('express')
const { Admin, Course } = require('../db');
const {ADMIN_ROLE} = require('../constants/userRoles.js')
const {authenticateAdmin} = require('../middlewares/auth.js')
const {generateJWT} = require('../helpers/jwt.js')
const router = express.Router();

router.post('/signup', async (req, res) => {
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
  
  router.post('/login', async (req, res) => {
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
  
  router.post('/courses', authenticateAdmin, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'course created successfully', courseID: course.id });
  });
  
  router.put('/courses/:courseId', authenticateAdmin, async (req, res) => {
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
  
  router.get('/courses', authenticateAdmin, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });
  
  router.get('/me', authenticateAdmin, async (req, res) => {
    res.json({ 
      username: req.admin.username,
      message: "Fetched admin details successfully"
     });
  });

  module.exports = router;