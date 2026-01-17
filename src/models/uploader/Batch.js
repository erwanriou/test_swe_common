const mongoose = require("mongoose")
const { Schema } = mongoose

const BatchSchema = new Schema(
  {
    _project: {
      type: Schema.Types.ObjectId,
      index: true
    },
    _user: {
      type: Schema.Types.ObjectId,
      index: true
    },
    status: {
      type: String,
      enum: ["CREATED", "UPLOADING", "FINALIZING", "PROCESSING", "DONE", "FAILED", "CANCELLED"],
      default: "CREATED",
      index: true
    },
    totals: {
      expectedFiles: { type: Number },
      receivedFiles: { type: Number },
      processedFiles: { type: Number },
      duplicateFiles: { type: Number }
    }
  },
  { timestamps: true }
)

module.exports = Batch = mongoose.model("batchs", BatchSchema)
