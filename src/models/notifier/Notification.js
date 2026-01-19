const mongoose = require("mongoose")
const { Schema } = mongoose

const NotificationSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, index: true, required: true },
    _batch: { type: Schema.Types.ObjectId, index: true, required: true },
    type: { type: String, index: true, required: true } // "BATCH_FULLY_UPLOADED" etc
  },
  { timestamps: true }
)

module.exports = Notification = mongoose.model("notifications", NotificationSchema)
