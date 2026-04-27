let camPhoto;
let fontData; //font storage
let gameState;

let buttonArray=[];

let tileArray=[];
let tileW,tileH

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
  var takePhotoBtn=new button(buttonSize,buttonPos,"that's me!");
  buttonArray.push(takePhotoBtn);

 
 
}

function draw() {
  background(0);
  
  takephoto();
   //disabled for working on photo scene
  /*if (gameState==3){
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
  */
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
  //scrambler, assign random values (in obj)
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

        var mouseMoveVect= createVector(mouseX-pmouseX,mouseY-pmouseY); //thank god for pmouse i love you
        tempTileItem.update(mouseMoveVect); //this sends the new movement vector to the items
      }
    }
    
  }
    for(i=0;i<(tileW*tileH);i++){ //draw loop for tiles
      var tempTileImgItem= tileArray[i];
      tempTileImgItem.graphics();  
  }
}