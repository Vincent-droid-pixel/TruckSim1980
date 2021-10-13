

let myFont;
let music;

function getLane(lane, apos) {

  if (lane == 1) {
    return createVector(apos - 70, 800)
  }
  if (lane == 2) {
    return createVector(apos + 500, 800)
  }
  if (lane == 3) {
    return createVector(apos - 600, 800)
  }
  if (lane == 4) {
    return createVector(apos + 1000, 800)
  }
}

function preload() {
  img1 = loadImage("Images/truck.png");
  img2 = loadImage("Images/explosion.png");
  tegenliggerImg = loadImage("Images/tegenligger1.png");
  img4 = loadImage("Images/startscreen.png");
  img9 = loadImage("Images/zon.png")
  myFont = loadFont('Fonts/StickNoBills-Regular.ttf');
  music = loadSound('Geluiden/sb_indreams.mp3');
  startmuziek = loadSound('Geluiden/MenuMuziek.mp3')
  explosion = loadSound('Geluiden/boem2.mp3');
}

var menumuziek = 0;
var spawnen = 250;
var spawndeler = 5;
var score = 0;
var highscore = 0;
var screen = 0;
var [xpos, zpos, xspeed, yspeed, gameover] = [450, 550, 0, 0, 0];
var collisionRect;

var tegenLiggers = [];

function setup() {
  createCanvas(1000, 800);

  collisionRect = {
    x: 200,
    y: height - 200,
    w: 200,
    h: 300
  };
}

function draw() {

  //startscherm
  if (screen == 0) {
    menu()
  }
  //spel
  if (screen == 1) {
    game()
  }
  //wat er gebeurt bij het game-over scherm
  if (screen == 2) {
    gameOver()
  }
}

//maken driehoeken die de weg zijn en horizon
function weg() {
  fill(69, 69, 69)
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 100, xpos + 600, 800, xpos, 800);

  fill(69, 69, 69);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 100, xpos + 1200, 800, xpos + 600, 800);

  fill(69, 69, 69);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 100, xpos - 600, 800, xpos, 800);

  fill(69, 69, 69);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 100, xpos - 1200, 800, xpos - 600, 800);

  fill(74, 255, 231)
  strokeWeight(0);
  rect(0, 0, 1000, 100)
}

//menu
function menu() {
  gameover = 0
  stroke(0);
  strokeWeight(5);
  textSize(60);
  textFont(myFont);
  fill('white')
  if (frameCount % 40 === 0) {
    text('PRESS ENTER TO START', 260, 400)
  } else if (frameCount % 20 === 0) {
    image(img4, 0, 0, 1000, 800);
    if (menumuziek == 0) {
      startmuziek.loop();
      menumuziek = 1;
    }
  }


}

//gameover scherm
function gameOver() {
  music.stop()
  if (gameover == 0) {
    explosion.play();
    gameover = 1;
  }
  if (highscore < score) {
    highscore = score;
  }
  image(img2, 0, 0, 1000, 800);
  textSize(150);
  stroke(0, 0, 0);
  strokeWeight(10);
  text('Game Over', 140, 140);
  textSize(100)
  strokeWeight(4);
  text('Score: ' + score, 140, 300);
  text('Highscore:' + highscore, 140, 400);
  textSize(50);
  text('PRESS ENTER TO GO TO THE MAIN MENU', 100, 700);
}

//game
function game() {
  background(209, 173, 56);

  //maken driehoeken die de weg zijn en horizon
  weg();

  //zon
  image(img9, 800, 40, 80, 80);

  if (frameCount % 1000 === 0) {
    spawnen = spawnen - spawndeler;
  }

  if (spawnen == 0) {
    spawndeler = 0
  }

  if (frameCount % spawnen === 0) {
    tegenLiggers.push(new Tegenligger());
  }

  tegenLiggers.forEach((t) => {
    t.show();
  });


  //vrachtwagen interieur
  image(img1, 0, 0, 1000, 800);
  //fill("red")
  //rect(collisionRect.x, collisionRect.y, collisionRect.w, collisionRect.h);



  //score-systeem
  if (frameCount % 4 === 0) {
    score = score + 1
  }
  textSize(40);
  fill('white')
  text('Score: ' + score, 0, 100);

  //zorgt voor spelverloop als je niet game-over bent
  if (xpos - 100 >= -700 && xpos + 100 <= 1700) {
    xpos += xspeed;
    this.apos += xspeed;
  }
  //zorgt voor game-over scherm
  else {
    screen = 2
  }
}

//TEGENLIGGERS
class Tegenligger {
  constructor(vy) {
    this.vy = vy;
    this.c = 0;
    this.lane = int(random(4)) + 1;
    this.startTime = millis();
    this.endTime = this.startTime + 5000;
    this.apos = apos;

    this.p0 = createVector(550, 100);
    console.log(this.lane, this.apos);
    this.p1 = getLane(this.lane, this.apos);
  }

  move() {
    constructor()
  }

  show() {

    this.c++;

    let scale = min(1, (millis() - this.startTime) / (this.endTime - this.startTime));

    let v_dist = p5.Vector.sub(this.p1, this.p0).mult(scale);
    let px = p5.Vector.add(this.p0, v_dist);
    this.p1 = getLane(this.lane, this.apos);
    //fill("green");
    //rect(px.x, px.y, this.c, this.c)
    image(tegenliggerImg, px.x, px.y, -this.c, -this.c);
    this.apos += xspeed;

    // remove from collision detection after this point
    if (px.y + this.c - 300 >= collisionRect.y) {
      let idx = tegenLiggers.indexOf(this);
      tegenLiggers.splice(idx, 1);      
    }

    // game over bij collision  
    if (px.y > collisionRect.y) {      
      if (collisionRect.x + collisionRect.w > px.x - this.c  && collisionRect.x < px.x) {        
        screen = 2;
      }
    } 
   
  }
}

//cactussen
class Cactus {

}

function keyPressed() {
  if (screen == 0 && keyCode === ENTER) {
    screen = 1
    xpos = 450
    apos = 450
    score = 0
    b = 0
    c = 0;
    music.loop();
    startmuziek.stop();
    xspeed = 0;
    spawnen = 250;
    spawndeler = 5;
    startTime = millis();
    endTime = startTime + 5000;
    tegenLiggers = [];
    //P0 = createVector(255, 50);
    //P1 = createVector(apos, 500);
  }
  else if (keyCode === LEFT_ARROW) {
    xspeed = 10;
  }
  else if (keyCode === RIGHT_ARROW) {
    xspeed = -10
  }
  else if (screen == 2 && keyCode === ENTER) {

    screen = 0;
    menumuziek = 0;
    image(img4, 0, 0, 1000, 800);
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}