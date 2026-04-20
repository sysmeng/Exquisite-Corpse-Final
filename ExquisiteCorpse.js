let camPhoto;
let fontData;
let gameState;
let camX, camY;
let scale;
let altPhoto;

let tileArray=[];
let tileW,tileH;

//let testImg;

function preload(){
  //
  camPhoto=loadImage('data/JermaTestImg.png');
  //testImg=loadImage('data/NLTestImg.jpg');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  gameState = 3;

  tileW=4;
  tileH=4;

  //console.log(scale);
  imageMode(CENTER);
  camPhoto.resize(0,height-200);

  camPhoto.loadPixels();
 // put setup code here
 // init random array for tiles
 
}

function draw() {
  // put drawing code here
  //image(camPhoto,width/2,height/2);

  scramblephoto();
  if (gameState=3){
    // photo state
    // takephoto();
  } else if (gameState=4){
    // generate the distortions
    //tileGenerate();
  } else{
    //gameloop();
  }
  
}



function takephoto(){
  //
  //generate button
  //overlay for facial alignment
  //load webcam to cam photo
}

function scramblephoto(){
  //
  //camPhoto.loadPixels(); 
  //console.log(camPhoto);
  var temptileW = int(camPhoto.width/tileW);
  var temptileH = int(camPhoto.height/tileH);

  //console.log(temptileW,temptileH);
  for(k=0;k<tileH;k++){
    for(i=0;i<tileW;i++){
      var tempTileArr = camPhoto.get(temptileW*i,temptileH*k,temptileW,temptileH);
      var tileTempLocation = (createVector(temptileW*i,temptile*k));
      var tileTempItem = (new tile(tempTileArr,tileTempLocation));
      tileArray.push(tileTempItem);
      console.log(tileArray[tileW*k+i])
  }
  }
  //console.log(tileArray);
  
  for (i=0;i<tileArray.length;i++){
    //
    var tempTileImg= tileArray[i];
    //image(tempTileImg,int(random(0,width)),int(random(0,height)));//debug to test print tiles
    var operationRand
    //filter(INVERT);
  }
  //console.log(tileArray[0]);
  //image(tileArray[0],width/2,height/2)

  for(i=0;i<(tileW*tileH);i++){
    //var tempTileArr = pixels (camPhoto);
    //console.log(tempTileArr);
    
    //
  }
  noLoop();
}

function tileGenerate(){
  //
  altPhoto.loadPixels(); // load image pixels
  
    // take cut of image
    // fill selection with transparent pixels
    // record position
    // add tile to array
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