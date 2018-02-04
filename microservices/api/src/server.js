
require('./env')();

var express = require('express');
var HandleSocket = require('rt-hasura');
var app = express();

var axios = require('axios');

const glotToken = 'c5746811-352e-439e-82c8-4ca9dadb0eea';

async function query(options) {

    return await axios(options);

}



function runCode(code, fileName, language, input, token) {

    var options = {
        url: `https://run.glot.io/languages/${language}/latest`,
        method: 'post',
        headers: {
            'Authorization': `Token ${glotToken}`,
            'Content-type': 'application/json'

        },
        data: {
            "files": [{
                "name": fileName,
                "content": code
            }],
            'stdin': input
        },
    }

    return query(options)

}

async function checkTestCases(code, fileName, language, testcases) {

    var score = 0;

    let i;

    for (i = 0; i < testcases.length; i++) {



        var runres = await runCode(
           code
            , fileName , language , testcases[i].input);


        if (testcases[i].output === runres.data.stdout) {

            score++;
            console.log("test case : ", testcases[i].output, runres.data.stdout, "");
        }
        console.log(runres.data)

    }

    return score;
}

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


onConnection = (socket) => {

    socket.on('submitgame', async (gameid, fn) => {

        try {

            var response = await handleSocket.queryData({
                "type": "select",
                "args": {
                    "table": "game",
                    "columns": [
                        {
                            "name": "game-game_set",
                            "columns": [
                                {
                                    "name": "game_set-problem",
                                    "columns": [
                                        "*",
                                        {
                                            "name": "problem-test",
                                            "columns": [
                                                "*"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        "*",
                    ],
                    "where": {
                        "gameid": {
                            "$eq": gameid
                        }
                    }
                }
            }, socket.token);


            // console.log(response)

            if (!(response && response.data && (response.data.length === 1))) {


            if (isFunction(fn)) {
                fn({
                    status: 'error',
                    error: 'invalid game id'
                })
            }

                return;
            }

              var  code = response.data[0].code,
                testcases = response.data[0]['game-game_set']['game_set-problem']['problem-test'],
                score = 0,
                previousScore = parseInt(response.data[0].result),
                filename = response.data[0].filename,
                language = response.data[0].language;

            console.log(gameid, code
                , testcases, score, previousScore, filename, language);

            var n = await checkTestCases(code, filename, language, testcases);


            var updateRes = await handleSocket.queryData({
                "type": "update",
                "args": {
                    "table": "game",
                    "where": {
                        "gameid": {
                            "$eq": gameid
                        }
                    },
                    "$set": {
                        "result": n.toString()
                    }
                    ,
                    "returning": [
                        "result"
                    ]
                }
            }, socket.token);


            console.log("n = ",n.toString());

            


            if (isFunction(fn)) {
                fn({
                    status: 'ok',
                    score: `${n}` 
                })
            }

        }
        catch (e) {

            if (isFunction(fn)) {
                fn({
                    status: 'error',
                    error: e.toString()
                })
            }

            console.log(e)

        }

    })
}

var handleSocket = new HandleSocket(server, undefined, onConnection);



server.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

  //console.log(process.env);