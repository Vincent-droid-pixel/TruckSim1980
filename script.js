function setup() {
	createCanvas(500, 400);
}
let myFont;

function preload(){
  img1 =loadImage("Images/Vrachtwagen.png");
  img2 =loadImage("Images/explosion.png");
  img3 =loadImage("Images/tegenligger1.png");
  img4 =loadImage("Images/startscreen.png") 
  myFont = loadFont('Fonts/StickNoBills-Regular.ttf');
}


var i = 0
var screen = 0;
var [xpos, ypos, zpos, xspeed, yspeed] = [225, 225, 255, 0, 0];

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

    fill(69, 69, 69)
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 18, xpos+300, 400, xpos, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    //setLineDash([5, 10]);
    triangle(zpos, 18, xpos+600, 400, xpos+300, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    triangle(zpos, 18, xpos-300, 400, xpos, 400);

    fill(69, 69, 69);
    stroke(255, 255, 255);
    strokeWeight(2);
    //setLineDash([5, 10]);
    triangle(zpos, 18, xpos-600, 400, xpos-300, 400);

    image(img3,250,50,50,50);

    image(img1,0,0,500,400);

    textSize(75);
    if(xpos - 50 >= -350 && xpos + 50 <= 850) {
    xpos+= xspeed; 
    }
    else {
      image(img2,0,0,500,400);
      text('Game Over', 70, 70,); 
    }
  }
}

//function mousePressed() {
//	if (screen == 0) {
//		screen = 1}
//}

function keyPressed() {
  if (screen == 0 && keyCode === ENTER){
    screen = 1
  }
	else if (keyCode === LEFT_ARROW) {
		 xspeed = 5;
    } 
  else if (keyCode === RIGHT_ARROW){
    xspeed = -5
  }
}


//function keyPressed() {
//  if (keyCode === LEFT_ARROW) {
//    xspeed = 5;
//    } 
//  else if (keyCode === RIGHT_ARROW) {
//    xspeed = - 5;
//    }
//}

function keyReleased() {
	if (keyCode === LEFT_ARROW) {
    xspeed = 0;
    } 
  else if (keyCode === RIGHT_ARROW) {
    xspeed = 0;
    }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}