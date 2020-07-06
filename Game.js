
var canvas = document.getElementById("background");
var canva = document.getElementById("foreground");
var ctx = canvas.getContext("2d");
var CV = canva.getContext("2d");

var enemyRadius = 20;
var shipRadius = 50;
var eventCall = {
      mx: 100,
      my: 200
  };
var timeX =
{
  seconds: 0,
  milli: 0
};
let enemies;
var Interval;

var myImage = new Image(1000, 500);
    myImage.setAttribute("id", "starBackground");
var ship = new Image(30, 30);
    ship.setAttribute("id", "Ship");
    ship.src="shipRadius.png";
var d = new Date();
var n = d.toString();
var da = n.substring(4, 15);
document.getElementById("date").innerHTML = da;
document.getElementById("box").addEventListener("mousemove", function(e)
  {
      eventCall = showCoords(e);
      //console.log(eventCall.mx, eventCall.my);
  });

window.onload = function()
{
  myImage.addEventListener("load", function()
    {
      ctx.drawImage(myImage, 0, 0);
    }, false);

  myImage.src = "background.png";
};

function Centre(vx, vy, radius)
{
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
      this.velocity = {
        vx: 0,
        vy: 0
      };

        this.update = () =>
        {
              this.draw();
        };

        this.draw = () =>
        {
          CV.fillStyle = "#7eed";
          CV.beginPath();
          CV.arc(this.vx, this.vy, this.radius, 0, Math.PI*2, true);
          CV.fill();
          CV.closePath();

          CV.drawImage(ship, 460, 210);
        };

}

var c = new Centre(500, 250, 50);
var lives = 1;

function bounceOffCentre(object1, object2)
{
  const accelerationX = object2.velocity.vx - object1.velocity.vx;
  const accelerationY = object2.velocity.vy - object1.velocity.vy;

  var sphereDist = ((accelerationX) * (accelerationX)) + ((accelerationY) * (accelerationY));

        if( sphereDist <= (enemyRadius*shipRadius))
        {
          //console.log("passed through centre");
          lives--;
          console.log(lives);
            //this following line of code breaks the game by letting enemyShips disappear seemingly of their own accord without
            //any input from the user. Its use was so that instead of decrementing the lives value over time every frame,
            //only one life would be lost each time an enemyShip came into contact with the teal safezone around the station in the centre.
            //for some reason this doesn't work. Also the ship that came into contact with the centre station would be eliminated to give the user
            //more chance to getting a higher score.

        /*  for(var x = 0; x < enemies.length; x++)
          {
            if(enemies[x].id == object1.id)
            {
                enemies.splice(x, 1);
            }
          }*/

          //below code doesn't work? It was debugged using this above console log statement and changing the number of enemyShips to 4 and enemyRadius to 70
          //so it is visible that on entering this teal area on the screen that it is recognised that an obstacle is going through the centre, however for
          //some reason the velocity the objects are moving at don't reverse... with more time this would be debugged even further.
          object1.velocity.vx = - object1.velocity.vx;
          object1.velocity.vy = - object1.velocity.vy;
          //console.log(lives);

          if(lives <= -2000)
          {
            gameOver();
          }
        }
}

function bounceOffPaddle(object1, height, width)
{
  /*			var rh=80; //height of rectangle
      var rw=0; //width of rectangle

  //bx, by, radius is 10, dbx =2, dby = 7
      var distX = Math.abs(enemyShip.x - eventCall.mx-rw/2)
      var distY = Math.abs(enemyShip.y - eventCall.my-rh/2);

      if(distX > rw/2 + enemyShip.r)
      {
        return false;
      }

      if(distY > rh/2 + enemyShip.r)
      {
        return false;
      }

      if(distX <= rw/2)
      {
        return true;
      }

      if(distY <= rh/2)
      {
        return true;
      }

      var dbx= distX - rw/2;
      var dby= distY - rh/2;

      return (dbx*dbx + dby*dby<=(10*10));
  }*/
}

