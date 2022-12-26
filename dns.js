// trying out some stuffs

const dns = require("dns");

dns.lookup("google.com", (err, address, family) => {
  console.log("address: %j family: IPv%s", address, family);
});
// address: 172.217.169.14 family: IPv4
