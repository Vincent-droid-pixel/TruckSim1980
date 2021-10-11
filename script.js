function setup() {
  createCanvas(1000, 800);
  let targets = ['P1', 'P2', 'P3', 'P4']
  let target = random(targets);
}
let myFont;
let music;

function preload() {
  img1 = loadImage("Images/truck.png");
  img2 = loadImage("Images/explosion.png");
  img3 = loadImage("Images/tegenligger1.png");
  img4 = loadImage("Images/startscreen.png");
  img9 = loadImage("Images/zon.png")
  myFont = loadFont('Fonts/StickNoBills-Regular.ttf');
  //music = loadSound('Geluiden/sb_indreams.mp3');
  explosion = loadSound('Geluiden/boem2.mp3');
}


var g = 0.0;
var c = 0.0;
var P0, P1, P2, P3, P4;
var startTime, endTime;
var score = 0;
var highscore = 0;
var s = 0;
var i = 0;
var b = 100;
var screen = 0;
var apos = 510
var [xpos, zpos, xspeed, yspeed, gameover] = [450, 550, 0, 0, 0];



function draw() {
  //startscherm
  if (screen == 0) {
    menu()
  }
  //spel
  else if (screen == 1) {
    game()
  }
  //wat er gebeurt bij het game-over scherm
  else if (screen == 2) {
    gameover()
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
  i = i + 1
  gameover = 0
  stroke(0);
  strokeWeight(5);
  textSize(60);
  textFont(myFont);
  fill('white')
  if (i % 40 === 0) {
    text('PRESS ENTER TO START', 260, 400)
  } else if (i % 20 === 0) {
    image(img4, 0, 0, 1000, 800);
  }
}

//gameover scherm
function gameover() {
  music.stop()
  if (gameover == 0) {
    explosion.play();
    gameover = 1;
  }
  if (highscore < score) {
    highscore = score;
  }
  textSize(150);
  image(img2, 0, 0, 1000, 800);
  text('Game Over', 140, 140);
  text('Score: ' + score, 140, 400);

  text('Highscore:' + highscore, 140, 600);
  textSize(50);
  text('PRESS ENTER TO GO TO THE MAIN MENU', 100, 700);
}

//game
function game() {
  background(209, 173, 56);

  b = b + 1;
  // c = c + 0.0035;
  // g = -sin(c) * 400;
  c = c + 1;
  // if (g <= -200){
  //   g = g + 1;
  // }

  

  //maken driehoeken die de weg zijn en horizon
  weg()

  //zon
  image(img9, 800, 40, 80, 80);


  //tegenliggers

  // move()
  // show()
  if (b % 250 === 0) {
    spawn_tegenliggers();
  }
  P0 = createVector(550, 100);
  P1 = createVector(apos - 60, 800);
  P2 = createVector(apos + 500, 800);
  P3 = createVector(apos - 600, 800);
  P4 = createVector(apos + 1000, 800);
  let currentTIme = millis();
  let scale = min(1, (currentTIme - startTime) / (endTime - startTime));
  // let scale = 5
  let V_dist = p5.Vector.sub(P1, P0).mult(scale);
  let PX = p5.Vector.add(P0, V_dist);
  apos += xspeed;
  image(img3, PX.x, PX.y, -c, -c);


  //game over bij collision
  if (apos <= 500 && apos >= 400 && b % 500 === 0) {
    screen = 2;
  }
  
  //vrachtwagen interieur
  image(img1, 0, 0, 1000, 800);

  //score-systeem
  s = s + 1;
  if (s % 4 === 0) {
    score = score + 1
  }
  textSize(40);
  fill('white')
  text('Score: ' + score, 0, 100);

  //zorgt voor game-over scherm
  if (xpos - 100 >= -700 && xpos + 100 <= 1700) {
    xpos += xspeed;
  }
  else {
    screen = 2
  }
}

//TEGENLIGGERS
class Tegenligger {
  constructor(img, x, y, w, h, target, vy) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.target = target
    this.vy = vy;

    this.p0 = createVector(550, 100);
    this.p1 = createVector(apos - 60, 800);
  }

  move() {

  }
  show() {
    let currentTime = millis();
    let scale = min(1, (currentTime - startTime) / (endTime - startTime));
    // let scale = 5
    let v_dist = p5.Vector.sub(P1, P0).mult(scale);
    let px = p5.Vector.add(P0, v_dist);
    apos += xspeed;
    image(img3, px.x, px.y, -c, -c);
  }
}

function keyPressed() {
  if (screen == 0 && keyCode === ENTER) {
    screen = 1
    xpos = 450
    apos = 450
    score = 0
    s = 0
    b = 0
    c = 0;
    g = 0;
    music.loop();
    xspeed = 0;
    startTime = millis();
    endTime = startTime + 5000;
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
    screen = 0
    image(img4, 0, 0, 1000, 800);
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function spawn_tegenliggers() {
  startTime = millis();
  endTime = startTime + 5000;
  c = 0;
  g = 0;
}