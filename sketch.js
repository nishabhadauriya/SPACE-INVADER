var ground, ballGroup, enemy1Group, enemy2Group, enemy3Group;
var start, gameover, spaceship, rule,restart,home,fail,next;
var h1,h2,h3,edges;
var shipIMG,ballImg,enemy1Img,enemy2Img,enemy3Img,groundImg,gameoverImg,startImg,ruleImg;
var restartImg,homeImg,failImg,nextImg;
var h1Img, h2Img, h3Img;
var bgSound, shootSound, playerKillSound, enemykillSound;  
var score=0;
var PLAY=0;
var RULES=3;
var END=1;
var START=2;
var health=3;
var gameState=START;

function preload(){
  shipIMG=loadImage("spaceship.png");
  ballImg=loadImage("ball.png");
  enemy1Img=loadImage("enemy1.png");
  enemy2Img=loadImage("enemy2.png");
  enemy3Img=loadImage("enemy3.png");
  groundImg=loadImage("background.png");
  gameoverImg=loadImage("over.png");
  startImg=loadImage("startgame.png");
  h1Img=loadImage("h1.png");
  h2Img=loadImage("h2.png");
  h3Img=loadImage("h3.png");
  ruleImg=loadImage("rule.png");
  restartImg=loadImage("restart.png");
  homeImg=loadImage("home.png");
  failImg=loadImage("failed.png");
  nextImg=loadImage("next.png");
  bgSound=loadSound("spaceinvaders2.mp3");
  shootSound=loadSound("shoot.wav");
  enemyKillSound=loadSound("enmykillSound.wav");
  playerKillSound=loadSound("playerkilled.wav");
  
}

function setup() {
  createCanvas(600, 750);
  edges= createEdgeSprites();
  bgSound.loop();
  
    ground=createSprite(300,0,20,20);
    ground.addImage(groundImg);
    ground.visible=false;
  
  
    ship=createSprite(300,670,20,40);
    ship.addImage(shipIMG);
    ship.scale=0.45;
    ship.visible=false;
  
  
    start=createSprite(300,375,30,30);
    start.addImage(startImg);
    start.visible=false;
  
  
    rule=createSprite(300,700,30,10);
    rule.addImage(ruleImg);
    rule.scale=0.3
    rule.visible=false;
  
  home=createSprite(450,140,50,50)
  home.addImage(homeImg);
  home.visible=false;
  
  next=createSprite(500,100,80,20);
  next.addImage(nextImg);
  next.scale=0.32;
  next.visible=false;
  
  h1=createSprite(42,700,100,40);
  h1.addImage(h1Img);
  h1.scale=0.5;
  h1.visible=false;
  
  h2=createSprite(70,700,100,40);
  h2.addImage(h2Img);
  h2.scale=0.5;
  h2.visible=false;
  
  h3=createSprite(100,700,100,40);
  h3.addImage(h3Img);
  h3.scale=0.5;
  h3.visible=false;
  
  gameover=createSprite(280,200,50,50);
  gameover.addImage(gameoverImg);
  gameover.scale=1.5;
  gameover.visible=false;
  
  fail=createSprite(300,375,50,20);
  fail.addImage(failImg);
  fail.scale=0.32;
  fail.visible=false;
  
  restart=createSprite(700,30,120,20);
  restart.addImage(restartImg);
  restart.scale=0.12;
  restart.visible=false;
  
  ballGroup= new Group();
  enemy1group= new Group();
  enemy2group= new Group();
  enemy3group= new Group();

  
}

