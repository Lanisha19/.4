var dog, dogImg, happyDog;
var database;
var foodS, foodStock;

var feedPet, addFd;
var bathing, sleeping, playing;

var foodObj;

var gameState = "hungry";
var gameStateRef;

var gardenImg, bedRoomImg, washRoomImg;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");

  gardenImg = loadImage("garden.png");
  bedRoomImg = loadImage("bedRoom.png");
  washRoomImg = loadImage("washRoom.png");
}

function setup() {
	createCanvas(1000, 450);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(750, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodObj = new Food();

  addFd=createButton("Add Food");
  addFd.position(500, 125);

  if(addFd.mousePressed){
    foodS+=1;
    gameState="adding";
    database.ref('/').update({
      'gameState':gameState
    });
  }
  
  feedPet=createButton("Feed The Dog");
  feedPet.position(400, 125);
  feedPet.mousePressed(feedDog);

  bathing=createButton("I want to take Bath");
  bathing.position(500, 125);
  bathing.mousePressed(bath);

  sleeping=createButton("I am very sleepy");
  sleeping.position(710, 125);
  sleeping.mousePressed(sleep);

  playing=createButton("Lets play !");
  playing.position(500, 160);
  playing.mousePressed(play);

}


function draw() { 
  background("green");

  foodObj.display();
  writeStock(foodS);

  if(gameState==="feeding"){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  };

  if(gameState==="bathing"){
    dog.addImage(washRoomImg);
    dog.scale=1;
    milk.visible=false;
  };

  if(gameState==="sleeping"){
    dog.addImage(bedRoomImg);
    dog.scale=1;
    milk.visible=false;
  };

  if (gameState==="playing"){
      dog.addImage(gardenImg);
      dog.scale=1;
      milk.visible=false;
  };
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  });
}

function feedDog(){
  foodS-=1;
  gameState="feeding";
  database.ref('/').update({
  'gameState':gameState
  });
}

function bath(){
  gameState="bathing";
  database.ref('/').update({
  'gameState':gameState
  });
}

function sleep(){
  gameState="sleeping";
  database.ref('/').update({
   'gameState':gameState
  });
}

function play(){
  gameState="playing";
  database.ref('/').update({
   'gameState':gameState
  })
}

function getGameState(){
  gameStateRef = database.ref('gameState');
  gameStateRef.on("value", function(data){
  gameState = data.val();
  });
}

function update(state){
  database.ref('/').update({
    gameState : state
  })
}