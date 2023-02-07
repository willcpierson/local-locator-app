# local-locator-app

## PRODUCTION

## Link to live version
https://willcpierson.github.io/local-locator-app/

## Instructions on how to play/interact with the project.
  - Top 3 links in the nav bar area take you to github, linkedIn, and changes UI color scheme back and forth on click.
  - Search through the database by game, state, and filter by entrant count or average entrant count over past three tournaments.
  - You can interact with the container below which will show you visual data on entrants and attendance.
  - Clicking on the list items that appear after a search gives you access to that specific tournament's data stated above, and clicking on the text will link you to that tournament page.

## List of technologies / libraries / APIs used.
  - Start.gg API will be used, due to it using graphQL I will be coming back during job search and connecting it; using dummy database taken from the API explorer, so functionality will be the same

## Technical implementation details
![image](https://user-images.githubusercontent.com/89366845/193885535-0a53062a-c014-4225-b4c8-21ccf040dd2b.png)
  - Select type of game, and area (currently state), and filter on request (default is by maximum entrants), then click search to begin query
![image](https://user-images.githubusercontent.com/89366845/193885954-1aab7343-cabc-4c38-8ec0-5df7ffde1f68.png)
  - Select specific tournament. Clicking on the text will take you to the tournament, clicking on the list item background will generate the statistics below
![image](https://user-images.githubusercontent.com/89366845/193886351-2887f483-7fe7-427c-b4a7-37b083d96a2a.png)
  - Click on "Average Entrants" to see stats based on average past attendees (default). Attendee List will show all attendees **currently** registered to that specific event


## To-dos / future features:
  - Once API is connected, create map box (hidden underneath "tourney list" box currently visible)
  - Add button to each list element (tournament) to be more clear that it will redirect you to the start.gg page for said tournament
  - Clean up small bugs (attendee list background and list tournament color bug)
  - Add a "Join" button to each list item (tournament), to more visually tell the user how to get linked to that start.gg page more intuitively
