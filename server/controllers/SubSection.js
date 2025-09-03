const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImagetoCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;

    //extract file/video
    const video = req.files.videoFile;

    //validation
    if (!title || !timeDuration || !description || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //upload video to cloudinary
    const uploadDetails = await uploadImagetoCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //creating section
    const SubSectionDetails = await SubSection.create({
      title,
      description,
      timeDuration,
      videoUrl: uploadDetails.secure_url,
    });

    //updating section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    //log updated section here after adding populated query
    console.log(updatedSection);

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating subsection",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, timeDuration, subSectionId } = req.body;
    if (!title || !description || !timeDuration || subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    const subSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      { title, description, timeDuration },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating subsection",
      error: error.message,
    });
  }
};

//delete subsection

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;

    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting subsection",
      error: error.message,
    });
  }
};