function draw() {
  background("black");
  
  if(gameState===START){
    start.visible=true;
    rule.visible=true;
    home.visible=false;
    next.visible=false;
    rule.x=300;
    rule.y=700;
    home.visible=true;
    home.x=300;
    home.y=550;
    h1.visible=false;
    h2.visible=false;
    h3.visible=false;
    gameover.visible=false;
    fail.visible=false;
    restart.visible=false;


    if(mousePressedOver(rule)){
      gameState=RULES;
    }
    if(mousePressedOver(home)){
      gameState=PLAY;
    }
  }
   if(gameState===RULES){
   rule.visible=true;
   home.visible=true;
   next.visible=true;
   h1.visible=false;
   h2.visible=false;
   h3.visible=false;
   gameover.visible=false;
   fail.visible=false;
   restart.visible=false;
   rule.x=100;
   rule.y=50;
   home.x=450;
   home.y=140;
   next.y=620;
   if(mousePressedOver(next)){
       gameState=START;
     }
   if(mousePressedOver(home)){
       gameState=PLAY;
     }
   }
  if(gameState===PLAY){
    start.visible=false;
    rule.visible=false;
    home.visible=false;
    next.visible=false;
    h1.visible=false;
    h2.visible=false;
    h3.visible=true;
    ground.visible=true;
    gameover.visible=false;
    fail.visible=false;
    ship.visible=true;
    restart.visible=false;
    ground.velocityY=2;
    ship.bounceOff(edges[2]);
    ship.bounceOff(edges[1]);
    if(ground.y>750){
      ground.y=100;
    }
    if(keyDown("left_arrow")){
      ship.x=ship.x-7;
    }
    if(keyDown("right_arrow")){
      ship.x=ship.x+7;
    }
    if(keyWentDown("space")){
      createBall();
      shootSound.play();
    }
    enemyship1();
    enemyship2();
    enemyship3();
    
   if(ballGroup.isTouching(enemy1group)){
     score=score+5;
     ballGroup.destroyEach();
     enemy1group.destroyEach();
     enemyKillSound.play();
   }
   if(ballGroup.isTouching(enemy2group)){
     score=score+5;
     ballGroup.destroyEach();
     enemy2group.destroyEach();
     enemyKillSound.play();

   }
   if(ballGroup.isTouching(enemy3group)){
     score=score+5;
     ballGroup.destroyEach();
     enemy3group.destroyEach();
     enemyKillSound.play();

   }
    if(enemy1group.isTouching(ship)||enemy2group.isTouching(ship)||enemy3group.isTouching(ship)){
       health=health-1;
      enemy1group.destroyEach();
      enemy2group.destroyEach();
      enemy3group.destroyEach();
      playerKillSound.play();
     }
    if(health===2){
      h1.visible=false;
      h2.visible=true;
      h3.visible=false;
    }
    if(health===1){
      h1.visible=true;
      h2.visible=false;
      h3.visible=false;
    }
    if(health===0){
      h1.visible=false;
      h2.visible=false;
      h3.visible=false;
      gameState=END;
    }
  }
  if(gameState===END){
    ballGroup.destroyEach();
    ballGroup.setVelocityYEach(0);
    enemy1group.destroyEach();
    enemy1group.setVelocityYEach(0);
    enemy2group.destroyEach();
    enemy2group.setVelocityYEach(0);
    enemy3group.destroyEach();
    enemy3group.setVelocityYEach(0);
    ground.velocityY=0;
    start.visible=false;
    rule.visible=false;
    home.visible=false;
    next.visible=false;
    h1.visible=false;
    h2.visible=false;
    h3.visible=false;
    ground.visible=false;
    ship.visible=false;
    gameover.visible=true;
    fail.visible=true;
    restart.visible=true;
    restart.x=500;
    restart.y=575;
    home.x=300;
    home.y=800;
    rule.x=700;
    rule.y=400;
    //next.x=700;
    //next.y=400;
    if(mousePressedOver(restart)){
      gameState=START;
      reset();
    }
  }
  
    drawSprites();
  
 if(gameState===RULES){
   start.visible=false;
    fill("red");
      stroke("white");
      textSize(32);
      text("PRESS 'START' TO START THE GAME",10,500);
      text("PRESS 'space' to shoot",10,300);
      text("3 HIT FROM EMENY AND GAME OVER",10,400);
  }
  
 if(gameState===PLAY){
   fill("cyan");
    stroke("blue");
    textSize(32);
    text("SCORE:"+score,360,50);
 }
}

  
function enemyship1(){
  if(frameCount%300===0){
  var enemy1=createSprite(random(50,200),0,50,50)
  enemy1.addImage(enemy1Img);
  enemy1.scale=0.55;
  enemy1.velocityY=4;
  enemy1.lifetime=180;
  enemy1group.add(enemy1);
 }
}
function enemyship2(){
  if(frameCount%450===0){
  var enemy2=createSprite(random(220,400),0,50,50)
  enemy2.addImage(enemy2Img);
  enemy2.scale=1.15;
  enemy2.velocityY=4;
  enemy2.lifetime=180;
  enemy2group.add(enemy2);
 }
}
function enemyship3(){
  if(frameCount%600===0){
  var enemy3=createSprite(random(430,550),0,50,50)
  enemy3.addImage(enemy3Img);
  enemy3.scale=0.6;
  enemy3.velocityY=4;
  enemy3.lifetime=180;
  enemy3group.add(enemy3);
 }
}

function reset(){
  score=0;
  health=3;
  ship.x=300;
}

function createBall() {
  var ball= createSprite(100, 100, 60, 10);
  ball.addImage( ballImg);
  ball.y=ship.y-70;
  ball.x=ship.x;
  ball.velocityY = -8;
  ball.lifetime = 200;
  ball.scale = 0.22;
  ballGroup.add(ball);
  ball.depth=ship.depth;
  ball.depth=ball.depth-1;
  return ball;
}