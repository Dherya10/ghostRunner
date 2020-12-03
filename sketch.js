var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if(gameState==="play"){
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+1;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    
    
  spawnDoors();
    
    
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  }else if(gameState==="end"){
    fill("yellow");
    textSize(30);
    text("Game Over",250,300);
  }
  
  
  
  
    
    
    
    //climbersGroup.collide(ghost);

    
    drawSprites();



}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if(frameCount%240===0){
    door=createSprite(200,50);
    door.addImage(doorImg);
    
    door.velocityY=3;
    door.lifetime=200;
    doorsGroup.add(door);
    
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    door.x=Math.round(random(100,500));
    climber.velocityY=3;
    climber.lifetime=200;
    climbersGroup.add(climber);
    
    invisibleBlock=createSprite(200,15,50,50);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    invisibleBlock.velocityY=3;
  }
}



