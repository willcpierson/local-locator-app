function removeAllChildNodes(parent) {
  if (parent) {
    const invalidStateWarning = document.getElementById('invalidState');
    if (invalidStateWarning) {
      if (invalidStateWarning.dataset.remove === "visible") {
        invalidStateWarning.dataset.remove = "";
      } else {
        invalidStateWarning.remove();
      }
    }
    const invalidGameWarning = document.getElementById('invalidGame');
    if (invalidGameWarning) {
      if (invalidGameWarning.dataset.remove === "visible") {
        invalidGameWarning.dataset.remove = "";
      } else {
        invalidGameWarning.remove();
      }
    }
    const noTournamentsLocated = document.getElementById('noTournaments');
    if (noTournamentsLocated) {
      if (noTournamentsLocated.dataset.remove === "visible") {
        noTournamentsLocated.remove();
      } else {
        noTournamentsLocated.dataset.remove = "";
      }
    }
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      if (loadingScreen.dataset.remove === "visible") {
        loadingScreen.remove();
      } else {
        loadingScreen.dataset.remove = "";
      }
    }
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
  }
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

const numPeriods = 3;
const intervalTime = 500;

function showLoadingMessage() {
  let count = 0;
  const tourneyListHolder = document.getElementById('tourney-list');
  return setInterval(() => {
    count++;
    const periods = ".".repeat(count % (numPeriods + 1));
    tourneyListHolder.innerHTML = `
      <ol id="tournament-listings">
      </ol><p class="tourney-list-holder" id="loadingScreen" data-remove="visible">Loading${periods}</p>
    `
  }, intervalTime);
}

async function requestGameIds() {
  let fetchedGameIds;
  try {
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

    if (!res.ok) {
      throw new Error('Start.gg token is currently being overworked, try again in a few minutes!')
    }
  
    fetchedGameIds = await res.json();
    let games = fetchedGameIds.data.videogames.nodes;
    games.forEach((gameObject) => {
      const gameMenu = document.querySelector("#gameList")
      let gameOption = gameMenu.appendChild(document.createElement('option'));
      gameOption.innerHTML = `${gameObject.name}`
      gameOption.setAttribute('id', gameObject.id);
      gameOption.setAttribute('value', gameObject.name);
      gameOption.setAttribute('data-gameid', gameObject.name);
      console.log(gameObject)
      console.log(gameOption)
      console.log(gameOption.dataset.gameid)
    });
    return games;
  } catch (error) {
    console.error('There was a problem receiving the game IDs, try again later', error)
  }
};

