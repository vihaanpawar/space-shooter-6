var shooterImage, shooter;
var backgroundImage;
var laser, laserImage;
var obstacle, obstacleGroup, obImg1, obImg2;
var blast, blastImg;
var score = 0;
var gameOver,gameOverImg;

function preload() {

  backgroundImage = loadImage("background.jpg");
  shooterImage = loadAnimation("spaceship.png");
  laserImage = loadImage("laser.png");
  obImg1 = loadImage('comet.png');
  obImg2 = loadImage('ufo.png');
  blastImg = loadAnimation("blast.png");
  gameOverImg=loadImage("game over.png");

}

function setup() {
  createCanvas(1500, 1000);
  bg = createSprite(750, 450, 1500, 900);
  bg.addImage("bgImg", backgroundImage);
  bg.scale = 1.5;
  bg.velocityY = 2;

  gameOver=createSprite(700,500);
  gameOver.addImage('gameover',gameOverImg);
  gameOver.visible=false;

  shooter = createSprite(700, 760, 100, 100);
  shooter.addAnimation("shooterImg", shooterImage);
  shooter.addAnimation('blastImg', blastImg);
  shooter.changeAnimation('shooterImg')
  shooter.scale = 1.05;

  laser = createSprite(shooter.x, shooter.y, 5, 50);
  laser.addImage("laserImage", laserImage);
  laser.scale = 0.5;
  laser.velocityY = -6;
  laser.visible = false;

  obstacle1Group = new Group();
  obstacle2Group = new Group();
  laserGroup = new Group();

}

function draw() {

  background('black');
  textSize(30);
  if (bg.y > 400) {
    bg.y = 300;
  }
  drawSprites();



  if (keyDown(LEFT_ARROW)) {
    shooter.x = shooter.x - 7;
  }

  if (keyDown(RIGHT_ARROW)) {
    shooter.x = shooter.x + 7;
  }

  if (keyDown(UP_ARROW)) {
    laser = createSprite(shooter.x, shooter.y - 30, 5, 50);
    laser.addImage("laserImage", laserImage);
    laser.scale = 0.5;
    laser.velocityY = -5;
    laser.visible = true;
    laserGroup.add(laser);
    laser.depth = shooter.depth;
    shooter.depth = shooter.depth + 1;
  }

  if (obstacle1Group.isTouching(laserGroup)) {
    for (var i = 0; i < obstacle1Group.length; i++) {
      if (obstacle1Group[i].isTouching(laserGroup)) {
        obstacle1Group[i].destroy();
        laserGroup.destroyEach();
        score = score + 3;
      }
    }

  }

  if (obstacle2Group.isTouching(laserGroup)) {
    for (var i = 0; i < obstacle2Group.length; i++) {
      if (obstacle2Group[i].isTouching(laserGroup)) {
        obstacle2Group[i].destroy();
        laserGroup.destroyEach();
        score = score + 5;

      }
    }
  }




  if (obstacle2Group.isTouching(shooter)) {
    for (var i = 0; i < obstacle2Group.length; i++) {
      if (obstacle2Group[i].isTouching(shooter)) {
       gameOver.visible=true;
        obstacle2Group[i].destroy();
          shooter.destroy();
          obstacle1Group.velocityYEach=0;
          obstacle2Group.velocityYEach=0;
      }
    }
  }

  if (obstacle1Group.isTouching(shooter)) {
    for (var i = 0; i < obstacle1Group.length; i++) {
      if (obstacle1Group[i].isTouching(shooter)) {
       gameOver.visible=true;
        obstacle1Group[i].destroy();
          shooter.destroy();
        //  obstacle1Group.destroyEach();
        //  obstacle2Group.destroyEach();
          obstacle1Group.velocityYEach(0);
          obstacle2Group.velocityYEach(0);
      }
    }
  }
  fill('white');
  text("Score: " + score, width - 190, 50);





  spawnObstacle1();
  spawnObstacle2();
}

function spawnObstacle1() {
  if (frameCount % 70 === 0) {
    var x = random(50, width - 100);
    obstacle1 = createSprite(x, 20, 50, 50);
    obstacle1.addImage("comet", obImg1);
    obstacle1.scale = 0.3;
    obstacle1.velocityY = 4;
    obstacle1.lifetime = 200;
    obstacle1.depth = shooter.depth;
    shooter.depth = shooter.depth + 1;
    obstacle1Group.add(obstacle1);
  }
}

function spawnObstacle2() {
  if (frameCount % 90 === 0) {
    var x = random(60, width - 100);
    obstacle2 = createSprite(x, 20, 50, 50);
    obstacle2.addImage("ufo", obImg2);
    obstacle2.scale = 0.2;
    obstacle2.velocityY = 4;
    obstacle2.lifetime = 200;
    obstacle2.depth = shooter.depth;
    shooter.depth = shooter.depth + 1;
    obstacle2Group.add(obstacle2);
  }
}