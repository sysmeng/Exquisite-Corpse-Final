let camPhoto;
let fontData;
let gameState;
let camX, camY;
let scale;
let altPhoto;

let buttonArray=[];

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
  gameState = 4;

  tileW=4;
  tileH=4;

  //console.log(scale);
  imageMode(CENTER); //image mode center!
  camPhoto.resize(0,height-200);

  camPhoto.loadPixels();
 // put setup code here
 // init random array for tiles

 var buttonSize=createVector(300,200);
 var buttonPos=createVector(width/2,height/2);
 buttonArray[0]=new button(buttonSize,buttonPos,"test");
 
}

function draw() {
  // put drawing code here
  //image(camPhoto,width/2,height/2);
  background(0);
  
  //var buttonObj=buttonArray[0];
  //buttonObj.graphic();

  
  if (gameState==3){
    // photo state
    // takephoto();
  } else if (gameState==4){
    // generate the distortions
    tileGenerate();
    console.log("scrabb");
    tileScramble();
    gameState=5;
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


  
  

  
}

function tileScramble(){ // scramble and alter tiles
  //go thru array and randomize process
  //
  //scrambler, assign random values
  for(i=0;i<(tileW*tileH);i++){
    var tempTileImgItem= tileArray[i];
    tempTileImgItem.scramble();

  }
}

function gameloop(){
  //

  for(i=0;i<(tileW*tileH);i++){ //interact loop
    //per item
    var tempTileItem = tileArray[i];
    var tempTileItemPos = tempTileItem.pos;
    var temptileW = int(camPhoto.width/tileW);
    var temptileH = int(camPhoto.height/tileH);
    
    if (mouseIsPressed==true){
      var mousePosVect=createVector(mouseX,mouseY);
      if(mouseX > tempTileItemPos.x-temptileW/2-10 && mouseX < tempTileItemPos.x + temptileW/2+10 && mouseY > tempTileItemPos.y-temptileH/2-10 && mouseY < tempTileItemPos.y + temptileH/2+10){
        //im borrowing this if statement from here - adapted for my purposes: https://editor.p5js.org/NicolasTilly/sketches/mH-TgZcFa
        //console.log("pee");
        //console.log("mouse "+ mousePosVect);
        //console.log("tile "+ tempTileItemPos);
        var mouseMoveVect= createVector(mouseX-pmouseX,mouseY-pmouseY); //thank god for pmouse i love you
        //console.log("mousemove "+mouseMoveVect);
        tempTileItem.update(mouseMoveVect);

        //mousePosVect=createVector(mouseX,mouseY);
      }
      
      //var offsetVect = tempTileItemPos.sub(mousePosVect);
      //tempTileItem.update(offsetVect);
    }
    
  }
    for(i=0;i<(tileW*tileH);i++){ //draw loop
      var tempTileImgItem= tileArray[i];
      tempTileImgItem.graphics();  
  }
  
  //update 
  //redraw
}
/*
function mousePressed(){
  // debug tester
  // 4 22 not finished
  console.log("ping");
  for(i=10;i<(11);i++){ //interact loop
    //per item
    var tempTileImgItem=tileArray[i];
    var tempTileItemPos=tempTileImgItem.pos
    //console.log(tempTileItemPos);
    var mouseVector=createVector(mouseX,mouseY);
    var boundscheck=tempTileItemPos.sub(mouseVector);
    var temptileW = int(camPhoto.width/tileW);
    var temptileH = int(camPhoto.height/tileH);
    console.log(boundscheck);
    if(boundscheck.x>-temptileW/2 && boundscheck.x < temptileW/2){ //mouse is within item bounds x
        //
        //tempTileImgItem.update(mouseVector);
        console.log(mouseVector);
        //tempTileImgItem.graphics();
      

    }
    
  }



}*/