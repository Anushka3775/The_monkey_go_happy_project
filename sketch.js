var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var invieground;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
createCanvas(600,400);  

 monkey=createSprite(80,335,20,20); 
 monkey.addAnimation("moving",monkey_running);
 monkey.scale=0.25; 
 
 inviground=createSprite(80,394,100,5);
 inviground.visible=false;
 
 FoodGroup= new Group();
 obstaclesGroup= new Group();
   
 score=0; 
}
function draw() {
 background("white");
  
   monkey.collide(inviground);
  
    if(gameState===PLAY){
  
    if(keyDown("space") ){ 
    monkey.velocityY=-12;
    }
   monkey.velocityY= monkey.velocityY+0.8;
   
   banana1();
   obs();
  
   text("score "+score,500,50);
  
   //monkey.debug=true;
   monkey.setCollider("circle",0,0,300);
  
   if(FoodGroup.isTouching(monkey)){
     score=score+2;
     FoodGroup.destroyEach();
    }
   if(obstaclesGroup.isTouching(monkey)){
    gameState=END;    
  }

}  
   else if(gameState===END){
    FoodGroup.setVelocityEach(0);
    obstaclesGroup.setVelocityEach(0);
    monkey.velocityY=0; 
  }
    drawSprites();
}
function banana1 (){
  if(frameCount % 200 === 0){
   banana=createSprite(500,200,20,20);
   banana.y=Math.round(random(25,150));
   banana.scale=0.15; 
   banana.velocityX=-2;
   banana.lifetime=550;
   banana.addImage("food",bananaImage);
   banana.depth=monkey.depth;
   monkey.depth=monkey.depth+1; 
   FoodGroup.add(banana);  
}
}
function obs(){
  if(frameCount % 300 === 0){
   obstacle=createSprite(80,335,20,20);
   obstacle.velocityX=-2;
   obstacle.x=Math.round(random(400,550));
   obstacle.lifetime=200;
   obstacle.addImage("obstacles",obstacleImage);
   obstacle.scale=0.3;
   obstaclesGroup.add(obstacle);
}
}