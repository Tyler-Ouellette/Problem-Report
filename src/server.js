// const express = require('express');
// const routes = require('./routes/index');
// const https = require('https');
// const http = require('http');
// const fs = require('fs');

// require('dotenv').config({ path: __dirname + '/../variables.env' });

// const options = {
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.crt')
// };

// const app = express();
// app.set('port', 7777);

// app.use('/', routes);

// const server = https.createServer(options, app).listen('7777', () => {
//     console.log(`Express running on port 7777 click here to view: https://localhost:7777`)
// });

// const httpServer = http.createServer((req, res) => {
//     res.writeHead(301, { Location: `https://localhost:7777` });
//     res.end();
// });

// httpServer.listen(8080);


const express = require('express');
const routes = require('./routes/index');

require('dotenv').config({ path: __dirname + '/../variables.env' });

const app = express();
app.set('port', 7777);

app.use('/', routes);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running on port 7777 click here to view: http://localhost:7777`)
});