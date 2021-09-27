function setup() {
	createCanvas(500, 400);  
}
let myFont;
let music;

function preload(){
  img1 =loadImage("Images/truck.png");
  img2 =loadImage("Images/explosion.png");
  img3 =loadImage("Images/tegenligger1.png");
  img4 =loadImage("Images/startscreen.png") 
  myFont = loadFont('Fonts/StickNoBills-Regular.ttf');
  music = loadSound('Geluiden/sb_indreams.mp3');
}

var score = 0
var s = 0
var i = 0
var screen = 0;
var [xpos, zpos, xspeed, yspeed] = [225, 255, 0, 0];

function draw() {
  if (screen == 0){
    i = i + 1
    textSize(30);
    textFont(myFont);
    fill('white')
    if (i % 40 === 0){
      image(img4,0,0,500,400);
    } else if (i % 20 ===0){
      text('PRESS ENTER TO START',130,200)
    }
  }else if (screen == 1){
    background(209,173,56);


    s = s + 1;
    if (s % 4 === 0){
      score = score + 1
    }

    fill(69, 69, 69)
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 50, xpos+300, 400, xpos, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    //setLineDash([5, 10]);
    triangle(zpos, 50, xpos+600, 400, xpos+300, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 50, xpos-300, 400, xpos, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    //setLineDash([5, 10]);
    triangle(zpos, 50, xpos-600, 400, xpos-300, 400);

    fill(74, 255, 231)
    strokeWeight(0);
    rect(0,0,500,50)

    //let V_dist = p5.Vector.sub(zpos, xpos).mult(scale);
    //let PX = p5.Vector.add(xpos, V_dist);
    //ellipse(PX.x, PX.y, 40, 40)


    //image(img3,250,50,50,50);
    image(img1,0,0,500,400);

    textSize(20);
    fill('white')
    text('Score: ' + score, 0, 50);

    if(xpos - 50 >= -350 && xpos + 50 <= 850) {
    xpos+= xspeed; 
    }
    else {
      screen=2
    }
  }
  else if (screen==2){
    music.stop()
    textSize(75);
    image(img2,0,0,500,400);
    text('Game Over', 70, 70,); 
    text('Score: ' + score , 70, 200,); 
    textSize(25);
    text('PRESS ENTER TO GO TO THE MAIN MENU', 10, 300,); 
    
  }
}

function keyPressed() {
  if (screen == 0 && keyCode === ENTER){
    screen = 1
    xpos = 225
    score = 0
    s = 0
    music.play();
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

//function keyReleased() {
//	if (keyCode === LEFT_ARROW) {
//    xspeed = 0;
//    } 
//  else if (keyCode === RIGHT_ARROW) {
//    xspeed = 0;
//    }
//}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}