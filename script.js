function setup() {
	createCanvas(500, 400);
}

function preload(){
  img1 =loadImage("Images/Vrachtwagen.png");
  img2 =loadImage("Images/explosion.png");
  img3 =loadImage("Images/tegenligger1.png");
}

 


var [xpos, ypos, zpos, xspeed, yspeed] = [225, 225, 255, 0, 0];

function draw() {
	background(209,173,56);
	
  fill(69, 69, 69);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 18, xpos+600, 400, xpos, 400);

  fill(69, 69, 69)
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 18, xpos+300, 400, xpos, 400);

  fill(69, 69, 69);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 18, xpos-600, 400, xpos, 400);

  fill(69, 69, 69);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(zpos, 18, xpos-300, 400, xpos, 400);

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

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xspeed = 5;
    } 
  else if (keyCode === RIGHT_ARROW) {
    xspeed = - 5;
    }
}

function keyReleased() {
	if (keyCode === LEFT_ARROW) {
    xspeed = 0;
    } 
  else if (keyCode === RIGHT_ARROW) {
    xspeed = 0;
    }
}
