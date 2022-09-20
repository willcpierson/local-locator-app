Local Locator will allow the user to locate nearby or faraway locals by distance relative to themselves, general location (state, province, etc.). It will grab this information from start.gg's API, and display it on the map. Below the map will consist of some visualizations of several "stats", like current player entrants, notable (say top 3) players entering, and a couple pictures of the venue taken from Google. Input entered by the user will be current location, drop down menu for specific game they are looking for, and radius/area.

Functionality & MVPs
In { Local Locator}, users will be able to:
Specify which tournament games they are looking for
Search for tournaments based on radius OR location (city, state, etc.)
Search for games with a date within set timeframe by User
See stats/information about specific tournament selected

-Top bar = Title
-Side bar = Drop down game selector, radius, timeframe in that order
-Main screen = map
-Side bar to the right = title of currently select game
-Bottom bar = visualizations of various stats (possible bookmark within the block for individual stats)

-Technologies/APIs used;
	-Google Maps API
	-start.gg API

-Implementation Timeline
	-Friday Afternoon/Weekend
		-Get basics of map running, accepting inputs from user (radius, current loc)
		-basic information from individual tournaments being sent to us from APIs
			-location, entrant count
		-Basic barebones skeleton of the visual of the HTML
	
	-Monday
-Tighten data acquisition, complete user input with more specifics, visualize barebones data below map
	-Tuesday
		-CSS Day; focus on visuals, transitions of visualizations (data, side text of title)
	-Wednesday/Thursday morning
		-Clean Up loose ends, optimizations, bonus functionality if time