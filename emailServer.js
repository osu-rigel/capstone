const smtp_server = require('smtp-server').SMTPServer;
const fs = require('fs');
const options = {
    "secure" : false,
};
const server = new smtp_server(options);
const fs = require('fs');
const emailConfig = fs.readFileSync('./emailConfig.json');

server.listen(emailConfig['port']);

server.on("error", (err) => {
    console.error(err);
})