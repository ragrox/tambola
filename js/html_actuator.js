function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid) {
  var self = this;

  window.requestAnimationFrame(function () {

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });
  });
};

HTMLActuator.prototype.clear = function (grid) {
  var self = this;

    for (var x = 0; x < grid.width; x++) {
      for (var y = 0; y < grid.height; y++) {
        var cell = {x:x , y:y};
        this.removeTile(cell); 
      }
    }
};
// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;
  var cellContainer    = document.getElementById("grid-cell-"+ tile.y + "-" + tile.x);
  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile"];

  
  inner.classList.add("tile-inner");
  inner.textContent = tile.value;  
  classes.push("tile-new");
  this.applyClasses(wrapper, classes);
  wrapper.appendChild(inner);

  // Put the tile on the board
  cellContainer.appendChild(wrapper);
};

HTMLActuator.prototype.removeTile = function (tile) {
  var self = this;
  var cellContainer    = document.getElementById("grid-cell-"+ tile.y + "-" + tile.x);
  if(cellContainer.firstChild)
    cellContainer.removeChild(cellContainer.firstChild);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};
