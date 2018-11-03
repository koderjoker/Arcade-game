// Enemies the player must avoid
const Enemy = function(x, y, speed) {
  // Image/sprite for the enemies
  this.sprite = 'images/enemy-bug.png';
  // Set enemy initial location
  this.x = x;
  this.y = y;
  // Set enemy speed
  this.speed = speed;
};

// Update enemy's position
// Parameter: dt, a time delta between ticks
// To ensure the game runs at the same speed for all computers
Enemy.prototype.update = function(dt) {
  // Update enemy location
  this.x += this.speed * dt;
  // Handle collision with player
  if (player.x < this.x+70 &&
      player.x+70 > this.x &&
      player.y < this.y+50 &&
      player.y+50 > this.y) {
    restartGame();
  }
  // If enemy runs off board
  if (this.x >= 505) {
    this.x = 0;
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player function which initiates the Player
const Player = function(x, y, speed) {
  // The image/sprite for player
  this.sprite = 'images/char-princess-girl.png';
  // Set player initial location
  this.x = x;
  this.y = y;
  // Set player speed
  this.speed = speed;
};

// Update the player's position
Player.prototype.update = function(dt) {
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Receive key which was pressed and move the player according to that input
Player.prototype.handleInput = function(allowedKey) {
  // Moves the player to the left
  if (allowedKey =='left' && this.x-this.speed>0) {
    this.x = this.x - this.speed;
  }
  // Moves the player to the right
  else if (allowedKey=='right' && this.x+this.speed<450) {
    this.x = this.x + this.speed;
  }
  // Moves the player upwards
  else if (allowedKey=='up' && this.y-this.speed>-19) {
    this.y = this.y - this.speed;
    // If the player reaches river call restartGame()
    if (this.y < 0) {
      body = document.querySelector('body');
      body.insertAdjacentHTML('beforeend', '<h1>You made it to the river!!</h1>');
      setTimeout(remove = function() {
        sign = document.querySelector('h1');
        sign.remove();
        restartGame();
      }, 2000);
    }
  }
  // Moves the player downwards
  else if (allowedKey== 'down' && this.y+this.speed<400) {
    this.y = this.y + this.speed;
  }
}

// Reset player location
Player.prototype.reset = function() {
  this.x = 202.5;
  this.y = 383;
}

function restartGame() {
  // Place player at starting point
  player.reset();
  // Empty allEnemies array
  allEnemies.length = 0;
  // Add enemies for each row at fixed rows, random places and speeds
  allEnemies.push(
    new Enemy(Math.floor(Math.random() * 505), 60, Math.floor(Math.random() * 175) + 125),
    new Enemy(Math.floor(Math.random() * 505), 143, Math.floor(Math.random() * 150) + 100),
    new Enemy(Math.floor(Math.random() * 505), 226, Math.floor(Math.random() * 125) + 75)
  );
}

// Listens for key presses and sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// Instantiate objects

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Place the player object in a variable called player
var player = new Player(202.5, 383, 50);

restartGame();
