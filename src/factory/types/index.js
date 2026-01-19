// DEFINE ALL LISTENER SUBJECTS
const Subject = {
  // UPLOADER
  DOCUMENT_UPLOADER_CREATED: "document_uploader:created",
  DOCUMENT_UPLOADER_UPDATED: "document_uploader:updated",
  DOCUMENT_UPLOADER_DELETED: "document_uploader:deleted",
  DOCUMENT_UPLOADER_NOTIFIED: "document_uploader:notified",
  BATCH_UPLOADER_CREATED: "batch_uploader:created",
  BATCH_UPLOADER_UPDATED: "batch_uploader:updated",
  BATCH_UPLOADER_DELETED: "batch_uploader:deleted",
  BATCH_UPLOADER_NOTIFIED: "batch_uploader:notified",
  PROJECT_UPLOADER_CREATED: "project_uploader:created",
  PROJECT_UPLOADER_UPDATED: "project_uploader:updated",
  PROJECT_UPLOADER_DELETED: "project_uploader:deleted",
  PROJECT_UPLOADER_NOTIFIED: "project_uploader:notified",

  // SCHEDULER
  DOCUMENT_SCHEDULER_UPDATED: "document_scheduler:updated",
  DOCUMENT_SCHEDULER_DELETED: "document_scheduler:deleted",
  DOCUMENT_SCHEDULER_NOTIFIED: "document_scheduler:notified",
  BATCH_SCHEDULER_UPDATED: "batch_scheduler:updated",
  BATCH_SCHEDULER_DELETED: "batch_scheduler:deleted",
  BATCH_SCHEDULER_NOTIFIED: "batch_scheduler:notified",
  PROJECT_SCHEDULER_UPDATED: "project_scheduler:updated",
  PROJECT_SCHEDULER_DELETED: "project_scheduler:deleted",
  PROJECT_SCHEDULER_NOTIFIED: "project_scheduler:notified"
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
