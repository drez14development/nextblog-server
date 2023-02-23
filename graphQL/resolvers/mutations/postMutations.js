const Post = require("../../../models/Post");
const { createWriteStream } = require("fs");
const path = require("path");

//Create Post
const createPostMutation = async (args, ctx) => {
  const { title, content } = args.input;
  const user_id = args.user_id;

  if (!title) {
    throw Error("Title field is required");
  }
  if (!args.input.imgFile) {
    throw Error("Image is required");
  }
  if (!content) {
    throw Error("Post content is required");
  }

  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  const { createReadStream, filename } = await args.input.imgFile;
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
          path.join(
            __dirname,
            "../../../uploads/post_images",
            formattedFilename
          )
        )
      )
      .on("close", res)
  );

  const newPost = await Post.create({
    title,
    slug,
    content,
    imgUrl: formattedFilename,
    user: user_id,
  });
  return newPost;
};


module.exports = { createPostMutation };
