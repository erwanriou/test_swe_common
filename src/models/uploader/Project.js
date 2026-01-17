const mongoose = require("mongoose")
const { Schema } = mongoose

const ProjectSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    index: true
  },
  title: {
    type: String
  }
})

module.exports = Project = mongoose.model("projects", ProjectSchema)
