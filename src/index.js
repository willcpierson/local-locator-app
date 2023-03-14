const tourneyData = require('./tournamentdata.json');

// const attendeeBackGroundImages = ["https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/gamecube_12/SI_GCN_SuperSmashBrosMelee_image1600w.jpg"]

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  };
};

Array.prototype.quickSort = function (callback) {
  if (this.length < 2) return this;
  if (!callback) {
    callback = (x, y) => {
      if (x < y) return - 1;
      return 1;
    };
  }
  const pivot = this[0];
  let left = this.slice(1).filter((ele) => callback(ele, pivot) === -1);
  let right = this.slice(1).filter((ele) => callback(ele, pivot) !== -1);
  left = left.quickSort(callback);
  right = right.quickSort(callback);

  return left.concat([pivot]).concat(right);
};

function sortByEntrantCount(arrayOfTournies) { // arrayOfTournies: data.tournaments.nodes (each node = obj) inputtedGame: state initals string
  const sortedTournies = []
  const sortThis = []



  // arrayOfTournies.forEach((tournament) => {
  //   if (tournament.events[inputtedGame]?.attendeeList.length) {
  //     sortThis.push(tournament.events[inputtedGame]?.attendeeList.length)
  //   }
  // })
  // const sorted = sortThis.quickSort()
  // sorted.forEach((attendeeCount) => {
  //   arrayOfTournies.forEach((tournament) => {
  //     if (tournament.events[inputtedGame]?.attendeeList.length) {
  //       if (tournament.events[inputtedGame].attendeeList.length === attendeeCount) {
  //         if (!sortedTournies.includes(tournament)) sortedTournies.push(tournament);
  //       }
  //     }
  //   })
  // })
  // return sortedTournies
}

async function requestGameIds() {
  let fetchedGameIds;
  let res = await fetch('https://api.start.gg/gql/alpha', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer a5111b54ba7fb17a3ec32d30ce67ab80'
    },
    body: 
      JSON.stringify({
        "query":"query VideogamesQuery {\n  videogames(query: {\n    page: 1\n    perPage: 500\n    filter: {\n      id: null\n    }\n  }) {\n    pageInfo {\n      total\n      totalPages\n      page\n      perPage\n    }\n    nodes {\n      id\n      name\n      displayName\n      images {\n        type\n        width\n        height\n        url\n      }\n    }\n  }\n}",
        "variables":{"perPage": 500},
        "operationName": "VideogamesQuery"
      })
  })
  fetchedGameIds = await res.json();
  let games = fetchedGameIds.data.videogames.nodes;
  games.forEach((gameObject) => {
    const gameMenu = document.querySelector("#gameList")
    let gameOption = gameMenu.appendChild(document.createElement('option'));
    gameOption.innerHTML = `${gameObject.name}`
    gameOption.setAttribute('id', gameObject.id);
    gameOption.setAttribute('value', gameObject.id);
    gameOption.setAttribute('data-gameid', gameObject.id)
    console.log(gameObject)
    console.log(gameOption)
    console.log(gameOption.dataset.gameid)
  })
};