document.addEventListener("DOMContentLoaded", () => {
  requestGameIds();

  const inputGame = document.getElementById('game')
  console.log(inputGame)
  // inputGame.addEventListener(change, () => {
    
  //   const selectedOption = document.querySelector(`#gameList option[value="${inputGame.value}"]`)
  //   console.log(selectedOption)
  //   console.log('CHANGED!')
  //   if (selectedOption) {
  //     inputGame.dataset.gameid = selectedOption.id;
  //   }
  // })

  document.getElementById("search-for-tournies-button").addEventListener('click', (event) => {
    event.preventDefault();

    const allGames = document.querySelectorAll("option");
    console.log(allGames);

    function findGameId(options) {
      const gameName = document.getElementById("game").value;
      let foundId = null;
      options.forEach((option) => {
        if (option.outerText === gameName) {
          console.log(`found ID: ${option.id}`);
          foundId = parseInt(option.id);
        }
      });
      return foundId;
    };
  
    findGameId(allGames);

    const findTournament = {
      game: findGameId(allGames),
      state: document.getElementById("state").value
    };

    const inputtedGame = findTournament.game;
    const inputtedState = findTournament.state;

    console.log(findTournament)

    const tournamentList = document.querySelector("#tournament-listings");

    async function requestStartApi(state, game) {
      // const loadingInterval = showLoadingMessage();
      // await new Promise(resolve => setTimeout(resolve, 5000));

      try {      
        const res = await fetch('https://api.start.gg/gql/alpha', {
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

        // clearInterval(loadingInterval);
        // console.log('Interval Passed');
        // const loadingScreen = document.getElementById('loadingScreen');
        // loadingScreen.remove();
        

        if (!res.ok) {
          throw new Error('Local Locator is experiencing some high traffic, please try again later!')
        }
        const fetchedData = await res.json();
        const tournamentArray = fetchedData.data.tournaments.nodes;
        if (tournamentArray.length <= 0) {
          const tourneyListHolder = document.getElementById('tourney-list');
          tourneyListHolder.innerHTML = `
          <ol id="tournament-listings">
          </ol><p class="tourney-list-holder" id="noTournaments" data-remove="visible">No Tournaments Located!</p>
          `
        } else {
          console.log('displaying tournaments...')
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
              const tourney = tournamentList.appendChild(document.createElement('li'));
              const tournamentEvents = () => {
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
              const tournamentEventsText = () => {
                let gameEvents = ``;
                tournament.events.forEach((event, i) => {
                  let numberOfEntrants;
                  if (event.numEntrants == null) {
                    numberOfEntrants = 'Hidden'
                  } else {
                    numberOfEntrants = event.numEntrants
                  }
                  if (i < tournament.events.length - 1) {
                    textOfEvents += `${event.name}: ${numberOfEntrants} <i class="fa-solid fa-user"></i> | ` 
                  } else {
                    textOfEvents += `${event.name}: ${numberOfEntrants} <i class="fa-solid fa-user"></i>` 
                  }
                })
                return `[` + gameEvents + `]`;
              };

              const tourneyDate = new Date(tournament.startAt * 1000);
              const day = tourneyDate.getDate();
              const month = tourneyDate.getMonth();
              const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              const year = tourneyDate.getFullYear();

              tournamentEventsText();
              tourney.setAttribute('data-events', tournamentEvents());
              tourney.innerHTML = `
                <h2 class='tournament-text-name'>${tournament.name} </h2> <p class='tournament-date'>${monthNames[month]} ${day}, ${year}</p><p class='tournament-text-name'> ${textOfEvents} </p> <br /> ${tournament.venueAddress} <a href="https://www.start.gg/${tournament.slug}" target="_blank" id='reg-button'>Register</a>
                `}, 50 * i);

            })
        }
        return fetchedData;
      } catch (error) {
        console.error('There was a problem with the fetch request', error)
      }
    }

    function validateForm() {
      const gameInput = document.getElementById('game');
      const stateInput = document.getElementById('state');
      const gameDataList = document.getElementById('gameList');
      const stateDataList = document.getElementById('stateList');
      const stateOptions = Array.from(stateDataList.options).map(option => option.value);
      const gameOptions = Array.from(gameDataList.options).map(option => option.value)
      if (!stateOptions.includes(stateInput.value)) {
        const tourneyListHolder = document.getElementById('tourney-list');
        tourneyListHolder.innerHTML = `
        <ol id="tournament-listings">
        </ol><p class="tourney-list-holder" id="invalidState" data-remove="visible">Please input a valid state.</p>
        `
      } else if (!gameOptions.includes(gameInput.value)) {
        const tourneyListHolder = document.getElementById('tourney-list');
        tourneyListHolder.innerHTML = `
        <ol id="tournament-listings">
        </ol><p class="tourney-list-holder" id="invalidGame" data-remove="visible">Please input a valid game.</p>
        `
      } else {
        fetchedTournaments = requestStartApi(inputtedState, inputtedGame);
      }
    }
    validateForm();
    removeAllChildNodes(tournamentList); 
  });
});

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
  const xAxisNames = [];
  const chartValues = [];
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
    const tournamentAttendeeList = document.querySelector("#all-attendees")
    const events = event.target.dataset.events; 
    const eventDetails = () => { JSON.parse(events).forEach((event) => {
      addData(myChart, `${event.name}`, `${event.numEntrants}`)
      }) 
    }
    eventDetails();
    removeAllChildNodes(tournamentAttendeeList)
  });
});