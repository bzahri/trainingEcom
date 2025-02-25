const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  technologies: { type: [String], required: true },
  details: { type: [String], required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
