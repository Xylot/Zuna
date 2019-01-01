// Require Dependencies
const $ = require('jquery');
const powershell = require('node-powershell');
const dt = require('datatables.net')();
const dtbs = require('datatables.net-bs4')(window, $);


function getReplayJson(callback) {
    $.getJSON("Resources/Databases/data2.json", function(json) {
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
        date = date.split(" ");
        dateString = new Date(date[0]);
        dateString = dateString.toDateString().split(' ').slice(1).join(' ');
        replayData.push(headerProps);        
        if (replayName !== null) {
            dataSet2.push([replayName, dateString, teamSize, matchType, map, goalsOrange + ':' + goalsBlue])
        }
        else {
            dataSet2.push([id, dateString, teamSize, matchType, map, goalsOrange + ':' + goalsBlue])
        }
    } 
});

// Click event
$("#populate").click(() => {

    // Create DataTable
    $('#output').DataTable({
        searching: false,
        lengthChange: false,
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
    $('#select-match-type').toggleClass('moved');
    $('#select-date').toggleClass('moved');
    $('#select-team-size').toggleClass('moved');
    $('#select-map').toggleClass('moved');
    $('#filter').toggleClass('moved');
});