const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// //try {

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Error creating rating",
//             error: error.message
//         })
//     }
//create rating

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    //check user is already enrolled
    const courseDetails = await Course.findOne({ _id: courseId });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }
    if (!courseDetails.studentsEnrolled.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in the course",
      });
    }

    //check user already reviewed the course or not

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed the course",
      });
    }

    //create rating and review
    const ratingReview = RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    //update the course with this rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: (await ratingReview)._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);
    return res.status(200).json({
      success: false,
      message: "Rating and Review created",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating rating",
      error: error.message,
    });
  }
};

//get average rating
exports.getAverageRating = async (req, res) => {
  try {
    //get course ID
    const courseId = req.body.courseId;
    //calculate avg rating

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating/Review exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
