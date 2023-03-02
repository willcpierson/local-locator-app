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

function sortByEntrantCount(arrayOfTournies, inputtedGame) { // arrayOfTournies: data.tournaments.nodes (each node = obj) inputtedGame: state initals string
  const sortedTournies = []
  const sortThis = []
  arrayOfTournies.forEach((tournament) => {
    if (tournament.events[inputtedGame]?.attendeeList.length) {
      sortThis.push(tournament.events[inputtedGame]?.attendeeList.length)
    }
  })
  const sorted = sortThis.quickSort()
  sorted.forEach((attendeeCount) => {
    arrayOfTournies.forEach((tournament) => {
      if (tournament.events[inputtedGame]?.attendeeList.length) {
        if (tournament.events[inputtedGame].attendeeList.length === attendeeCount) {
          if (!sortedTournies.includes(tournament)) sortedTournies.push(tournament);
        }
      }
    })
  })
  return sortedTournies
} 

function sortByAverageEntrantCount(arrayOfTournies, inputtedGame) {
  const sortedTournies = []
  const sortThis = []
  arrayOfTournies.forEach((tournament) => {
    if (tournament.events[inputtedGame]?.pastAttendeeCount) {
      let pastTournies = tournament.events[inputtedGame]?.pastAttendeeCount
      let pastTourneyAverage = Math.floor((pastTournies.pastOne + pastTournies.pastTwo + pastTournies.pastThree) / 3)
      sortThis.push(pastTourneyAverage)
    }
  })
  const sorted = sortThis.quickSort()
  sorted.forEach((averageAttendeeCount) => {
    arrayOfTournies.forEach((tournament) => {
      if (tournament.events[inputtedGame]?.pastAttendeeCount) {
        let pastTournies = tournament.events[inputtedGame]?.pastAttendeeCount
        let pastTourneyAverage = Math.floor((pastTournies.pastOne + pastTournies.pastTwo + pastTournies.pastThree) / 3)
        if (pastTournies) {
          if ((pastTourneyAverage) === averageAttendeeCount) {
            if (!sortedTournies.includes(tournament)) sortedTournies.push(tournament);
          }
        }
      }
    })
  })
  console.log(sortedTournies)
  return sortedTournies
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
        "variables":{"perPage":500},
        "operationName": "VideogamesQuery"
      })
  })
  fetchedGameIds = await res.json();
  let games = fetchedGameIds.data.videogames.nodes;
  games.forEach((gameObject) => {
    let gameOption = game.appendChild(document.createElement('option'));
    gameOption.innerHTML = `${gameObject.name}`
    gameOption.setAttribute('id', `${gameObject.id}`);
    gameOption.setAttribute('value', `${gameObject.id}`);
    console.log(gameOption)
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

    let inputtedGame = findTournament.game;
    let inputtedState = findTournament.state;
    console.log(inputtedGame)
    const tournamentList = document.querySelector("#tournament-listings");

    async function requestStartApi(state, game) {
      let res = await fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer a5111b54ba7fb17a3ec32d30ce67ab80'
        },
        body: 
          JSON.stringify({
            "query":`query TournamentsByState($perPage: Int, $state: String!, $videogameId: ID!) {\n  tournaments(query: {\n    perPage: $perPage\n    filter: {\n      upcoming: true\n      addrState: $state\n      videogameIds: [\n        $videogameId\n      ]\n    }\n  }) {\n    nodes {\n      name\n      addrState\n      slug\n      isRegistrationOpen\n      events(filter: {\n        videogameId: ${game}\n      }) {\n        id\n        name\n        numEntrants\n      }\n    }\n  }\n}`,
            "variables":{"perPage":50,"state": state,"videogameId": game},
            "operationName":"TournamentsByState"
          })
      })
      let fetchedData = await res.json();
      let tournamentArray = fetchedData.data.tournaments.nodes;
      if (tournamentArray.length <= 0) {
        let tourneyListHolder = document.getElementById('tourney-list');
        tourneyListHolder.innerHTML = `
        <p id="tourney-list-holder">No Tournaments Located!</p>
        `
        console.log('No tournaments here!');
      } else {
        tournamentArray.forEach((tournament, i) => {
          let entrantCount = tournament.events[0].numEntrants;
          if (!tournament.events[0].numEntrants) {
            entrantCount = `Hidden`
          }
          setTimeout(() => {
            let tourney = tournamentList.appendChild(document.createElement('li'))
            tourney.setAttribute('data-events', JSON.stringify(tournament.events))
            tourney.innerHTML = `
              ${tournament.name} | ${tournament.events[0].name}: ${entrantCount} <i class="fa-solid fa-user"></i> <a href="https://www.start.gg/${tournament.slug}" target="_blank" id='reg-button'>Register</a>
              `}, 50 * i);

          })
      }
      console.log(fetchedData)
      return fetchedData;
    }

    fetchedTournaments = requestStartApi(inputtedState, inputtedGame); // replace "NJ" with inputtedGame when ready
    
    removeAllChildNodes(tournamentList); 
    let tournamentListings = tourneyData.nodes
    if (document.getElementById("most-entrants").checked) {
      tournamentListings = sortByEntrantCount(tourneyData.nodes, inputtedGame).reverse()
    } else if (document.getElementById("least-entrants").checked) {
      tournamentListings = sortByEntrantCount(tourneyData.nodes, inputtedGame)
    } else if (document.getElementById("avg-entrants").checked) {
      tournamentListings = sortByAverageEntrantCount(tourneyData.nodes, inputtedGame).reverse()
    }

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
            }
          }
        }
      })
  const tourneyList = document.querySelector("ol");
  tourneyList.addEventListener('click', (event) => {
    resetChart(chartValues)
    resetChart(xAxisNames)

    let findTournament = {game: document.getElementById("game").value};
    let inputtedGame = findTournament.game;
    let attendeeBackGround = document.querySelector("#attendee-list") // Delete when ready
    let tournamentAttendeeList = document.querySelector("#all-attendees")

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



    if (!(xAxisNames[xAxisNames.length - 1] === event.target.innerText)) {
      tourneyData.nodes.forEach((tournament) => {
        if (tournament.id === parseInt(event.target.id)) {
          xAxisName = tournament.name;
          if (tournament.reoccurence === "weekly" || tournament.reoccurence === "biweekly") {
            addData(myChart, "Third Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastOne]);
            addData(myChart, "Second Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastTwo]);
            addData(myChart, "Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastThree]);
            addData(myChart, "Currently Registered", [tournament.events[inputtedGame].attendeeList.length]);
          } else {
            addData(myChart, "Current Entrants", [tournament.events[inputtedGame].attendeeList.length]);
          }
        }
      })
    }
  });
})

// Switching Data Representations
//Switch to Notable Entrants // Delete, only need entrant data
document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("#entrants-button").onclick = () => {
    const graph = document.querySelector("footer");
    const attendeeList = document.querySelector("#attendee-list")
  
    graph.style.display = "none";
    attendeeList.style.display = "flex";
  }
})
//Switch to Average Entrants
document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("#avg-entrants-button").onclick = () => {
    const graph = document.querySelector("footer");
    const attendeeList = document.querySelector("#attendee-list")
  
    graph.style.display = "block";
    attendeeList.style.display = "none";
  }
})

