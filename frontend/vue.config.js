module.exports = {
  devServer: {
    proxy: {
      "^/api/v1/contact": {
        target: "http://localhost:3000"
      },
      "^/user/": {
        target: "http://localhost:8001",
        pathRewrite: path => path.replace("/user", "")
      },
      "^/auth/": {
        target: "http://localhost:8000",
        pathRewrite: path => path.replace("/auth", "")
      }
    }
  }
};
