const fs = require("fs");
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
    },
    port: 8080, // or any other port you prefer
  },
});
