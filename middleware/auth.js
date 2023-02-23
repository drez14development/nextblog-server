const { AuthenticationError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

const authMiddleware = async (args, context, resolver) => {

  //1. Check if Authorization header is set on request
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError("Authorization header is not defined");
  }

  //2. Check if header's format is correct: "Bearer [token]"
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new AuthenticationError(
      "Invalid token format. It must be the following: 'Bearer [token]'"
    );
  }

  //3. Verify that token is valid and extract user's id from it
  const { _id } = await jwt.verify(token, process.env.SECRET);
  if (_id) {
    args.user_id = _id; //Attach logged user ID to args
  } else {
    throw new AuthenticationError("Invalid/Expired token");
  }

  //4. Execute resolver with given args + logged user id
  try {
    const resolverExecution = await resolver(args);
    return resolverExecution;
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = { authMiddleware };
