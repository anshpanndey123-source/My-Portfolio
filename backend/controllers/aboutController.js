import About from "../models/About.js";

export const getAbout = async (req, res) => {
  const data = await About.findOne();
  res.json(data);
};

export const updateAboutImage = async (req, res) => {

  let about = await About.findOne();
  if (!about) about = await About.create({});

  about.image = req.file.path; // cloudinary url
  about.updatedAt = new Date();
  await about.save();

  res.json({ success: true, image: about.image });
};

export const updateResume = async (req, res) => {

  let about = await About.findOne();
  if (!about) about = await About.create({});

  about.resume = req.file.path;
  about.updatedAt = new Date();
  await about.save();

  res.json({ success: true, resume: about.resume });
};
