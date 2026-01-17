// DEFINE ALL LISTENER SUBJECTS
const Subject = {
  // UPLOADER
  DOCUMENT_UPLOADER_CREATED: "document_uploader:created",
  DOCUMENT_UPLOADER_UPDATED: "document_uploader:updated",
  DOCUMENT_UPLOADER_DELETED: "document_uploader:deleted",
  BATCH_UPLOADER_CREATED: "batch_uploader:created",
  BATCH_UPLOADER_UPDATED: "batch_uploader:updated",
  BATCH_UPLOADER_DELETED: "batch_uploader:deleted",
  PROJECT_UPLOADER_CREATED: "project_uploader:created",
  PROJECT_UPLOADER_UPDATED: "project_uploader:updated",
  PROJECT_UPLOADER_DELETED: "project_uploader:deleted",
  // SCHEDULER
  DOCUMENT_SCHEDULER_UPDATED: "document_scheduler:updated",
  DOCUMENT_SCHEDULER_DELETED: "document_scheduler:deleted",
  BATCH_SCHEDULER_UPDATED: "batch_scheduler:updated",
  BATCH_SCHEDULER_DELETED: "batch_scheduler:deleted",
  PROJECT_SCHEDULER_UPDATED: "project_scheduler:updated",
  PROJECT_SCHEDULER_DELETED: "project_scheduler:deleted"
}

// DEFINE ALL LISTENER QUEUE GROUP NAMES
const QueueGroupName = {
  UPLOADER_SERVICE: "uploader-service",
  SCHEDULER_SERVICE: "scheduler-service",
  NOTIFIER_SERVICE: "notifier-service"
}

const FixedValues = {
  // TODO
}

module.exports = {
  Subject,
  QueueGroupName,
  FixedValues
}
