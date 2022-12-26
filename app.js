const http = require("http");

const requestHandler = require("./routes");

console.log(requestHandler.text);

const server = http.createServer(requestHandler.requestHandler);

server.listen(3000);
