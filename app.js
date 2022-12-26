const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Home</h1>
            <form method="post" action="/about">
                <input type="text" name="testVariable">
                <input type="submit">
            </form>
        </body>
    </html>
      `);
    return res.end();
  } else if (url === "/about") {
    if (req.method === "POST") {
      const message = [];

      req.on("data", (packet) => {
        message.push(packet);
      });

      req.on("end", () => {
        const parsed = Buffer.concat(message).toString();

        fs.writeFileSync("message.txt", parsed.split("=")[1]);

        res.setHeader("Content-Type", "text/html");
        res.write("<h1>About Posted</h1>");
        return res.end();
      });
    } else {
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>About</h1>");
      return res.end();
    }
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>404</h1>");
    return res.end();
  }
});

server.listen(3000);
