const http = require("http");

const req = http.request(
  { host: "localhost", port: 3000, path: "/health", method: "GET" },
  (res) => {
    if (res.statusCode === 200) process.exit(0);
    process.exit(1);
  },
);

req.on("error", () => process.exit(1));
req.end();
setTimeout(() => process.exit(1), 2000);
