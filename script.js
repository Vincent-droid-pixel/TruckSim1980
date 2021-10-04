function setup() {
	createCanvas(500, 400);  
}
let myFont;
let music;

function preload(){
  img1 = loadImage("Images/truck.png");
  img2 = loadImage("Images/explosion.png");
  img3 = loadImage("Images/tegenligger1.png");
  img4 = loadImage("Images/startscreen.png") ;
  img5 = loadImage("Images/tegenligger1.png");
  img6 = loadImage("Images/tegenligger2.png") ;
  img7 = loadImage("Images/tegenligger3.png");
  img8 = loadImage("Images/tegenligger4.png");
  img9 = loadImage("Images/zon.png")
  myFont = loadFont('Fonts/StickNoBills-Regular.ttf');
  music = loadSound('Geluiden/sb_indreams.mp3');
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
var apos = 255
var [xpos, zpos, xspeed, yspeed, gameover] = [225, 255, 0, 0, 0];


function draw() {
  //startscherm
  if (screen == 0){
    i = i + 1
    gameover = 0
    stroke(0);
    strokeWeight(5);
    textSize(30);
    textFont(myFont);
    fill('white')
    if (i % 40 === 0){
      text('PRESS ENTER TO START',130,200)
    } else if (i % 20 ===0){
      image(img4,0,0,500,400);
    }
  //spel
  }else if (screen == 1){
    background(209,173,56);

    b = b + 1;
    c = c + 0.0035;
    g = -sin(c) * 200;

    //maken driehoeken die de weg zijn
    fill(69, 69, 69)
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 50, xpos+300, 400, xpos, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 50, xpos+600, 400, xpos+300, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 50, xpos-300, 400, xpos, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 50, xpos-600, 400, xpos-300, 400);

    fill(74, 255, 231)
    strokeWeight(0);
    rect(0,0,500,50)

    image(img9,400,20,40,40);


    //tegenliggers

    if (b % 250 === 0){
      spawn_tegenliggers();
    }
    P0 = createVector(255, 50);
    P1 = createVector(apos-30, 400);
    P2 = createVector(apos+250, 400);
    P3 = createVector(apos-250, 400);
    P4 = createVector(apos-50, 400);

    let currentTIme = millis();
    let scale = min(1, (currentTIme - startTime) / (endTime - startTime));
    let V_dist = p5.Vector.sub(P1, P0).mult(scale);
    let PX = p5.Vector.add(P0, V_dist);
    image(img5,PX.x,PX.y,g,g);
    apos+= xspeed;
  
    //if (PX.y >= 0 && PX.y <= 250 && PX.x >= 100 && PX.x <= 500){
    //  screen=2;
    //}

    //collision box
    rect(50,250,450,250)

    //vrachtwagen interieur
    image(img1,0,0,500,400);

    //score-systeem
    s = s + 1;
    if (s % 4 === 0){
      score = score + 1
    }

    textSize(20);
    fill('white')
    text('Score: ' + score, 0, 50);



    //zorgt voor game-over scherm
    if(xpos - 50 >= -350 && xpos + 50 <= 850) {
    xpos+= xspeed; 
    }
    else {
      screen=2
    }
  }
  else if (screen==2){
    music.stop()
    if (gameover == 0){
      explosion.play();
      gameover = 1;
    }
    if (highscore < score){
      highscore = score;
    }
    textSize(75);
    image(img2,0,0,500,400);
    text('Game Over', 70, 70,); 
    text('Score: ' + score , 70, 200,); 
    
    text('Highscore:' + highscore, 70, 300);
    textSize(25);
    text('PRESS ENTER TO GO TO THE MAIN MENU', 10, 350,); 
  }
}

//TEGENLIGGERS
class tegenligger{
  constructor(img,y,x,w,h,target,vy){
    this.img = random(img5,img6,img7,img8)
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.target = random(P1,P2,P3,P4);
    this.vy = vy;
  }

  move() {

  }

  display() {
    tegenligger;
  }
}

function keyPressed() {
  if (screen == 0 && keyCode === ENTER){
    screen = 1
    xpos = 225
    apos = 225
    score = 0
    s = 0
    b = 0
    c = 0;
    g = 0;
    music.play();
    xspeed= 0;
    startTime = millis();
    endTime = startTime + 5000;
    //P0 = createVector(255, 50);
    //P1 = createVector(apos, 500);
  }
	else if (keyCode === LEFT_ARROW) {
		 xspeed = 5;
    } 
  else if (keyCode === RIGHT_ARROW){
    xspeed = -5
  }
  else if (screen == 2 && keyCode === ENTER){
    screen = 0
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