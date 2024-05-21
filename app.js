const express = require('express')
const route = require('./Route/Index');
const app = express();

//Accepting and directing all the requests
app.use('/', route);


const Port = 5500; //my port number
const Hostname = "localhost";

//initiaizing my server through express
app.listen(Port, Hostname, () => {
    console.log(`Server is running at ${Hostname}: ${Port}`)
})