function Ship(x, y, radius, id)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = 1;
    this.id = id;

    this.velocity = {
      vx: (Math.random() - 0.5) *5,
      vy: (Math.random() - 0.5) *3
    };
    //console.log(this.velocity.vx);
      this.update = enemies =>
      {
            this.draw();

            for(let i = 0; i < enemies.length; i++)
            {
                if(distanceBetween(this.x, this.y, enemies[i].x, enemies[i].y) - this.radius * 2 < 0)
                {
                    //console.log(this.velocity);
                    bounceOffEachOther(this, enemies[i]);
                }

                if(distanceBetween(this.x,this.y, 500, 250) - shipRadius * 2 < 0)
                {
                  //console.log("passed through centre");
                    bounceOffCentre(this, c);
                    this.velocity.vx = - this.velocity.vx;
                    this.velocity.vy = - this.velocity.vy;
                }
            }

          if(this.x - this.radius <= 0 || this.x + this.radius >= canva.width)
          {
            this.velocity.vx = - this.velocity.vx;
          }

          if(this.y - this.radius <= 0 || this.y + this.radius >= canva.height)
          {
            this.velocity.vy = - this.velocity.vy;
          }

          this.x += this.velocity.vx;
          this.y += this.velocity.vy;
      };

      this.draw = () =>
      {
        CV.fillStyle = "#c4be4a";
        CV.beginPath();
        CV.arc(this.x, this.y, enemyRadius, 0, Math.PI*2, true);
        CV.fill();
        CV.closePath();
      };
}

