const hostname = "localhost";
const port = 5000;
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + " by method " + req.method);

  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") fileUrl = "/login.html";
    else fileUrl = req.url;

    var filePath = path.resolve("./public" + fileUrl);
    const fileExt = path.extname(filePath);

    if (fileExt == ".html" || fileExt == ".js" || fileExt == ".css") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>Error 404: " +
              fileUrl +
              " not found</h1></body></html>"
          );
          return;
        }
        res.statusCode = 200;

        if (fileExt == ".html") res.setHeader("Content-Type", "text/html");
        else if (fileExt == ".js")
          res.setHeader("Content-Type", "text/javascript");
        else if (fileExt == ".css") res.setHeader("Content-Type", "text/css");

        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a supported file type</h1></body></html>"
      );
    }
  }
  // Handle Check User POST Request
  else if (req.method == "POST" && req.url == "/check-user") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { username } = JSON.parse(body);

        if (username === "admin") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ valid: true }));
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({ valid: false, message: "Invalid username" })
          );
        }
      } catch (error) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ valid: false, message: "Invalid JSON" }));
      }
    });
  } else if (req.method == "POST" && req.url == "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { username, password } = JSON.parse(body);

        // Hardcoded credentials logic
        if (username === "admin" && password === "123456") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({ success: true, message: "Login Successful" })
          );
        } else {
          let message = "Invalid credentials";
          if (username !== "admin")
            message = "Invalid username"; // Basic check logic
          else if (password !== "123456") message = "Incorrect password";

          res.statusCode = 401;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, message: message }));
        }
      } catch (error) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404: " +
        req.method +
        " not supported</h1></body></html>"
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
