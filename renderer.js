// Require Dependencies
const $ = require('jquery');
const powershell = require('node-powershell');
const dt = require('datatables.net')();
const dtbs = require('datatables.net-bs4')(window, $);


function getReplayJson(callback) {
    $.getJSON("data2.json", function(json) {
        callback(json)
    });
}

var dataSet2 = []

getReplayJson(function(json) {

    var index = [];

    // build the index
    for (var x in json) {
       index.push(x);
    }
    
    // sort the index
    index.sort(function (a, b) {    
       return a == b ? 0 : (a > b ? 1 : -1); 
    }); 

    var count = Object.keys(json).length;

    replayData = []
    for(i = 0; i < count; i++) {
        currentJSON = json[index[i]];
        buildID = currentJSON.Build_ID;
        buildVersion = currentJSON.Build_Verison;
        gameVersion = currentJSON.Game_Version;
        replayVersion = currentJSON.Replay_Version;
        date = currentJSON.Date;
        id = currentJSON.ID;
        matchType = currentJSON.Match_Type;
        teamSize = currentJSON.Team_Size;
        map = currentJSON.Map;
        goalsOrange = currentJSON.Goals_Orange;
        goalsBlue = currentJSON.Goals_Blue;
        user = currentJSON.User;
        players = currentJSON.Players;
        replayName = currentJSON.Replay_Name;
        headerProps = [
            buildID, buildVersion, gameVersion,
            replayVersion, date, id,
            matchType, teamSize, map,
            goalsOrange, goalsBlue, user,
            players, replayName
        ];
        replayData.push(headerProps);        
        if (replayName !== null) {
            dataSet2.push([replayName, date, teamSize, matchType, map, goalsOrange + ':' + goalsBlue])
        }
        else {
            dataSet2.push([id, date, teamSize, matchType, map, goalsOrange + ':' + goalsBlue])
        }
    } 
});

// Click event
$("#populate").click(() => {

    // dataSet2 = [
    //     [id, date, teamSize, matchType, map, goalsOrange + ':' + goalsBlue]
    // ];

    // Create DataTable
    $('#output').DataTable({
        //data: data,
        //columns: columns
        data: dataSet2,
        columns: [
            { title: "Replay Name" },
            { title: "Date" },
            { title: "Team Size" },
            { title: "Match Type" },
            { title: "Map" },
            { title: "Score" }
        ]
    });
})

$("#sidebar-btn").click(function(){
    $('#sidebar').toggleClass('visible');
    $('#replay-table').toggleClass('moved');
});