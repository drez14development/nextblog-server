const Notification = require("../../../../models/Notification");
const User = require("../../../../models/User");
const Post = require("../../../../models/Post");

const createNotification = async (args) => {
  const { action_info, refContent, actor_id, receiver_id, post_id } = args;
  const actor = await User.findById(actor_id);
  const message = actor.username + action_info;
  const post = await Post.findById(post_id);

  //Define URL
  let extraParams = "";
  if (action_info.includes("comment")) {
    extraParams = "?comments=1";
  }
  const postUrl = post.slug + extraParams;

  //Process content to define Excerpt
  let refExcerpt = "";
  if (refContent.length > 25) {
    refExcerpt = refContent.split(" ").splice(0, 5).join(" ") + "...";
  } else {
    refExcerpt = refContent;
  }

  //Prevent notification repetition
  if (actor_id === receiver_id.toString()) {
    return;
  }
  const alreadyExist = await Notification.exists({
    receiver: receiver_id,
    message,
    refExcerpt,
  });
  if (alreadyExist) {
    return;
  }

  try {
    const notification = await Notification.create({
      actor: actor_id,
      receiver: receiver_id,
      message,
      refExcerpt,
      postUrl,
    });
    console.log(notification);
  } catch (error) {
    console.log(error.message);
  }
};

const markNotificationsAsReadMutation = async (args) => {
  const { user_id } = args;
  const userNots = await Notification.updateMany(
    { receiver: user_id },
    { wasRead: true }
  );
};

const deleteNotificationsMutation = async (args) => {
  const { user_id } = args;
  try {
    const userNots = await Notification.deleteMany({ receiver: user_id });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  createNotification,
  markNotificationsAsReadMutation,
  deleteNotificationsMutation,
};
