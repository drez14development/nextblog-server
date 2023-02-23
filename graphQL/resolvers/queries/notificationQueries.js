const Notification = require("../../../models/Notification");

const getUserNotificationsQuery = async (args) => {
  const user_id = args.user_id;
  
  return await Notification.find({receiver: user_id})
    .populate("actor")
    .sort({ createdAt: -1 });
};

module.exports = { getUserNotificationsQuery };
