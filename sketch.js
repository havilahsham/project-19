var mario, mario_running, mario_stop
var ground, groundImg, invisibleground;

var obstacle, obstacleImg, cloudsGroup;
var cloud, cloudImg, obstaclesGroup;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jumpSound, dieSound

var gameoverImg,restartImg

function preload(){

mario_running = loadAnimation("mario1.png","mario2.png","mario3.png");
mario_stop = loadAnimation("mario3.png");

groundImg = loadImage("ground.png");

obstacleImg = loadImage("goomba.png");

cloudImg = loadImage("cloud.png");

jumpSound = loadSound("jump.wav");
dieSound = loadSound("die.wav");

restartImg = loadImage("restart.png");
gameoverImg = loadImage("gameOver.png");
}

function setup(){

createCanvas(600,200);

ground = createSprite(100,240,1000,10);
ground.addImage("ground", groundImg);
ground.scale= 1.4
ground.x = ground.width/2

mario = createSprite(100,140,20,20);
mario.addAnimation("mariorunning", mario_running);
mario.addAnimation("collided",mario_stop)
mario.scale=1.3;
mario.setCollider("circle",0,0,15);

invisibleground = createSprite(300,140,1000,10);
invisibleground.visible =false

obstaclesGroup = new Group();
cloudsGroup = new Group();

restart = createSprite(300,140);
restart.addImage("restart",restartImg);
restart.scale = 0.5

gameover = createSprite(300,90);
gameover.addImage("gameover", gameoverImg)
gameover.scale =0.6

}

function draw(){
  background("lightblue")

  text("Score : " + score, 500, 50);

  if(gameState === PLAY){

  ground.velocityX = -5;

  restart.visible = false
  gameover.visible = false

  score = score + Math.round(frameCount/100)

  if(keyDown("space") && mario.y >= 113){
    mario.velocityY = -10;

    jumpSound.play();
  }

  mario.velocityY = mario.velocityY + 0.5
  
  if(ground.x<0){
    ground.x = ground.width/2
  }

  spawnClouds();
  spawnObstacles();

  if(obstaclesGroup.isTouching(mario)){
    gameState = END

    dieSound.play();

  }
}
else if(gameState === END){
  ground.velocityX = 0;

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);

mario.changeAnimation("collided",mario_stop);

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

gameover.visible = true;
restart.visible = true;

if(mousePressedOver(restart)){

    reset();
  }
}

mario.collide(invisibleground)

drawSprites();

}

function spawnClouds(){
  if(frameCount % 120 === 0){
    cloud = createSprite(590,50,40,10);
    cloud.velocityX = -3
    cloud.addImage("clouds", cloudImg)
    cloud.y = Math.round(random(10,50));
    cloud.lifetime = 250

    cloud.depth = mario.depth
    mario.depth = mario.depth + 1 

    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    
    
    obstacle = createSprite(590,140,50,50);
    obstacle.addImage("goomba", obstacleImg);
    obstacle.scale=0.1
    obstacle.velocityX = -6
    obstacle.lifetime = 250

    obstaclesGroup.add(obstacle);
  }
}

function reset(){

gameState = PLAY;

gameover.visible = false;
restart.visibe = false;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();

mario.changeAnimation("mariorunning", mario_running);

score = 0;

}















