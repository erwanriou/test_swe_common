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
      expectedFiles: { type: Number, required: true },
      receivedFiles: { type: Number, default: 0 },
      processedFiles: { type: Number, default: 0 },
      duplicateFiles: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
)

module.exports = Batch = mongoose.model("batchs", BatchSchema)