function randomNum(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function distanceBetween(x1, y1, x2, y2)
{
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function spawnEnemy()
{
    enemies = [];

    for(let i = 0; i < 10; i++)
    {
      let bx = randomNum(enemyRadius, canva.width - enemyRadius);
      let by = randomNum(enemyRadius, canva.height - enemyRadius);

        if(i !== 0)
        {
            for(let j = 0; j < enemies.length; j++)
            {
                if(distanceBetween(bx, by, enemies[j].vx, enemies[j].vy) - enemyRadius * 2 < 0)
                {
                  bx = randomNum(enemyRadius, canva.width - enemyRadius);
                  by = randomNum(enemyRadius, canva.height - enemyRadius);

                  j = -1;
                }
            }
        }
      enemies.push(new Ship(bx, by, enemyRadius, i));

    }
}

function showCoords(e)
{
        //console.log("test" + e);
        var coordinates =
         {
          mx: e.clientX,
          my: e.clientY
         };

        var coor = "X coords: " + coordinates.mx + ", Y coords: " + coordinates.my;
        //document.getElementById("demo").innerHTML = coor;

        return coordinates;
  }

function shields(sx, sy)
{
      this.sx = sx;
      this.sy = sy;
      var shieldHeight = 0;
      var shieldWidth = 80;

      shieldX = -40;
      var angle =
        Math.atan2(
        //ship position - mouse position
          250 - this.sy,
          500 - this.sx
        ) * 180 / Math.PI;

        this.update = function()
        {
             CV.save();

             CV.translate(500, 250);
             CV.rotate((angle > 180 ? -angle : angle));

             CV.beginPath();
             CV.strokeStyle="white";
             CV.lineWidth = 5;
             CV.rect(shieldX, 70, shieldWidth, shieldHeight);

              //CV.arc(0,0, 70, 0, Math.PI, true);
              //CV.rect(-70, -50, 0, 80);
              //CV.rect(-70, 60, 10, 10);
              //x, y, radius, startAngle, endAngle, direction
              //CV.arc(0, 0, 70, 0, Math.PI*1.5, true);
                    //CV.arc(0, 0, 70, 0.1, 1.4*Math.PI, false);
              CV.stroke();
             CV.restore();
        };
  }

function bounceOffEachOther(object1, object2)
{
  const accelerationX = object1.velocity.vx - object2.velocity.vx;
  const accelerationY = object1.velocity.vy - object2.velocity.vy;

  const xDist = object2.x - object1.x;
  const yDist = object2.y - object1.y;

      if(accelerationX * xDist + accelerationY * yDist >= 0)
      {
        const angle = -Math.atan2(object2.y - object1.y, object2.x - object1.x);

            const m1 = object1.mass;
            const m2 = object2.mass;

        const rotatedVelocities1 = {
          x: object1.velocity.vx * Math.cos(angle) - object1.velocity.vy * Math.sin(angle),
          y: object1.velocity.vx * Math.sin(angle) + object1.velocity.vy * Math.cos(angle)
          };

        const rotatedVelocities2 = {
          x: object2.velocity.vx * Math.cos(angle) - object2.velocity.vy * Math.sin(angle),
          y: object2.velocity.vx * Math.sin(angle) + object2.velocity.vy * Math.cos(angle)
          };

            // Velocity after 1d collision equation
        const v1 = { x: rotatedVelocities1.x * (m1 - m2) / (m1 + m2) + rotatedVelocities2.x * 2 * m2 / (m1 + m2), y: rotatedVelocities1.y };
        const v2 = { x: rotatedVelocities2.x * (m1 - m2) / (m1 + m2) + rotatedVelocities1.x * 2 * m2 / (m1 + m2), y: rotatedVelocities2.y };

        const unRotatedVelocities1 = {
            x: v1.x * Math.cos(-angle) - v1.x * Math.sin(-angle),
            y: v1.x * Math.sin(-angle) + v1.x * Math.cos(-angle)
          };

        const unRotatedVelocities2 = {
            x: v2.y * Math.cos(-angle) - v2.y * Math.sin(-angle),
            y: v2.y * Math.sin(-angle) + v2.y * Math.cos(-angle)
          };

            // Swap particle velocities for realistic bounce effect
            object1.velocity.vx = unRotatedVelocities1.x;
            object1.velocity.vy = unRotatedVelocities1.y;
          //	console.log(unRotatedVelocities2);
            object2.velocity.vx = unRotatedVelocities2.x;
            object2.velocity.vy = unRotatedVelocities2.y;
      }
    }

var appendTens = document.getElementById("demo")
var appendSeconds = document.getElementById("seconds")

function startTimer ()
{
       timeX.milli++;

       if(timeX.milli < 9)
       {
         appendTens.innerHTML = "0" + timeX.milli;
       }

       if (timeX.milli > 9)
       {
         appendTens.innerHTML = timeX.milli;

       }

       if (timeX.milli > 99)
       {
         timeX.seconds++;
         appendSeconds.innerHTML = "0" + timeX.seconds;
         timeX.milli = 0;
         appendTens.innerHTML = "0" + 0;
       }

       if (timeX.seconds > 9)
       {
         appendSeconds.innerHTML = timeX.seconds;
       }

       return timeX;
  }

  function stopTimer()
  {
    clearInterval(Interval);
    //console.log("i've stopped");
  }

function gameOver()
{
    getScore();
    document.getElementById("endScreen").style.display = 'block';
    stopTimer();
}

function startGame()
{
    document.getElementById("introScreen").style.display = "none";
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    spawnEnemy();
    animate();
}

function replay()
{
  document.location.reload();

}

function getScore()
{
  document.getElementById("score").innerHTML = timeX.seconds + " seconds";
}

var jsonData = {"players": [
    {"username":"donatello", "score": "34","date":"12/04/18"},
    {"username":"saad1h2", "score": "41", "date":"12/04/18"},
    {"username":"eski404", "score": "29", "date":"26/02/19"},
    {"username":"toaster", "score": "12", "date":"20/01/19"},
    {"username":"shw3nk", "score": "20", "date":"18/04/19"},
]};

storeData();
document.getElementById("submit").addEventListener("click", addData);
document.getElementById("submit").addEventListener("validate", checkValidity);

function addData()
{
    var username = String(document.getElementById("username").value);
    var score = String(timeX.seconds);
    var date = String(da);

    jsonData.players.push({"username": username, "score": score, "date": date});
    showPlayers();
    storeData();
}

function storeData()
{
    var jsonString = JSON.stringify(jsonData);
    localStorage.setItem("AllPlayers", jsonString);
    var localObj = localStorage.getItem("AllPlayers");
    //console.log(JSON.parse(localObj));
}

function showPlayers()
{
  for(var x; x < jsonData.players.length; x++)
  {
    //console.log("jsonData.players[x].username");
    document.getElementById("demo").innerHTML += "<li>" + jsonData.players[x].username + " " + jsonData.students[x].date + "</li>";
  }
}

function checkValidity()
{
    var valid = document.getElementById("submit")[0];
    console.log("hmhm yes i am valid");
    if(valid.checkValidity()){
      validity.submit();
    }
    else{
      alert("Username must be at least 2 characters long and less than 10 characters.");
    }
}

function animate()
{
    requestAnimationFrame(animate);
    CV.clearRect(0, 0, canva.width, canva.height);
    c.draw();

    var shieldWidth = 80;
    var s = new shields(eventCall.mx, eventCall.my, 0, 80);
        s.update();

    enemies.forEach(enemy => {
      enemy.update(enemies);
    });


}
