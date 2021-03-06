// Enemies our player must avoid
var Enemy = function(name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    //This function randomizes the row that the enemy appears on
    //its called at the start of the game and when an enemy leaves the screen
    this.randomizeRow = function(){
        var rand = Math.random();
        var row;
        if (rand <= 0.333){
            row = 60;
        } else if (rand > 0.333 && rand <= 0.666){
            row = 143;
        } else {
            row = 226;
        };
        return row;
    };
    this.x = -100;
    this.y = this.randomizeRow();
    this.speed = Math.random() * 100;
    this.name = name;

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + ((100 + this.speed) * dt);
    
    //Reset position of Enemy back to left side of play area
    // and rerandomize speed and row it appears on
    if (this.x > 505) {
        this.x = -100;
        this.y = this.randomizeRow();
        this.speed = Math.random() * 100;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (){
    this.initializePosition();
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
    if (this.y === -13) {
        this.initializePosition(); 
    };
}


Player.prototype.render = function(){
    /* body... */
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    
    // Enable player movement and prevents player from leaving the playing area
    if (keyCode === 'right' && this.x != 404) {
        this.x = this.x + 101;
    } else if (keyCode === 'left' && this.x != 0) {
        this.x = this.x - 101;
    } else if (keyCode === 'up' && this.y != -13) {
        this.y = this.y - 83;
    } else if (keyCode === 'down' && this.y != 402) {
        this.y = this.y + 83;
    };
    console.log(this.x,this.y);
}

// Method which resets the player's position back to the starting position
Player.prototype.initializePosition = function(){
    
    this.x = 202;
    this.y = 402;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy("pookie"),new Enemy('mcguyver'),new Enemy('lala')];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

