let camPhoto;
let fontData;
let gameState;
let camX, camY;
let scale;

function preload(){
  //
  camPhoto=loadImage('data/JermaTestImg.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  gameState = 3;
 // put setup code here
 // init random array for tiles
}

function draw() {
  // put drawing code here
  camX=camPhoto.width;
  camY=camPhoto.height;
  scale = ((width/2-200)/camX);
  console.log(scale);
  image(camPhoto,width/2,height/2,camX*scale,camY*scale);
  if (gameState=3){
    // photo state
    // takephoto();
  } else if (gameState=4){
    // generate the distortions and tiles
    tileGenerate();
  } else{
    gameloop();
  }
  
}



function takephoto(){
  //
  //generate button
  //overlay for facial alignment
  //load webcam to cam photo
}

function tileGenerate(){
  //
  //scramble tiles
  //catch important features with facial detection
  //replace cut areas with transparent pixels
  //use get() to divy out tiles
}

function gameloop(){
  //
  //update 
  //redraw
}