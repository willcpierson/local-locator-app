const Heading = require('./scripts/heading');

const tourneyData = require('./tournamentdata.json');

console.log(tourneyData.nodes[0]);

tourneyData.nodes.forEach((tournament) => {
  if (tournament.events.Melee)
  console.log(tournament.events.Melee.attendeeList.length)
})

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  };
};

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

    tourneyData.nodes.forEach((tournament) => {
      if (tournament.events[inputtedGame] && tournament.addrState === inputtedState) {
        let tourney = tournamentList.appendChild(document.createElement('li'))
        tourney.innerHTML = `
        <a href="https://www.start.gg/${tournament.slug}" target="_blank">${tournament.name} | ${tournament.city}, ${tournament.addrState} | Entrants: ${tournament.events[inputtedGame].attendeeList.length}</a>
        `
      }
    }) 
  })
  
})


