const mongoose = require('mongoose');


//Schemas
const adminSchema = mongoose.Schema({
    username: String,
    password: String
  });
  
  const userSchema = mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }]
  });
  
  const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    published: Boolean,
    price: Number,
    imageLink: String
  });
  
  //Models
  const Admin = mongoose.model("Admin", adminSchema);
  const User = mongoose.model("User", userSchema);
  const Course = mongoose.model("Course", courseSchema);
  

  module.exports = {
    Admin,
    User,
    Course
  }