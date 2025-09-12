const Course = require("../models/Course");
const Tag = require("../models/Tags");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImagetoCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

//create course
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      tag,
      whatYouWillLearn,
      category,
    } = req.body;
    const thumbnail = req.files.thumbnailImage;

    if (
      !courseDescription ||
      !courseName ||
      !price ||
      !tag ||
      !whatYouWillLearn ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    //get instructor details
    const userId = req.user.id;
    const instructorDetails = User.findById(userId);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const catDetails = Category.findById(category);
    if (!catDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailImage = await uploadImagetoCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      instructor: instructorDetails._id,
      tag,
      category: catDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: "Published",
    });

    //Update instructor courses list
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: (await newCourse)._id,
        },
      },
      { new: true }
    );

    //update tags course list
    await Category.findByIdAndUpdate(
      {
        _id: catDetails._id,
      },
      {
        $push: {
          courses: (await newCourse)._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: false,
      message: "Course created",
      data: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      { courseName: true, price: true, thumbnail: true, instructor: true }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting courses",
    });
  }
};

//get course details

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })

    //const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        //totalDuration,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
