import { POINT_CONVERSION_HYBRID } from 'constants';


require('./env')();

var express = require('express');
var HandleSocket=require('rt-hasura');
var app = express();



var path = require('path');

var socket = require('socket.io')()

var server = require('http').Server(app);



//your routes here
app.get('/', function (req, res) {
    res.send("Hello World!");
});

// app.get('/client', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client.html'));
// });

// app.get('/clientsocket',function(req,res){
//     res.sendFile(path.join(__dirname + '/node_modules/socket.io-client/dist/socket.io.js'));
// });

app.use(express.static('client'))


onConnection = (sockevt) => {

    socket.on('submitgame',(game_id , fn )=>{

        handleSocket.queryData()

    })

};

var handleSocket=new HandleSocket(server,undefined,onConnection);



server.listen(8080, function () {
    console.log('Example app listening on port 8080!');
  });


  