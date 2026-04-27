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
  // purley debug. These are test images
  //camPhoto=loadImage('data/JermaTestImg.png');
  camPhoto=loadImage('data/LebronTestImg.jpg');
  //testImg=loadImage('data/NLTestImg.jpg');
  fontData=loadFont('data/MAROLA.TTF');
  //console.log(fontData);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  gameState = 4;

  tileW=4;
  tileH=4;

  imageMode(CENTER); //image mode center!

  // this is setting up a test button. 
  var buttonSize=createVector(300,100);
  var buttonPos=createVector(width/2,height/2);
  var takePhotoBtn=new button(buttonSize,buttonPos,"that's me!",fontData);
  buttonArray.push(takePhotoBtn);

 
 
}

function draw() {
  // put drawing code here

  //image(camPhoto,width/2,height/2);
  background(0);
  
  //var buttonObj=buttonArray[0];
  //buttonObj.graphic();
  //takephoto();
   //disabled for working on photo scene
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

function preloadPhoto(){
  //

}

function takephoto(){
  //load webcam to cam photo
  //overlay for facial alignment

  //button generation
  var takePhotoButton = buttonArray[0];
  var buttonSize=takePhotoButton.sizeVect;
  var buttonPos=takePhotoButton.posVect;
  
  takePhotoButton.graphic();
  if (mouseX > buttonPos.x-buttonSize.x/2-10 && mouseX < buttonPos.x + buttonSize.x/2+10 && mouseY > buttonPos.y-buttonSize.y/2-10 && mouseY < buttonPos.y + buttonSize.y/2+10){
    if (mouseIsPressed==true){
      //
      takePhotoButton.engaged=true;
    }
    else{
      takePhotoButton.engaged=false;
    }
  }
}

function tileGenerate(){ //generate the tiles unaltered
  // 4 27 - moved from setup to the setup() to here
  camPhoto.resize(0,height-200);
  camPhoto.loadPixels();


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
        //im borrowing this if statement's structure from here - adapted for my purposes: https://editor.p5js.org/NicolasTilly/sketches/mH-TgZcFa
        //this is comparing the mouse X and mouse Y compared to the size and position bounds of the current tile. I've added at 10px margin to make grabbing tiles a little eaiser.

        //debug items
        //console.log("mouse "+ mousePosVect);
        //console.log("tile "+ tempTileItemPos);

        var mouseMoveVect= createVector(mouseX-pmouseX,mouseY-pmouseY); //thank god for pmouse i love you
        tempTileItem.update(mouseMoveVect); //this sends the new movement vector to the items

        //debug items
        //console.log("mousemove "+mouseMoveVect); 
      }
    }
    
  }
    for(i=0;i<(tileW*tileH);i++){ //draw loop for tiles
      var tempTileImgItem= tileArray[i];
      tempTileImgItem.graphics();  
  }
}
/*
//this is defunct. drag functionality is now up and running.
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