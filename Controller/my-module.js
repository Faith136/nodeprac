exports.myText = "hello from module"
    //os module
var os = require('os');
console.log('Type:' + os.type());

//fs module
var fs = require('fs')
    //creating file
fs.writeFileSync('sample123.txt', 'Hi Faith this is the new file create by the node function.');
console.log('file has been created');
//reading file
var data = fs.readFileSync('sample123.txt');
console.log('Content of the file:' + data);

//http module 
var http = require('http')

http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello world!');
    res.end();
}).listen(5500);