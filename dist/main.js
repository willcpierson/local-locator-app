/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("const tourneyData = __webpack_require__(/*! ./tournamentdata.json */ \"./src/tournamentdata.json\");\n\nfunction removeAllChildNodes(parent) {\n  while (parent.firstChild) {\n    parent.removeChild(parent.firstChild);\n  }\n\n  ;\n}\n\n;\n\nfunction sortByEntrantCount(arrayOfTournies) {\n  //game event should already have been checked for existence, same with checkbox checked\n  const sortedTournies = [];\n  const sortThis = [];\n  arrayOfTournies.forEach(tournament => {\n    sortThis.push(tournament.events[inputtedGame].attendeeList.length);\n  });\n  const sorted = sortThis.sort();\n  arrayOfTournies.forEach(tournament => {\n    sorted.forEach(attendeeCount => {\n      if (tournament.events[inputtedGame].attendeeList.length === attendeeCount) {\n        return sortedTournies.push(tournament);\n      }\n    });\n  });\n  return sortedTournies;\n}\n\nfunction sortByAverageEntrantCount(array) {}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  document.getElementById(\"search-for-tournies-button\").addEventListener('click', event => {\n    event.preventDefault();\n    let findTournament = {\n      game: document.getElementById(\"game\").value,\n      state: document.getElementById(\"state\").value\n    };\n    let inputtedGame = findTournament.game;\n    let inputtedState = findTournament.state;\n    const tournamentList = document.querySelector(\"#tournament-listings\");\n    removeAllChildNodes(tournamentList);\n    let tournamentListings = tourneyData.nodes;\n    tournamentListings.forEach(tournament => {\n      // if entrants === checked, iterate thru and send to sorted by Entrants\n      if (tournament.events[inputtedGame] && tournament.addrState === inputtedState) {\n        let attendees = tournament.events[inputtedGame].attendeeList;\n        let tourney = tournamentList.appendChild(document.createElement('li'));\n        tourney.innerHTML = `\n        <a href=\"https://www.start.gg/${tournament.slug}\" target=\"_blank\">${tournament.name} | ${tournament.city}, ${tournament.addrState} | Entrants: ${attendees.length}</a>\n        `;\n        tourney.setAttribute('id', tournament.id);\n      }\n    });\n  });\n}); // Graphs\n\nfunction addData(chart, label, data) {\n  // received from chart.js website\n  chart.data.labels.push(label);\n  chart.data.datasets.forEach(dataset => {\n    dataset.data.push(data);\n  });\n  chart.update();\n}\n\nfunction removeData(chart) {\n  // Remove later if not necessary // received from chart.js website\n  chart.data.labels.pop();\n  chart.data.datasets.forEach(dataset => {\n    dataset.data.pop();\n  });\n  chart.update();\n}\n\nfunction resetChart(chartValueArray) {\n  while (chartValueArray.length > 0) {\n    chartValueArray.pop();\n  }\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const ctx = document.getElementById('myChart').getContext('2d');\n  let xAxisNames = [];\n  let chartValues = [];\n  const myChart = new Chart(ctx, {\n    type: 'bar',\n    data: {\n      labels: xAxisNames,\n      // push tourney names into this array\n      datasets: [{\n        label: 'Entrant Count',\n        //What data we are givng; entrant count, reoccurence, etc.\n        data: chartValues,\n        //push entrants into this array\n        backgroundColor: [// repeat this every loop, push into array\n        'rgba(54, 162, 235)', 'rgba(54, 162, 235)'],\n        borderColor: [// repeat this every loop, push into array\n        'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)'],\n        borderWidth: 1\n      }]\n    },\n    options: {\n      indexAxis: 'y',\n      scales: {\n        y: {\n          beginAtZero: true\n        }\n      }\n    }\n  });\n  const tourneyList = document.querySelector(\"ol\");\n  tourneyList.addEventListener('click', event => {\n    resetChart(chartValues);\n    resetChart(xAxisNames);\n    let findTournament = {\n      game: document.getElementById(\"game\").value\n    };\n    let inputtedGame = findTournament.game;\n\n    if (!(xAxisNames[xAxisNames.length - 1] === event.target.innerText)) {\n      tourneyData.nodes.forEach(tournament => {\n        if (tournament.id === parseInt(event.target.id)) {\n          xAxisName = tournament.name;\n\n          if (tournament.reoccurence === \"weekly\" || tournament.reoccurence === \"biweekly\") {\n            addData(myChart, \"Third Most Recent\", [tournament.events[inputtedGame].pastAttendeeCount.pastOne]);\n            addData(myChart, \"Second Most Recent\", [tournament.events[inputtedGame].pastAttendeeCount.pastTwo]);\n            addData(myChart, \"Most Recent\", [tournament.events[inputtedGame].pastAttendeeCount.pastThree]);\n            addData(myChart, \"Currently Registered\", [tournament.events[inputtedGame].attendeeList.length]);\n            console.log(chartValues);\n          } else {\n            addData(myChart, \"Current Entrants\", [tournament.events[inputtedGame].attendeeList.length]);\n          }\n        }\n      });\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b3VybmV5RGF0YSA9IHJlcXVpcmUoJy4vdG91cm5hbWVudGRhdGEuanNvbicpO1xuXG5mdW5jdGlvbiByZW1vdmVBbGxDaGlsZE5vZGVzKHBhcmVudCkge1xuICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH07XG59O1xuXG5mdW5jdGlvbiBzb3J0QnlFbnRyYW50Q291bnQoYXJyYXlPZlRvdXJuaWVzKSB7IC8vZ2FtZSBldmVudCBzaG91bGQgYWxyZWFkeSBoYXZlIGJlZW4gY2hlY2tlZCBmb3IgZXhpc3RlbmNlLCBzYW1lIHdpdGggY2hlY2tib3ggY2hlY2tlZFxuICBjb25zdCBzb3J0ZWRUb3VybmllcyA9IFtdXG4gIGNvbnN0IHNvcnRUaGlzID0gW11cbiAgYXJyYXlPZlRvdXJuaWVzLmZvckVhY2goKHRvdXJuYW1lbnQpID0+IHtcbiAgICBzb3J0VGhpcy5wdXNoKHRvdXJuYW1lbnQuZXZlbnRzW2lucHV0dGVkR2FtZV0uYXR0ZW5kZWVMaXN0Lmxlbmd0aClcbiAgfSlcbiAgY29uc3Qgc29ydGVkID0gc29ydFRoaXMuc29ydCgpXG4gIGFycmF5T2ZUb3Vybmllcy5mb3JFYWNoKCh0b3VybmFtZW50KSA9PiB7XG4gICAgc29ydGVkLmZvckVhY2goKGF0dGVuZGVlQ291bnQpID0+IHtcbiAgICAgIGlmICh0b3VybmFtZW50LmV2ZW50c1tpbnB1dHRlZEdhbWVdLmF0dGVuZGVlTGlzdC5sZW5ndGggPT09IGF0dGVuZGVlQ291bnQpIHtcbiAgICAgICAgcmV0dXJuIHNvcnRlZFRvdXJuaWVzLnB1c2godG91cm5hbWVudCk7XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbiAgcmV0dXJuIHNvcnRlZFRvdXJuaWVzXG59IFxuXG5mdW5jdGlvbiBzb3J0QnlBdmVyYWdlRW50cmFudENvdW50KGFycmF5KSB7XG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1mb3ItdG91cm5pZXMtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgZmluZFRvdXJuYW1lbnQgPSB7XG4gICAgICBnYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVcIikudmFsdWUsXG4gICAgICBzdGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0ZVwiKS52YWx1ZVxuICAgIH07XG5cbiAgICBsZXQgaW5wdXR0ZWRHYW1lID0gZmluZFRvdXJuYW1lbnQuZ2FtZTtcbiAgICBsZXQgaW5wdXR0ZWRTdGF0ZSA9IGZpbmRUb3VybmFtZW50LnN0YXRlO1xuXG4gICAgY29uc3QgdG91cm5hbWVudExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvdXJuYW1lbnQtbGlzdGluZ3NcIik7XG4gICAgcmVtb3ZlQWxsQ2hpbGROb2Rlcyh0b3VybmFtZW50TGlzdCk7IFxuICAgIFxuICAgIGxldCB0b3VybmFtZW50TGlzdGluZ3MgPSB0b3VybmV5RGF0YS5ub2Rlc1xuXG4gICAgdG91cm5hbWVudExpc3RpbmdzLmZvckVhY2goKHRvdXJuYW1lbnQpID0+IHtcbiAgICAgIC8vIGlmIGVudHJhbnRzID09PSBjaGVja2VkLCBpdGVyYXRlIHRocnUgYW5kIHNlbmQgdG8gc29ydGVkIGJ5IEVudHJhbnRzXG4gICAgICBpZiAodG91cm5hbWVudC5ldmVudHNbaW5wdXR0ZWRHYW1lXSAmJiB0b3VybmFtZW50LmFkZHJTdGF0ZSA9PT0gaW5wdXR0ZWRTdGF0ZSkge1xuICAgICAgICBsZXQgYXR0ZW5kZWVzID0gdG91cm5hbWVudC5ldmVudHNbaW5wdXR0ZWRHYW1lXS5hdHRlbmRlZUxpc3RcbiAgICAgICAgbGV0IHRvdXJuZXkgPSB0b3VybmFtZW50TGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpKVxuICAgICAgICB0b3VybmV5LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LnN0YXJ0LmdnLyR7dG91cm5hbWVudC5zbHVnfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7dG91cm5hbWVudC5uYW1lfSB8ICR7dG91cm5hbWVudC5jaXR5fSwgJHt0b3VybmFtZW50LmFkZHJTdGF0ZX0gfCBFbnRyYW50czogJHthdHRlbmRlZXMubGVuZ3RofTwvYT5cbiAgICAgICAgYFxuICAgICAgICB0b3VybmV5LnNldEF0dHJpYnV0ZSgnaWQnLCB0b3VybmFtZW50LmlkIClcbiAgICAgIH1cbiAgICB9KSBcbiAgfSlcbiAgXG59KVxuXG4vLyBHcmFwaHNcbmZ1bmN0aW9uIGFkZERhdGEoY2hhcnQsIGxhYmVsLCBkYXRhKSB7IC8vIHJlY2VpdmVkIGZyb20gY2hhcnQuanMgd2Vic2l0ZVxuICBjaGFydC5kYXRhLmxhYmVscy5wdXNoKGxhYmVsKTtcbiAgY2hhcnQuZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICBkYXRhc2V0LmRhdGEucHVzaChkYXRhKTtcbiAgfSk7XG4gIGNoYXJ0LnVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEYXRhKGNoYXJ0KSB7IC8vIFJlbW92ZSBsYXRlciBpZiBub3QgbmVjZXNzYXJ5IC8vIHJlY2VpdmVkIGZyb20gY2hhcnQuanMgd2Vic2l0ZVxuICBjaGFydC5kYXRhLmxhYmVscy5wb3AoKTtcbiAgY2hhcnQuZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICBkYXRhc2V0LmRhdGEucG9wKCk7XG4gIH0pO1xuICBjaGFydC51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRDaGFydChjaGFydFZhbHVlQXJyYXkpIHtcbiAgd2hpbGUgKGNoYXJ0VmFsdWVBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgY2hhcnRWYWx1ZUFycmF5LnBvcCgpXG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDaGFydCcpLmdldENvbnRleHQoJzJkJyk7XG4gIGxldCB4QXhpc05hbWVzID0gW107XG4gIGxldCBjaGFydFZhbHVlcyA9IFtdO1xuICBjb25zdCBteUNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuICAgIHR5cGU6ICdiYXInLFxuICAgIGRhdGE6IHtcbiAgICAgICAgbGFiZWxzOiB4QXhpc05hbWVzLCAvLyBwdXNoIHRvdXJuZXkgbmFtZXMgaW50byB0aGlzIGFycmF5XG4gICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgbGFiZWw6ICdFbnRyYW50IENvdW50JywgLy9XaGF0IGRhdGEgd2UgYXJlIGdpdm5nOyBlbnRyYW50IGNvdW50LCByZW9jY3VyZW5jZSwgZXRjLlxuICAgICAgICAgICAgZGF0YTogY2hhcnRWYWx1ZXMsIC8vcHVzaCBlbnRyYW50cyBpbnRvIHRoaXMgYXJyYXlcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogWyAgICAgICAgICAvLyByZXBlYXQgdGhpcyBldmVyeSBsb29wLCBwdXNoIGludG8gYXJyYXlcbiAgICAgICAgICAgICAgICAncmdiYSg1NCwgMTYyLCAyMzUpJyxcbiAgICAgICAgICAgICAgICAncmdiYSg1NCwgMTYyLCAyMzUpJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiBbICAgICAgICAgICAgICAvLyByZXBlYXQgdGhpcyBldmVyeSBsb29wLCBwdXNoIGludG8gYXJyYXlcbiAgICAgICAgICAgICAgICAncmdiYSg1NCwgMTYyLCAyMzUsIDEpJyxcbiAgICAgICAgICAgICAgICAncmdiYSg1NCwgMTYyLCAyMzUsIDEpJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxXG4gICAgICAgIH1dXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGluZGV4QXhpczogJ3knLFxuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHk6IHtcbiAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgY29uc3QgdG91cm5leUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwib2xcIik7XG4gIHRvdXJuZXlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgcmVzZXRDaGFydChjaGFydFZhbHVlcylcbiAgICByZXNldENoYXJ0KHhBeGlzTmFtZXMpXG4gICAgbGV0IGZpbmRUb3VybmFtZW50ID0ge1xuICAgICAgZ2FtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lXCIpLnZhbHVlXG4gICAgfTtcblxuICAgIGxldCBpbnB1dHRlZEdhbWUgPSBmaW5kVG91cm5hbWVudC5nYW1lO1xuXG4gICAgaWYgKCEoeEF4aXNOYW1lc1t4QXhpc05hbWVzLmxlbmd0aCAtIDFdID09PSBldmVudC50YXJnZXQuaW5uZXJUZXh0KSkge1xuICAgICAgdG91cm5leURhdGEubm9kZXMuZm9yRWFjaCgodG91cm5hbWVudCkgPT4ge1xuICAgICAgICBpZiAodG91cm5hbWVudC5pZCA9PT0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkKSkge1xuICAgICAgICAgIHhBeGlzTmFtZSA9IHRvdXJuYW1lbnQubmFtZTtcbiAgICAgICAgICBpZiAodG91cm5hbWVudC5yZW9jY3VyZW5jZSA9PT0gXCJ3ZWVrbHlcIiB8fCB0b3VybmFtZW50LnJlb2NjdXJlbmNlID09PSBcImJpd2Vla2x5XCIpIHtcbiAgICAgICAgICAgIGFkZERhdGEobXlDaGFydCwgXCJUaGlyZCBNb3N0IFJlY2VudFwiLCBbdG91cm5hbWVudC5ldmVudHNbaW5wdXR0ZWRHYW1lXS5wYXN0QXR0ZW5kZWVDb3VudC5wYXN0T25lXSk7XG4gICAgICAgICAgICBhZGREYXRhKG15Q2hhcnQsIFwiU2Vjb25kIE1vc3QgUmVjZW50XCIsIFt0b3VybmFtZW50LmV2ZW50c1tpbnB1dHRlZEdhbWVdLnBhc3RBdHRlbmRlZUNvdW50LnBhc3RUd29dKTtcbiAgICAgICAgICAgIGFkZERhdGEobXlDaGFydCwgXCJNb3N0IFJlY2VudFwiLCBbdG91cm5hbWVudC5ldmVudHNbaW5wdXR0ZWRHYW1lXS5wYXN0QXR0ZW5kZWVDb3VudC5wYXN0VGhyZWVdKTtcbiAgICAgICAgICAgIGFkZERhdGEobXlDaGFydCwgXCJDdXJyZW50bHkgUmVnaXN0ZXJlZFwiLCBbdG91cm5hbWVudC5ldmVudHNbaW5wdXR0ZWRHYW1lXS5hdHRlbmRlZUxpc3QubGVuZ3RoXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFydFZhbHVlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZERhdGEobXlDaGFydCwgXCJDdXJyZW50IEVudHJhbnRzXCIsIFt0b3VybmFtZW50LmV2ZW50c1tpbnB1dHRlZEdhbWVdLmF0dGVuZGVlTGlzdC5sZW5ndGhdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcbn0pXG5cbiJdLCJuYW1lcyI6WyJ0b3VybmV5RGF0YSIsInJlcXVpcmUiLCJyZW1vdmVBbGxDaGlsZE5vZGVzIiwicGFyZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwic29ydEJ5RW50cmFudENvdW50IiwiYXJyYXlPZlRvdXJuaWVzIiwic29ydGVkVG91cm5pZXMiLCJzb3J0VGhpcyIsImZvckVhY2giLCJ0b3VybmFtZW50IiwicHVzaCIsImV2ZW50cyIsImlucHV0dGVkR2FtZSIsImF0dGVuZGVlTGlzdCIsImxlbmd0aCIsInNvcnRlZCIsInNvcnQiLCJhdHRlbmRlZUNvdW50Iiwic29ydEJ5QXZlcmFnZUVudHJhbnRDb3VudCIsImFycmF5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZmluZFRvdXJuYW1lbnQiLCJnYW1lIiwidmFsdWUiLCJzdGF0ZSIsImlucHV0dGVkU3RhdGUiLCJ0b3VybmFtZW50TGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3VybmFtZW50TGlzdGluZ3MiLCJub2RlcyIsImFkZHJTdGF0ZSIsImF0dGVuZGVlcyIsInRvdXJuZXkiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJzbHVnIiwibmFtZSIsImNpdHkiLCJzZXRBdHRyaWJ1dGUiLCJpZCIsImFkZERhdGEiLCJjaGFydCIsImxhYmVsIiwiZGF0YSIsImxhYmVscyIsImRhdGFzZXRzIiwiZGF0YXNldCIsInVwZGF0ZSIsInJlbW92ZURhdGEiLCJwb3AiLCJyZXNldENoYXJ0IiwiY2hhcnRWYWx1ZUFycmF5IiwiY3R4IiwiZ2V0Q29udGV4dCIsInhBeGlzTmFtZXMiLCJjaGFydFZhbHVlcyIsIm15Q2hhcnQiLCJDaGFydCIsInR5cGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwib3B0aW9ucyIsImluZGV4QXhpcyIsInNjYWxlcyIsInkiLCJiZWdpbkF0WmVybyIsInRvdXJuZXlMaXN0IiwidGFyZ2V0IiwiaW5uZXJUZXh0IiwicGFyc2VJbnQiLCJ4QXhpc05hbWUiLCJyZW9jY3VyZW5jZSIsInBhc3RBdHRlbmRlZUNvdW50IiwicGFzdE9uZSIsInBhc3RUd28iLCJwYXN0VGhyZWUiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ }),

/***/ "./src/tournamentdata.json":
/*!*********************************!*\
  !*** ./src/tournamentdata.json ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"nodes":[{"slug":"tournament/syracuse-smash-rgc-2022","id":1,"name":"Syracuse Smash @ RGC 2022","city":"Syracuse","addrState":"NY","reoccurence":"weekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Moky","Polish","Swedish Delight","Tommy","BuckleBeeBlap","Lord of Runescape","Player 1337","Thomas","Jimmy Jams","Alto","Soprano","Stark","Skywalker","App Academy Assassin","Baelish","Subway: Eat Fresh","Username Blank","Sicko Mode","Endeavor","Solo","Picard","Parker","Hornet","BumbleBee","$$$$","Timebones","SlipnSlide"],"pastAttendeeCount":{"pastOne":17,"pastTwo":29,"pastThree":21}}}},{"slug":"tournament/pk-fire-10","id":2,"name":"PK Fire 10","city":"Poughkeepsie","addrState":"NY","reoccurence":"biweekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Moky","Polish","Swedish Delight","Tommy","BuckleBeeBlap","Lord of Runescape","Player 1337","Thomas","Jimmy Jams","Alto","App Academy Assassin","Baelish","Subway: Eat Fresh","Username Blank","Sicko Mode","Endeavor","Solo","Picard","$$$$","Timebones","SlipnSlide","Prometheus","HiFi","Isles","Duk","AliceClimbers"],"pastAttendeeCount":{"pastOne":9,"pastTwo":21,"pastThree":15}},"Super Smash Bros. Ultimate":{"attendeeList":["MKLeo","Tweek","Sparg0","Hungrybox","Light","Wizzrobe","Maister","FlimFlam","Boople","Sham","John","BuckleBeeBlap","Moky","Polish","Swedish Delight","Tommy","BuckleBeeBlap","Lord of Runescape","Player 1337","Thomas","Jimmy Jams","Alto","Soprano","Stark","Skywalker","App Academy Assassin","Baelish","Subway: Eat Fresh","Username Blank","Sicko Mode","Endeavor","Solo","Picard","Parker","Hornet","BumbleBee","$$$$","Timebones","SlipnSlide","Prometheus","HiFi","Isles","Duk","AliceClimbers"],"pastAttendeeCount":{"pastOne":21,"pastTwo":17,"pastThree":23}}}},{"slug":"tournament/the-honeycomb-iv","id":3,"name":"The Honeycomb IV","city":"Rochester","addrState":"NY","reoccurence":"biweekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib"],"pastAttendeeCount":{"pastOne":7,"pastTwo":14,"pastThree":8}},"Ultimate":{"attendeeList":["MKLeo","Tweek","Sparg0","Hungrybox","Light","Wizzrobe","Maister","FlimFlam","Boople","Sham","John","BuckleBeeBlap"],"pastAttendeeCount":{"pastOne":21,"pastTwo":17,"pastThree":24}}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":4,"name":"NYU Melee Torch Fest #3 (WITH AMATEUR BRACKET)","city":"Brooklyn","addrState":"NY","reoccurence":"biweekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Tommy","BuckleBeeBlap","Lord of Runescape","Player 1337"],"pastAttendeeCount":{"pastOne":19,"pastTwo":24,"pastThree":20}}}},{"slug":"tournament/the-nightclub-s4e10-os-nyc","id":5,"name":"The Nightclub S4E10 @ OS NYC","city":"New York","addrState":"NY","reoccurence":"weekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Void","Danny Phantom","Moky","Polish","Swedish Delight","Tommy","BuckleBeeBlap","Lord of Runescape","Player 1337","Thomas","Jimmy Jams","Alto","Soprano","Stark","Skywalker","App Academy Assassin","Baelish","Subway: Eat Fresh","Username Blank","Sicko Mode","Endeavor","Solo","Picard","Parker","Hornet","BumbleBee","$$$$","Timebones","SlipnSlide","Prometheus","HiFi","Isles","Duk","AliceClimbers","deft","Wally","Yahooz","Swiftbass","Cmac","Jessica Jones","cowboy","altered","Jamrun"],"pastAttendeeCount":{"pastOne":72,"pastTwo":96,"pastThree":81}}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":7,"name":"The Function 2","city":"Brooklyn","addrState":"NY","reoccurence":"major","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Moburu","unga bunga","semi-colon","Hercules","DarkGenex","Aklo","a horse who can drive","Void","Danny Phantom","Moky","Polish","Swedish Delight","Tommy","BuckleBeeBlap","Luu","Spareparts","Mars","Daniel"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":8,"name":"Another NYC Tournament??? #136","city":"New York","addrState":"NY","reoccurence":"weekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Solo","Picard","Parker","Hornet","BumbleBee","$$$$","Timebones","SlipnSlide","Prometheus","HiFi","Isles","Duk"],"pastAttendeeCount":{"pastOne":9,"pastTwo":13,"pastThree":11}}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":9,"name":"Smash The Spire #13","city":"Bronx","addrState":"NY","reoccurence":"biweekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Isles","Duk"],"pastAttendeeCount":{"pastOne":15,"pastTwo":15,"pastThree":16}}}},{"slug":"tournament/apex-2022/details","id":10,"name":"Apex 2022","city":"Secaucus","addrState":"NJ","reoccurence":"major","events":{"Super Smash Bros. Melee":{"attendeeList":["Mango","Hungrybox","Zain","iBDW","Zuppy","Amsa","Leffen","a horse who can drive","Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Moky","Polish","Swedish Delight","Tommy","BuckleBeeBlap","Lord of Runescape","Player 1337","Thomas","Jimmy Jams","Alto","Soprano","Stark","Skywalker","App Academy Assassin","Baelish","Subway: Eat Fresh","Username Blank","Sicko Mode","Endeavor","Solo","Picard","Parker","Hornet","BumbleBee","$$$$","Timebones","SlipnSlide","Prometheus","HiFi","Isles","Duk","AliceClimbers"]},"Super Smash Bros. Ultimate":{"attendeeList":["MKLeo","Tweek","Sparg0","Hungrybox","Light","Wizzrobe","Maister","FlimFlam","Boople","Sham","John","BuckleBeeBlap"]}}},{"slug":"tournament/nyu-melee-torch-fest-3-with-amateur-bracket","id":11,"name":" Stage Select #84","city":"Jersey City","addrState":"NJ","reoccurence":"weekly","events":{"Super Smash Bros. Melee":{"attendeeList":["Jflex","Bbatts","Ryobeat","JoJo","Jmook","Willy P","Fahey","Drew6","forsaken","Zann","Forte","Siddward","Mot$","Vino","Jib","Yahooz","Swiftbass","Cmac","Jessica Jones","cowboy","altered","Jamrun"],"pastAttendeeCount":{"pastOne":29,"pastTwo":31,"pastThree":21}}}}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;