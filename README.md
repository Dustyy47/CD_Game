<h1>:joystick: CDG Match-two game</h1>
<p>The second project is written in React.js, during the practice at Crimea Digital</p>
<p>Live Demo: https://dustyy47.github.io/CD_Game/</p><h2>General Information</h2>
The page consists of a board with tiles (4x4 by default).
every 2 tiles have the same color (it could be an image, doesn't matter);
<p>each tile is closed, so the user cannot see the color (image).</p>
<p>The gameplay is a sequence of rounds.</p>
<p>In each round, the user selects 2 tiles of the same color so that they disappear until either all the cells are selected and the player moves on to the next round, or until the timer runs out. With each round, the time on the timer decreases by 5 seconds until it reaches the minimum number. After the end of the game, the player is shown his result, namely the number of rounds and the total time of the game, as well as his record is shown, a new record is set when the player either exceeded the previous</p>
<h2>How To Use</h2>

First make sure that you have Node installed.js and npm.
Clone the repository using the git
   
   ```git
   git clone https://github.com/Dustyy47/CD_Game.git
   ```
Navigate to the project folder using the cd your-repository command
Install the dependencies using the npm install command
  
   ```javascript
   npm install
   ```
Launch the application using the npm start command

   ```javascript
   npm start
   ```
Open the browser and go to http://localhost:3000 to see the app in action.
