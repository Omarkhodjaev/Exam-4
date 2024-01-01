class Notification {
  constructor(
    id,
    title,
    description,
    isRead = false,
    date,
    userId = null,
    isGlobal
  ) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.is_read = isRead),
      (this.date = date),
      (this.user_id = userId),
      (this.is_global = isGlobal);
  }
}

module.exports = { Notification };
