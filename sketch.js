var ufo, ufo_moving, ufoCollide;
var ground, invisiGround;
var star, starGroup, obstacle, obstacleImage;
var starGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;



function preload(){
 
 ufo_moving = loadAnimation("ufo.png");
  
 ufoCollide = loadAnimation("ufo.png");
  
 star = loadImage("stars.png");
  
 obstacle = loadImage("obstacles.jfif");
  
}

function setup() {
  createCanvas(600, 600);
  
  
  obstacleGroup = createGroup();
  starsGroup = createGroup();
  
 
  ufo = createSprite(80,230,10,10);
  ufo.scale = 0.12;
  ufo.addAnimation("ufo", ufo_moving);
  ufo.addAnimation("collide", ufoCollide);
  
     invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  ground.shapeColor = "black";
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
}

function draw() {

  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("STARS COLLECTED: "+starScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    stars();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
    
    if(keyDown("space")&&ufo.y >= 235) {
      ufo.velocityY = -13; 
    }
  
    ufo.velocityY = ufo.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (ufo.isTouching(starsGroup)){
      starScore++;  
      starsGroup.destroyEach();
    
    }
    
    if (ufo.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    ufo.y = 235;
    ufo.scale = 0.12;
    ufo.changeAnimation("collide", ufoCollide);
    
    obstacleGroup.setVelocityXEach(0);
    starsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    starsGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      starsGroup.destroyEach();
      obstacleGroup.destroyEach();
      ufo.changeAnimation("ufo", ufo_moving);
      score = 0;
      starScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  ufo.collide(invisiGround);
}

function stars(){
  if(frameCount%80 === 0){
    
    star = createSprite(620,120,50,50)
    star.addAnimation("star",starImage);
    star.scale = 0.1;
    star.velocityX=-(4+score*1.5/100);
    star.lifetime = 220;
    starGroup.add(star);
    starGroup.add(star);
  }
  
  
  
  
}
function obstacles(){
  if(frameCount%200 === 0)
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("cloud", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  
}  



}

