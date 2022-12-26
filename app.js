const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello World</h1>");
    return res.end();
  } else if (url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>About</h1>");
    return res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>404</h1>");
    return res.end();
  }
});

server.listen(3000);
