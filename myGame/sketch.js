var backgroundImg;
var spaceshipImg;
var alien;
var home;
var alienImg;
var shoot;
var flag = 0;
var alienGrp;
var alienGrp2;
var alienGrp3;
var alienGrp4;
var shootGrp;
var bubbleGrp;
var score=0;
var lifeline=3;
var gameState=2;
var bubble;
var bubble2;
var bubble3;
var bubble4;
var count=0;
var set=1;

function preload(){
  backgroundImg=loadImage("images/space.jpg");
  spaceshipImg=loadImage("images/spaceship.png");
  alienImg=loadImage("images/alien.png");
  alien2Img=loadImage("images/alien2.png");
  alien3Img=loadImage("images/alien3.png");
  alien4Img=loadImage("images/alien4.png");
  bulletImg=loadImage("images/bullet.png");
  bubbleImg=loadImage("images/bubble.png");
  missileImg=loadImage("images/missile.png");
  homeImg=loadImage("images/play.png");
  explosion=loadSound("sound/explosion.mp3");
  lifelineSound=loadSound("sound/lifeline.wav");
  over=loadSound("sound/over.wav");
  plus=loadSound("sound/plus.wav");
  missileSound=loadSound("sound/missile.wav");
}

function setup() {
  createCanvas(600, 600);
  spaceship=createSprite(300, 500, 50, 50);
  bottom=createSprite(300, 540, 600, 1);
  spaceship.addImage(spaceshipImg);
  spaceship.scale=0.1
  alienGrp=new Group();
  alienGrp2=new Group();
  alienGrp3=new Group();
  alienGrp4=new Group();
  missileGrp=new Group();
  shootGrp=new Group();
  bubbleGrp=new Group();
  bubbleGrp2=new Group();
  bubbleGrp3=new Group();
  bubbleGrp4=new Group();
}

function draw() {
  background(backgroundImg);  
  if(gameState===2){
    home=createSprite(260, 300, 20, 20);
    home.addImage(homeImg);
    home.scale=0.1;
    if(mousePressedOver(home)){
      gameState=0;
    }
  }

  if(gameState===0){
    home.x= 1000;
    home.y=2000;
  if(keyDown(LEFT_ARROW)){
    spaceship.x -= 5
  }
  if(keyDown(RIGHT_ARROW)){
    spaceship.x += 5
  }
  if(keyWentDown("space")&& flag===0){
    Shoot();
    flag = 1;
  }

  if(keyWentUp("space")){
   // flag=0;
   setInterval(call, 1000);
    
 function call(){
  flag = 0
}
  }

  spawnAliens();
  if(score>=5){
    spawnBubble();
    spawnBubble2();
    spawnBubble3();
    spawnBubble4();
  }

  for(var i=0; i<alienGrp.length;i++){
  if(alienGrp.get(i).isTouching(bottom)&&count===0){
    lifeline-=1;
    count++;
    lifelineSound.play();
  }
}


function big(){
  spaceship.scale=0.1;
}
//1st power
  for(var b=0; b<shootGrp.length;b++){
    if(shootGrp.get(b).isTouching(bubbleGrp)){
      bubbleGrp.destroyEach();
      shootGrp.get(b).destroy();
      spaceship.scale=0.3;
      setInterval(big, 10000);
      plus.play();
    }
  }
//2nd power
  for(var b=0; b<shootGrp.length;b++){
    if(shootGrp.get(b).isTouching(bubbleGrp2)){
      bubbleGrp2.destroyEach();
      shootGrp.get(b).destroy();
      lifeline +=1;
      plus.play();
    }
  }
//3rd power
  for(var b=0; b<shootGrp.length;b++){
    if(shootGrp.get(b).isTouching(bubbleGrp3)){
      bubbleGrp3.destroyEach();
      shootGrp.get(b).destroy();
      set=0;
      setInterval(score2, 15000);
      plus.play();
    }
  }
//3rd continued for loop
  for(var j=0;j<shootGrp.length;j++){
    if(shootGrp.get(j).isTouching(bubbleGrp3)&&set===0){
      shootGrp.get(j).destroy();
      bubbleGrp3.destroyEach();
      score+=2
    }
  }
//4th power
  for(var b=0; b<shootGrp.length;b++){
    if(shootGrp.get(b).isTouching(bubbleGrp4)){
      bubbleGrp4.destroyEach();
      shootGrp.get(b).destroy();
      alienGrp.setVelocityYEach(4);
      setInterval(alienVeloc, 10000);
      plus.play();
    }
  }


  //destroying bullet and alien

  //console.log(alienGrp.get(i).y);
  for(var j=0;j<shootGrp.length;j++){
    if(shootGrp.get(j).isTouching(alienGrp)){
      shootGrp.get(j).destroy();
      alienGrp.destroyEach();
      score+=1
      explosion.play();
    }
  }

  if(score>=10){
    spawnAliens2();
  }

  for(var j=0;j<shootGrp.length;j++){
    if(shootGrp.get(j).isTouching(alienGrp2)){
      shootGrp.get(j).destroy();
      alienGrp2.destroyEach();
      score+=1
      explosion.play();
    }
  }

  for(var j=0;j<shootGrp.length;j++){
    if(shootGrp.get(j).isTouching(alienGrp3)){
      shootGrp.get(j).destroy();
      alienGrp3.destroyEach();
      score+=1
      explosion.play();
    }
  }

  if(score>=25){
    spawnAliens3();
  }

  for(var j=0;j<shootGrp.length;j++){
    if(shootGrp.get(j).isTouching(alienGrp4)){
      shootGrp.get(j).destroy();
      alienGrp4.destroyEach();
      score+=1
      explosion.play();
    }
  }

  for(var m=0;m<missileGrp.length;m++){
    if(missileGrp.get(m).isTouching(spaceship)){
      missileGrp.destroyEach();
      lifeline-=1;
      missileSound.play();
    }
  }

  if(score>=40){
    spawnAliens4();
  }

if(lifeline===0){
  gameState=1;
  over.play();
}
  }

  edges = createEdgeSprites();
  spaceship.collide(edges[0]);
  spaceship.collide(edges[1]);

  drawSprites();

  if(gameState===1){
    alienGrp.setVelocityYEach(0);
    alienGrp.setLifetimeEach(-1);

    alienGrp2.setVelocityYEach(0);
    alienGrp2.setLifetimeEach(-1);

    alienGrp3.setVelocityYEach(0);
    alienGrp3.setLifetimeEach(-1);

    alienGrp4.setVelocityYEach(0);
    alienGrp4.setLifetimeEach(-1);

    missileGrp.setVelocityYEach(0);
    missileGrp.setLifetimeEach(-1);

    textSize(25);
    fill("white");
    text("Game Over!", 250, 300);
  }

  textSize(30);
  fill("white");
  text("Score: "+ score, 450, 50);
  text("Lifelines: " + lifeline, 50, 50);

}

