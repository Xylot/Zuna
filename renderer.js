// Require Dependencies
const $ = require('jquery');
const powershell = require('node-powershell');
const dt = require('datatables.net')();
const dtbs = require('datatables.net-bs4')(window, $);


function getReplayJson(callback) {
    $.getJSON("data.json", function(json) {
        callback(json)
    });
}

getReplayJson(function(json) {
    buildID = json.Build_ID;
    buildVersion = json.Build_Verison;
    gameVersion = json.Game_Version;
    replayVersion = json.Replay_Version;
    date = json.Date;
    id = json.ID;
    matchType = json.Match_Type;
    teamSize = json.Team_Size;
    map = json.Map;
    goalsOrange = json.Goals_Orange;
    goalsBlue = json.Goals_Blue;
    user = json.User;
    players = json.Players;
    headerProps = [
        buildID, buildVersion, gameVersion,
        replayVersion, date, id,
        matchType, teamSize, map,
        goalsOrange, goalsBlue, user,
        players
    ];
});

var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

// var dataSet2 = [
//     [id, date, teamSize, matchType, map, goalsOrange + ':' + goalsBlue]
// ];

// Testing PowerShell
$("#populate").click(() => {

    // Get the form input or default to 'localhost'
    let computer = $('#computerName').val() || 'localhost'

    dataSet2 = [
        [id, date, teamSize, matchType, map, goalsOrange + ':' + goalsBlue]
    ];

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
            { title: "Goals (Orange:Blue)" }
        ]
    });
})

    // Create the PS Instance
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    // Load the gun
    //ps.addCommand("\"Roads? Where we're going, we don't need roads.\"")
    //ps.addCommand("Get-Process -Name electron")
    
    // Load the gun
    // ps.addCommand("./Test-Power", [
    //     { GigaWatts: 1.0 }
    // ])

    // Load the gun
    ps.addCommand("./Get-Drives", [
        { ComputerName: computer }
    ])

    // Pull the Trigger
    ps.invoke()
    .then(output => {
        console.log(output)
        let data = JSON.parse(output)
        console.log(data)

        // generate DataTables columns dynamically
        let columns = [];
        Object.keys(data[0]).forEach( key => columns.push({ title: key, data: key }) )

        
    .catch(err => {
        console.error(err)
        ps.dispose()
    })

})