document.addEventListener("DOMContentLoaded", () => {
    // Game ID loading goes here
    requestGameIds();
  document.getElementById("search-for-tournies-button").addEventListener('click', (event) => {
    event.preventDefault();
  
    let findTournament = {
      game: document.getElementById("game").value,
      state: document.getElementById("state").value
    };

    console.log(findTournament);
    let inputtedGame = findTournament.game;
    let inputtedState = findTournament.state;
    console.log(inputtedGame);
    const tournamentList = document.querySelector("#tournament-listings");

    async function requestStartApi(state, game) {
      let res = await fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer a5111b54ba7fb17a3ec32d30ce67ab80'
        },
        body: 
          JSON.stringify({
            "query":`query TournamentsByState($perPage: Int, $state: String!, $videogameId: ID!) {\n  tournaments(query: {\n    perPage: $perPage\n    filter: {\n      upcoming: true\n      addrState: $state\n      videogameIds: [\n        $videogameId\n      ]\n    }\n  }) {\n    nodes {\n      name\n      addrState\n      slug\n      venueAddress\n      isRegistrationOpen\n      startAt\n      events(filter: {\n        videogameId: ${game}\n      }) {\n        id\n        name\n        numEntrants\n      }\n    }\n  }\n}`,
            "variables":{"perPage":50,"state": state.toUpperCase(),"videogameId": game},
            "operationName":"TournamentsByState"
          })
      })
      let fetchedData = await res.json();
      console.log(fetchedData)
      let tournamentArray = fetchedData.data.tournaments.nodes;
      if (tournamentArray.length <= 0) {
        let tourneyListHolder = document.getElementById('tourney-list');
        tourneyListHolder.innerHTML = `
        <p id="tourney-list-holder">No Tournaments Located!</p>
        `
        console.log('No tournaments here!');
      } else {
        tournamentArray.forEach((tournament, i) => {
          if (!tournament.events[0]) {
            return
          }
          let entrantCount;
          if (!tournament.events[0].numEntrants) {
            entrantCount = `Hidden`
          } else {

            entrantCount = tournament.events[0].numEntrants;
          }
          setTimeout(() => {
            let tourney = tournamentList.appendChild(document.createElement('li'));
            let tournamentEvents = () => {
              let gameEvents = ``;
              tournament.events.forEach((event, i) => {
                if (i < tournament.events.length - 1) {
                  gameEvents += JSON.stringify(event) + ', ';
                } else {
                  gameEvents += JSON.stringify(event);
                }
              })
              return `[` + gameEvents + `]`;
            };
            let textOfEvents = "";
            let tournamentEventsText = () => {
              let gameEvents = ``;
              tournament.events.forEach((event, i) => {
                if (i < tournament.events.length - 1) {
                  textOfEvents += `${event.name}: ${event.numEntrants} <i class="fa-solid fa-user"></i> | ` 
                } else {
                  textOfEvents += `${event.name}: ${event.numEntrants} <i class="fa-solid fa-user"></i>` 
                }
              })
              return `[` + gameEvents + `]`;
            };

            let tourneyDate = new Date(tournament.startAt * 1000)
            tournamentEventsText();
            tourney.setAttribute('data-events', tournamentEvents());
            tourney.innerHTML = `
              <h2 class='tournament-text-name'>${tournament.name} </h2> <p>${new Date(tournament.startAt * 1000)}</p><p class='tournament-text-name'> ${textOfEvents} </p> <br /> ${tournament.venueAddress} <a href="https://www.start.gg/${tournament.slug}" target="_blank" id='reg-button'>Register</a>
              `}, 50 * i);

          })
      }
      console.log(fetchedData)
      return fetchedData;
    }

    fetchedTournaments = requestStartApi(inputtedState, inputtedGame); // replace "NJ" with inputtedGame when ready
    
    removeAllChildNodes(tournamentList); 
    // let tournamentListings = tourneyData.nodes
    // if (document.getElementById("most-entrants").checked) {
    //   tournamentListings = sortByEntrantCount(tourneyData.nodes).reverse()
    // } else if (document.getElementById("least-entrants").checked) {
    //   tournamentListings = sortByEntrantCount(tourneyData.nodes)
    // } else if (document.getElementById("avg-entrants").checked) {
    //   tournamentListings = sortByAverageEntrantCount(tourneyData.nodes).reverse()
    // }

    let promise = Promise.resolve()

    // tournamentListings.forEach((tournament) => {
    //     if (tournament.events[inputtedGame] && tournament.addrState === inputtedState) {
    //       promise = promise.then(() => {
    //         let attendees = tournament.events[inputtedGame].attendeeList
    //         let tourney = tournamentList.appendChild(document.createElement('li'))
    //         tourney.innerHTML = `
    //         ${tournament.name} | ${tournament.city}, ${tournament.addrState} <i class="fa-solid fa-user"></i> ${attendees.length} <a href="https://www.start.gg/${tournament.slug}" target="_blank" id='reg-button'>Register</a>
    //         `
    //         tourney.setAttribute('id', tournament.id )
    //         tourney.setAttribute('class', "one-of-many")
    //         return new Promise((resolve) => {
    //           setTimeout(resolve, 50)
    //         })
    //       })
    //     }
    // }) 
  })
  
})

// Bar Graph
function addData(chart, label, data) { // received from chart.js website
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function resetChart(chartValueArray) {
  while (chartValueArray.length > 0) {
    chartValueArray.pop()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  let xAxisNames = [];
  let chartValues = [];
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xAxisNames, // push tourney names into this array
        datasets: [{
            label: 'Entrant Count', //What data we are givng; entrant count, reoccurence, etc.
            data: chartValues, //push entrants into this array
            backgroundColor: [          // repeat this every loop, push into array
                'rgba(54, 162, 235)',
                'rgba(54, 162, 235)'
            ],
            borderColor: [              // repeat this every loop, push into array
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                suggestedMin: 10,
                suggestedMax: 50
            }
          }
        }
      })
  const tourneyList = document.querySelector("ol");
  tourneyList.addEventListener('click', (event) => {
    resetChart(chartValues)
    resetChart(xAxisNames)

    let tournamentAttendeeList = document.querySelector("#all-attendees")
    let events = event.target.dataset.events; 
    console.log('clicked an event!')
    console.log(`${typeof events} below`)
    console.log(events) // all events (each one is an object w/ name, id, and entrant count)

    console.log(JSON.parse(events))
    let count = 0;

    let eventDetails = () => { JSON.parse(events).forEach((event) => {
      addData(myChart, `${event.name}`, `${event.numEntrants}`)
      console.log(`Event Number ${count += 1}`);
      console.log(event)
      console.log('-----------------------')
      }) 
    }
  
    eventDetails();

    removeAllChildNodes(tournamentAttendeeList)

    // tourneyData.nodes.forEach((tournament) => {
    //   if (tournament.events[inputtedGame]) { // Check game before going forward, otherwise reading undefined error
    //     const attendees = tournament.events[inputtedGame].attendeeList
      
    //       attendees.forEach((attendee) => {
    //       if (tournament.id === parseInt(event.target.id)) {
    //       let attendeeListed = tournamentAttendeeList.appendChild(document.createElement('li'))
    //       attendeeListed.innerHTML = `${attendee}`
    //       }
    //     })
    //   }
    // })

    // if (!(xAxisNames[xAxisNames.length - 1] === event.target.innerText)) {
    //   tourneyData.nodes.forEach((tournament) => {
    //     if (tournament.id === parseInt(event.target.id)) {
    //       xAxisName = tournament.name;
    //       if (tournament.reoccurence === "weekly" || tournament.reoccurence === "biweekly") {
    //        ****** NEW CHART ******* addData(myChart, "${event-name} Entrant Count", eventEntrantNumberHere)
    //         addData(myChart, "Third Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastOne]);
    //         addData(myChart, "Second Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastTwo]);
    //         addData(myChart, "Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastThree]);
    //         addData(myChart, "Currently Registered", [tournament.events[inputtedGame].attendeeList.length]);
    //       } else {
    //         addData(myChart, "Current Entrants", [tournament.events[inputtedGame].attendeeList.length]);
    //       }
    //     }
    //   })
    // }
  });
});