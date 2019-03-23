# IMD3901_A3

## Overview
Two players arrive at index.html and one clicks the play button to begin the game. The active player, who is creating the drawing, will request shapes from the remote player, who will scale and send shapes to the active player's scene by attaching them to the player's cursor. The active player attempts to then position the shapes by moving in the scene and clicking on the shape to place it. The actice player should place shapes in such a way to create the drawing specified at the beginning of the game. Once they are satisfied with their drawing they may click the done button to send their completed drawing to the remote player. The remote player will guess what the drawing is. After guessing, the players swap roles. The game consists of two rounds, if the players both guess correctly, then a timer is evaluated to see who finished their drawing faster. 


## Challenges
Syncing over the shapes and finished drawing with all the proper values was difficult to figure out at first, but after sorting through some bugs, I was able to get it working quite nicely. The code for it however, is pretty confusing to manage and update at this point. I had to manually change and read attributes for elements instead of using the nice set/get functions that A-Frame provides. Another issue was swapping the html pages, at first I was attempting to have sockets join the other's room, and it took a fair amount of research to discover all I needed to do was change the window location for the socket. 


## Successes
I believe I had good success with my scaling feature, reading in the current mouse coordinates to scale the object seems to work rather effectively. My socket events worked nicely as well, I didn't have any issues working with these other than the limitations of how much data you can pass through them at one time (recursion errors). 


