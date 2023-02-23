const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const { createWriteStream } = require("fs");
const path = require("path");
const { createNotification } = require("./notifications/notificationMutations");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

//SignUp
const signUpUserMutation = async (args) => {
  const { email, password, username } = args.input;

  try {
    const user = await User.signup(email, password, username);

    const token = createToken(user._id);
    
    const welcomeNotification = createNotification({
      action_info: " says hi.",
      actor_id: "63d1070a6a347c588d20dced", //Andrés Barros
      refContent: "Welcome to NextBlog!", 
      receiver_id: user._id,
      post_id: "63d10b5df1664b381b346f5f",
    });

    return { user, token };
  } catch (error) {
    throw Error(error.message);
  }
};

//Login
const loginUserMutation = async (args) => {
  const { email, password } = args.input;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    return { user, token };
  } catch (error) {
    throw Error(error.message);
  }
};

const updateAvatarMutation = async (args) => {
  
  if(!args.file){
    throw Error("Please select a file")
  }

  const { user_id } = args;
  const { createReadStream, filename } = await args.file;

  const fileExtension = filename
    .split(".")
    .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
    .slice(1)
    .join(".");

  const formattedFilename = user_id + "-" + Date.now() + "." + fileExtension;

  await new Promise((res) =>
    createReadStream()
      .pipe(
        createWriteStream(
          path.join(__dirname, "../../../uploads/avatars", formattedFilename)
        )
      )
      .on("close", res)
  );

  await User.findOneAndUpdate(
    { _id: user_id },
    { avatarUrl: formattedFilename },
    { new: true }
  );

  return { avatarUrl: formattedFilename };
};


module.exports = {
  signUpUserMutation,
  loginUserMutation,
  updateAvatarMutation,
};
