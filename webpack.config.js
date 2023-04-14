const Dotenv = require("dotenv-webpack");

module.exports = {
  // ... other webpack config options
  plugins: [new Dotenv()],
};
