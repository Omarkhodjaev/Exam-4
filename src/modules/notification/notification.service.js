const { DataSource } = require("../../library/dataSource");
const uuid = require("uuid");
const path = require("path");
const { dateGenerator } = require("../../library/dateGenerator");
const { ResData } = require("../../library/resData");
const { userFindById } = require("../../library/userFindById");
const { Notification } = require("./entity/notification.entity");
const { NotFoundById } = require("./exception/notification.exception");

class NotificationService {
  create(dto) {
    const notificationPath = path.join(
      __dirname,
      "../../../database",
      "notifications.json"
    );

    const notificationDataSource = new DataSource(notificationPath);
    const notifications = notificationDataSource.read();

    const id = uuid.v4();
    const date = dateGenerator();

    const newNotification = [];

    if (dto.userId) {
      const foundByUserId = userFindById(dto.userId);
      if (foundByUserId) {
        const newNotification1 = new Notification(
          id,
          dto.title,
          dto.description,
          false,
          date,
          dto.userId,
          true
        );
        notifications.push(newNotification1);
        newNotification.push(newNotification1);
      }
    } else {
      const newNotification1 = new Notification(
        id,
        dto.title,
        dto.description,
        false,
        date,
        null,
        false
      );
      notifications.push(newNotification1);
      newNotification.push(newNotification1);
    }

    notificationDataSource.write(notifications);
    const resData = new ResData("Notification created", 200, newNotification);
    return resData;
  }

  getById(notificationId) {
    const notificationPath = path.join(
      __dirname,
      "../../../database",
      "notifications.json"
    );

    const notificationDataSource = new DataSource(notificationPath);
    const notifications = notificationDataSource.read();

    const foundNotification = notifications.find(
      (n) => n.id === notificationId
    );

    if (!foundNotification) {
      throw new NotFoundById();
    }

    const resData = new ResData(
      "Notification is taken by ID",
      200,
      foundNotification
    );
    return resData;
  }

  getAll() {
    const notificationPath = path.join(
      __dirname,
      "../../../database",
      "notifications.json"
    );

    const notificationDataSource = new DataSource(notificationPath);
    const notifications = notificationDataSource.read();

    const resData = new ResData(
      "All Notifications are taken",
      200,
      notifications
    );
    return resData;
  }

  delete(id) {
    const { data: foundNotification } = this.getById(id);

    const notificationPath = path.join(
      __dirname,
      "../../../database",
      "notifications.json"
    );

    const notificationDataSource = new DataSource(notificationPath);
    const notifications = notificationDataSource.read();

    const filterNotifications = notifications.filter(
      (user) => user.id !== foundNotification.id
    );

    notificationDataSource.write(filterNotifications);

    const resData = new ResData("Notification deleted", 200, foundNotification);
    return resData;
  }
}

module.exports = { NotificationService };
