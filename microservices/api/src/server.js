


require('./env')();

var express = require('express');
var HandleSocket=require('rt-hasura');
var app = express();


var isFunction = function (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
    
};


var path = require('path');

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


var onConnection = (socket) => {

    socket.on('gamesubmit',(fn)=>{

            if(isFunction(fn)){
                fn('ramu');
            }

    });


};

var handleSocket=new HandleSocket(server,undefined);

//handleSocket.onCn = onConnection;



server.listen(8080, function () {
    console.log('Example app listening on port 8080!');
  });

  //console.log(process.env);