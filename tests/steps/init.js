const { promisify } = require("util");
const awscred = require("awscred");

let initialized = false;

const init = async () => {
  if (initialized) {
    return;
  }

  process.env.restaurants_api =
    "https://p8edr1j2og.execute-api.eu-west-1.amazonaws.com/dev/restaurants";
  process.env.restaurants_table = "restaurants-pni";
  process.env.AWS_REGION = "eu-west-1";
  process.env.cognito_user_pool_id = "eu-west-1_I4aKjiXj0";
  process.env.cognito_client_id = "6nsngsev8n4q3d1efmopsv4k3m";

  const { credentials } = await promisify(awscred.load)();

  process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId;
  process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey;
  process.env.AWS_SESSION_TOKEN = credentials.sessionToken;

  console.log("AWS credential loaded");
  console.log(credentials);
  console.log("AWS credential loaded");

  initialized = true;
};

module.exports = {
  init
};
