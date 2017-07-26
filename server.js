#!/root/.nvm/versions/node/v7.4.0/bin/node

var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http
.createServer(function (req,res) {
    res.writeHead(200, {
            'Content-Type': 'text/html'
    });
    res.end(index);
})
.listen(8080, 'localhost');

console.log('Server running at http://localhost:8080');

