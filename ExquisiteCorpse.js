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
  //camPhoto=loadImage('data/JermaTestImg.png');
  camPhoto=loadImage('data/LebronTestImg.jpg');
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

  tileGenerate();
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

function tileGenerate(){ //generate the tiles unaltered
  //
  //camPhoto.loadPixels(); 
  //console.log(camPhoto);
  var temptileW = int(camPhoto.width/tileW);
  var temptileH = int(camPhoto.height/tileH);



  for(k=0;k<tileH;k++){ //create tile objects
    for(i=0;i<tileW;i++){
      var tempTileArr = camPhoto.get(temptileW*i,temptileH*k,temptileW,temptileH);
      var tileTempLocation = (createVector((width-camPhoto.width)/2+temptileW*i,((height-camPhoto.height)/2)+temptileH*k));
      var tileTempItem = (new tile(tempTileArr,tileTempLocation));
      tileArray.push(tileTempItem);
      //console.log(tileArray[tileW*k+i])
  }
  }


  //scrambler, assign random values
  for(i=0;i<(tileW*tileH);i++){
    var tempTileImgItem= tileArray[i];
    tempTileImgItem.scramble();

  }
  for(i=0;i<(tileW*tileH);i++){ //draw loop
    var tempTileImgItem= tileArray[i];
    tempTileImgItem.graphics();

  }

  for(i=0;i<(tileW*tileH);i++){ //interact loop
    var tempTileImgItem= tileArray[i];
    var tempTileItemPos=tempTileImgItem.pos
    //console.log(tempTileItemPos);
    if("mouse is within item bounds,"){
      //
      
    }
    tempTileImgItem.update();
  }
  noLoop();
}

function tileScramble(){ // scramble and alter tiles
  //go thru array and randomize process
  //
}

function gameloop(){
  //
  //update 
  //redraw
}