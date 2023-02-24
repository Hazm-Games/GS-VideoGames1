const { syncAndSeed } = require("./index");
const client = require("./client");

const setup = async () => {
  try {
    await client.connect();
    await syncAndSeed();
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
};

setup();