function Shoot(){
  shoot=createSprite(spaceship.x, spaceship.y, 10, 10);
  shoot.addImage(bulletImg);
  //shoot.debug = true;
  shoot.scale=0.1
  shoot.velocityY=-5;
  shoot.lifetime=100;
  shootGrp.add(shoot);
}

function spawnAliens(){
  if(frameCount%150===0){
  alien=createSprite(random(50, 550), -50, 20, 20);
  alien.addImage(alienImg);
  //alien.debug=true; 
  count=0;
  alien.setCollider("circle", 0, 0, 340);
  alien.scale=0.1;
  alien.velocityY=3+score/15;
  alien.lifetime=200;
  alienGrp.add(alien);
  }
}

function spawnAliens2(){
  if(frameCount%250===0){
  alien2=createSprite(random(50, 550), -50, 20, 20);
  alien2.addImage(alien2Img);
  //alien.debug=true; 
  count=0;
  alien2.setCollider("circle", 0, 0, 340);
  alien2.scale=0.1;
  alien2.velocityY=3+score/15;
  alien2.lifetime=200;
  alienGrp2.add(alien2);
  }
}

function spawnAliens3(){
  if(frameCount%200===0){
  alien3=createSprite(random(50, 550), -50, 20, 20);
  alien3.addImage(alien3Img);
  //alien.debug=true; 
  count=0;
  alien3.setCollider("circle", 0, 0, 340);
  alien3.scale=0.1;
  alien3.velocityY=3+score/15;
  alien3.lifetime=200;
  alienGrp3.add(alien3);
  }
}

function spawnAliens4(){
  if(frameCount%300===0){
  alien4=createSprite(random(50, 550), -50, 20, 20);
  missile=createSprite(alien4.x, alien4.y, 20, 20);
  alien4.addImage(alien4Img);
  //missile
  missile.addImage(missileImg);
  missile.scale=0.1;
  missile.debug=true;
  missile.velocityY=10;
  missileGrp.add(missile);
  missile.lifetime=200;
  //alien
  count=0;
  alien4.setCollider("circle", 0, 0, 340);
  alien4.scale=0.1;
  alien4.velocityY=3+score/15;
  alien4.lifetime=200;
  alienGrp4.add(alien4);
  }
}

function spawnBubble(){
  if(frameCount%1000===0){
    bubble=createSprite(random(50, 550), -50, 10, 10);
    bubble.addImage(bubbleImg);
    bubble.scale=0.2;
    bubble.velocityY=4;
    bubble.lifetime=200;
    bubbleGrp.add(bubble);
  }
}

function spawnBubble2(){
  if(frameCount%900===0){
    bubble2=createSprite(random(50, 550), -50, 10, 10);
    bubble2.addImage(bubbleImg);
    bubble2.scale=0.2;
    bubble2.velocityY=4;
    bubble2.lifetime=200;
    bubbleGrp2.add(bubble2);
  }
}

function spawnBubble3(){
  if(frameCount%1100===0){
    bubble3=createSprite(random(50, 550), -50, 10, 10);
    bubble3.addImage(bubbleImg);
    bubble3.scale=0.2;
    bubble3.velocityY=4;
    bubble3.lifetime=200;
    bubbleGrp3.add(bubble3);
  }
}

function spawnBubble4(){
  if(frameCount%1200===0){
    bubble4=createSprite(random(50, 550), -50, 10, 10);
    bubble4.addImage(bubbleImg);
    bubble4.scale=0.2;
    bubble4.velocityY=4;
    bubble4.lifetime=200;
    bubbleGrp4.add(bubble4);
  }
}

function score2(){
  set=1;
}

function alienVeloc(){
  alienGrp.setVelocityYEach(4+score/15);
}

