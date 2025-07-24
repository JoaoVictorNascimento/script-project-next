const fs = require("fs");

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync("config.json", "utf8"));
  } catch (error) {
    throw new Error("Failed to read config.json file");
  }
}

module.exports = { readConfig }; 