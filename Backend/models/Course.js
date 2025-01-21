const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: Number,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
}); //Course schema for mongodb.

module.exports = mongoose.model("Course", courseSchema);
