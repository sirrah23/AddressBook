module.exports = {
  devServer: {
    proxy: {
      "^/api/v1/contact": {
        target: "http://localhost:3000"
      }
    }
  }
};
