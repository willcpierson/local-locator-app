const tourneyData = require('./tournamentdata.json');

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  };
};

function sortByEntrantCount(arrayOfTournies, inputtedGame) { //game event should already have been checked for existence, same with checkbox checked
  const sortedTournies = []
  const sortThis = []
  arrayOfTournies.forEach((tournament) => {
    sortThis.push(tournament.events[inputtedGame].attendeeList.length)
  })
  const sorted = sortThis.sort()
  sorted.forEach((attendeeCount) => {
    arrayOfTournies.forEach((tournament) => {
      if (tournament.events[inputtedGame].attendeeList.length === attendeeCount) {
        sortedTournies.push(tournament);
      }
    })
  })
  console.log(sortedTournies) // remove when done testing
  return sortedTournies
} 

function sortByAverageEntrantCount(array) {

}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-for-tournies-button").addEventListener('click', (event) => {
    event.preventDefault();
    let findTournament = {
      game: document.getElementById("game").value,
      state: document.getElementById("state").value
    };

    let inputtedGame = findTournament.game;
    let inputtedState = findTournament.state;

    const tournamentList = document.querySelector("#tournament-listings");
    removeAllChildNodes(tournamentList); 
    
    let tournamentListings = tourneyData.nodes
    if (document.getElementById("most-entrants").checked) {
      tournamentListings = sortByEntrantCount(tourneyData.nodes, inputtedGame).reverse()
    } else if (document.getElementById("least-entrants").checked) {
      tournamentListings = sortByEntrantCount(tourneyData.nodes, inputtedGame)
    }

    tournamentListings.forEach((tournament) => {
      // if entrants === checked, iterate thru and send to sorted by Entrants
      if (tournament.events[inputtedGame] && tournament.addrState === inputtedState) {
        let attendees = tournament.events[inputtedGame].attendeeList
        let tourney = tournamentList.appendChild(document.createElement('li'))
        tourney.innerHTML = `
        <a href="https://www.start.gg/${tournament.slug}" target="_blank">${tournament.name} | ${tournament.city}, ${tournament.addrState} | Entrants: ${attendees.length}</a>
        `
        tourney.setAttribute('id', tournament.id )
      }
    }) 
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

function removeData(chart) { // Remove later if not necessary // received from chart.js website
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
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
    let tournamentAttendeeList = document.querySelector("#all-attendees")

    removeAllChildNodes(tournamentAttendeeList)

    tourneyData.nodes.forEach((tournament) => {
      let attendees = tournament.events[inputtedGame].attendeeList  
      attendees.forEach((attendee) => {
        if (tournament.id === parseInt(event.target.id)) {
        let attendeeListed = tournamentAttendeeList.appendChild(document.createElement('li'))
        attendeeListed.innerHTML = `${attendee}`
        }
      })
    })

    if (!(xAxisNames[xAxisNames.length - 1] === event.target.innerText)) {
      tourneyData.nodes.forEach((tournament) => {
        if (tournament.id === parseInt(event.target.id)) {
          xAxisName = tournament.name;
          if (tournament.reoccurence === "weekly" || tournament.reoccurence === "biweekly") {
            addData(myChart, "Third Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastOne]);
            addData(myChart, "Second Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastTwo]);
            addData(myChart, "Most Recent", [tournament.events[inputtedGame].pastAttendeeCount.pastThree]);
            addData(myChart, "Currently Registered", [tournament.events[inputtedGame].attendeeList.length]);
            console.log(chartValues);
          } else {
            addData(myChart, "Current Entrants", [tournament.events[inputtedGame].attendeeList.length]);
          }
        }
      })
    }
  });
})



// Switching Data Representations
//Switch to Notable Entrants
document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("#entrants-button").onclick = () => {
    const graph = document.querySelector("footer");
    const attendeeList = document.querySelector("#attendee-list")
  
    graph.style.display = "none";
    attendeeList.style.display = "flex";
    console.log("click!")
  }
})
//Switch to Average Entrants
document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("#avg-entrants-button").onclick = () => {
    const graph = document.querySelector("footer");
    const attendeeList = document.querySelector("#attendee-list")
  
    graph.style.display = "block";
    attendeeList.style.display = "none";
    console.log("click!")
  }
})