// Change colors
document.addEventListener("DOMContentLoaded", () => {
  let paint = document.querySelector('#paint')
  let paintValue = paint.getAttribute('value')
  paint.addEventListener("click", (e) => {

    const h1 = document.querySelector('h1');
    const body = document.querySelector('body')
    const aside = document.querySelector('aside')
    const nav = document.querySelector('nav')
    const listings = document.querySelectorAll(".one-of-many")
    const listingsHover = document.querySelectorAll(".one-of-many")
    if (paintValue === "standard") {     
      paintValue = "metroid"      
      h1.style.color = "#62dc50"
      body.style.backgroundColor = "#d14949"
      aside.style.backgroundColor = "#4eb13e"
      nav.style.backgroundColor = "#d14949"
        // do hover listings as well once figured out
      if (listings) {
        listings.forEach((tournament) => {
          tournament.style.backgroundColor = "#62dc50"
        })
      }
    } else { 
        paintValue = "standard"
        h1.style.color = "white"
        body.style.backgroundColor = "#5284cf"
        aside.style.backgroundColor = "#3976bc"
        nav.style.backgroundColor = "#5284cf"
        // do hover listings as well once figured out
        if (listings) {
          listings.forEach((tournament) => {
            tournament.style.backgroundColor = "#71A9F7"
          })
        }
      }
  })
})