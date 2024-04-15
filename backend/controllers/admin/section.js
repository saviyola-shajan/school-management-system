import asyncHandler from "express-async-handler";
import Section from "../../modles/class/sectionModel.js";

//add section
export const addSection = asyncHandler(async (req, res) => {
  try {
    const { sectionName } = req.body;
    if (!sectionName) {
      return res.status(400).json({ message: "Enter all fields" });
    }
    const section = await Section.findOne({ sectionName });
    if (section) {
      return res.status(400).json({ message: "Section already exist" });
    }
    const addSection = await Section.create({
      sectionName,
    });
    await addSection.save();
    return res.status(200).json({ message: "Section added sucessfully" });
  } catch (error) {
    throw new Error(error);
  }
});

//get all sections
export const getAllSections = asyncHandler(async (req, res) => {
  try {
    const sections = await Section.find({});
    res.status(200).json({ sections, message: "All sections rendered" });
  } catch (error) {
    throw new Error(error);
  }
});
