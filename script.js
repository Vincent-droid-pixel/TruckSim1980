function setup() {
	createCanvas(500, 400);
}

function preload(){
  img1 =loadImage("Images/truck.png");
  img2 =loadImage("Images/explosion.png")
}

 


var [xpos, ypos, zpos, xspeed, yspeed] = [225, 225, 255, 0, 0];

function draw() {
	background(209,173,56);
	
  fill(204);
  triangle(zpos, 18, xpos+500, 360, xpos, 360);

  fill(204);
  triangle(zpos, 18, xpos+250, 360, xpos, 360);

  fill(204);
  triangle(zpos, 18, xpos-500, 360, xpos, 360);

  fill(204);
  triangle(zpos, 18, xpos-250, 360, xpos, 360);


  image(img1,0,0,500,400);

	textSize(32);
	if(xpos - 50 >= -350 && xpos + 50 <= 850) {
  xpos+= xspeed; 
  }
  else {
    text('Game Over', 10, 30);
    image(img2,0,0,500,400);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xspeed = 5;
    } 
  else if (keyCode === RIGHT_ARROW) {
    xspeed = -5;
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
