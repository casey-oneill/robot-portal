const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            // Change to http://localhost:8080 for local development
            target: "https://robot-portal.herokuapp.com",
            changeOrigin: true,
        })
    );
};
