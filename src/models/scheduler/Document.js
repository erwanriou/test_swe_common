const mongoose = require("mongoose")
const { Schema } = mongoose

const DocumentSchema = new Schema(
  {
    // ---- OWNERSHIP ----
    _project: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    _batch: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    _user: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },

    // ---- FILE IDENTITY ----
    originalPath: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },

    // ---- STORAGE ----
    storage: {
      provider: {
        type: String,
        enum: ["GCS", "S3", "AZURE", "LOCAL"],
        default: "GCS"
      },
      key: { type: String, required: true },
      sizeBytes: { type: Number },
      contentType: { type: String }
    },

    // ---- UPLOAD LIFECYCLE ----
    uploadStatus: {
      type: String,
      enum: ["PENDING", "URL_ISSUED", "UPLOADED", "VERIFIED", "FAILED", "DISCARDED"],
      default: "PENDING",
      index: true
    },
    processStatus: {
      type: String,
      enum: ["PENDING", "HASHING", "DONE", "FAILED"],
      default: "PENDING",
      index: true
    }
  },
  { timestamps: true }
)

module.exports = Document = mongoose.model("documents", DocumentSchema)
