const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const authMiddleware = require("../middleware/authorizationMiddleware"); // middleware for authorization

// Create Course Route
router.post("/createCourse", authMiddleware, async (req, res) => {
  try {
    const { courseId, courseName, description, instructorName, price } =
      req.body;

    const existingCourse = await Course.findOne({
      $or: [{ courseName: courseName }, { courseId: courseId }],
    }); //mongodb query to find the course name or id.
    if (existingCourse) {
      return res
        .status(400)
        .json({ message: "CourseId or Course Name already exists" });
    }

    const newCourse = new Course({
      courseId,
      courseName,
      description,
      instructorName,
      price,
    });
    await newCourse.save();

    res.status(201).json({ message: "Course registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Get All courses Route
router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courseArray = await Course.find(); //mongodb query to find all courses.
    res.status(200).json(courseArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Get Course By Id Route
router.get("/course/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ courseId: id }); //mongodb query to find the course by id.

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Delete Course By Id Route
router.delete("/course/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCourse = await Course.findOneAndDelete({ courseId: id }); //mongodb query to delete the course by id.

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Update Course By Id Route
router.put("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { courseId, courseName, description, instructorName, price } =
      req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      { courseId: id },
      { courseId, courseName, description, instructorName, price },
      { new: true } // Return the updated document
    ); //mongodb query to find and update course by id.

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating course" });
  }
});

module.exports = router;
