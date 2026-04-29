let camPhoto; //this image for 
let fontData; //font storage
let gameState;

let cameraFeed;

let buttonArray=[];

let tileArray=[];
let tileW,tileH

function preload(){
  // purley debug. These are test images

  //camPhoto=loadImage('data/JermaTestImg.png');
  //camPhoto=loadImage('data/LebronTestImg.jpg');
  //testImg=loadImage('data/NLTestImg.jpg');

  fontData=loadFont('data/MAROLA.TTF',fontSuccess(),fontFail()); //tha font
  //sourced from: https://www.dafont.com/marola.font 
  //console.log(fontData);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  gameState = 3; //I started at 3 because I wanted to have options to add earlier scenes or later scenes. 

  tileW=4;
  tileH=5;

  imageMode(CENTER); //image mode center!

  // this is setting up the camera button. 
  var buttonSize=createVector(300,100); //size as a vector
  var buttonPos=createVector(width/2,height/2+200); //position as a vector
  var takePhotoBtn=new button(buttonSize,buttonPos,"that's me!"); //text for the button
  buttonArray.push(takePhotoBtn);

  // this is setting up the screenshot button
  var buttonSize
  var buttonSize=createVector(400,100); //size as a vector
  var buttonPos=createVector(width/2,height/2-350); //position as a vector
  var screenshotBtn=new button(buttonSize,buttonPos,"that's me...?");
  buttonArray.push(screenshotBtn)



  //I'm using the code structure of this example: https://p5js.org/examples/imported-media-video-capture/
  cameraFeed=createCapture(VIDEO); //create camera video feed object
  cameraFeed.hide(); // hide the feed object from html generation :)
 
 
}

function draw() {
  background(0);

  //takephoto();
   //disabled for working on photo scene
  if (gameState==3){
    // photo state
    takephoto();
    smile();
    //gameState=4;
  } else if (gameState==4){
    // generate the distortions
    tileGenerate();
    //console.log("scrabb"); //tiles generated console log
    tileScramble();
    gameState=5;
  } else{
    gameloop();
  }
  
}

function smile(){
  //this is temp, while i work on the smile overlay
  push();
  fill(0,0);
  stroke(255,100);
  strokeWeight(10);
  ellipse(width/2,height/2,200,200);
  arc(width/2,height/2,100,100,0,PI);
  strokeWeight(20);
  point(width/2-25,height/2-25);
  point(width/2+25,height/2-25);
  pop();
}

function takephoto(){
  //load webcam to cam photo
  //overlay for facial alignment
  var margin=100;
  push();
  //scale(-1,1);
  image(cameraFeed, width/2, height/2, width/2-margin, (width/2 * cameraFeed.height / cameraFeed.width)-margin);
  pop();

  //button generation
  var takePhotoButton = buttonArray[0];
  var buttonSize=takePhotoButton.sizeVect;
  var buttonPos=takePhotoButton.posVect;
  
  takePhotoButton.graphic(); //draw the button object
  if (mouseX > buttonPos.x-buttonSize.x/2-10 && mouseX < buttonPos.x + buttonSize.x/2+10 && mouseY > buttonPos.y-buttonSize.y/2-10 && mouseY < buttonPos.y + buttonSize.y/2+10){
    if (mouseIsPressed==true){ //i nested these so it only engages if its both...
      //
      takePhotoButton.engaged=true;
    }
    else{
      takePhotoButton.engaged=false;
    }
  }

  if (takePhotoButton.engaged==true){ //if the button's data registers it as on. I honestly have no clue why I made it an object, but I did.
    var tempSnap=createImage(cameraFeed.width,cameraFeed.height); //image obj var just to jump to the globalvar
    tempSnap.copy(cameraFeed,0,0,cameraFeed.width,cameraFeed.height,0,0,cameraFeed.width,cameraFeed.height) //copy the camera data to a IMAGE object :)
    camPhoto=tempSnap; //copy the IMAGE translation to the actual storage spot
    //console.log("snap"); //debug log
    //console.log(camPhoto);
    gameState=4;
  }
}

function tileGenerate(){ //generate the tiles unaltered
  // 4 27 - moved from setup to the setup() to here
  camPhoto.loadPixels(); //load bearing line of code that is probably a leftover from earlier development. I don't think it's doing anything in current versions.

  var temptileW = int(camPhoto.width/tileW);
  var temptileH = int(camPhoto.height/tileH);



  for(k=0;k<tileH;k++){ //create tile objects
    for(i=0;i<tileW;i++){
      var tempTileArr = camPhoto.get(temptileW*i,temptileH*k,temptileW,temptileH);
      var centeroffsetX=(width-camPhoto.width)/2;
      var centeroffsetY=(height-camPhoto.height)/2;
      var tileTempLocation = (createVector(centeroffsetX+(temptileW+10)*i,centeroffsetY+(temptileH+10)*k));
      var tileTempItem = (new tile(tempTileArr,tileTempLocation));
      tileArray.push(tileTempItem);
  }
  }
  //console.log(tileArray);
}

function tileScramble(){ // scramble and alter tiles
  //go thru array and randomize process
  //
  //scrambler, assign random values (in obj)
  for(i=0;i<(tileW*tileH);i++){
    var tempTileImgItem= tileArray[i];
    tempTileImgItem.scramble(); //generate internal distortions for items

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
        tempTileItem.update(mouseMoveVect); //this sends the new movement vector to the tiles. the redraw occurs in the objects.
      }
    }
    
  }
    for(i=0;i<(tileW*tileH);i++){ //draw loop for tiles
      var tempTileImgItem= tileArray[i]; //load item from array
      tempTileImgItem.graphics();  //draw items
  }
  //
  rectMode(CENTER);
  noFill();
  stroke(255,100);
  strokeWeight(10);
  rect(width/2,height/2,500,500);
  //capture window pic button
  var screenshotBtn = buttonArray[1];
  var buttonSize=screenshotBtn.sizeVect;
  var buttonPos=screenshotBtn.posVect;
  screenshotBtn.graphic();
  if (mouseX > buttonPos.x-buttonSize.x/2-10 && mouseX < buttonPos.x + buttonSize.x/2+10 && mouseY > buttonPos.y-buttonSize.y/2-10 && mouseY < buttonPos.y + buttonSize.y/2+10){
    if (mouseIsPressed==true){ //borrowed from other button
      //
      screenshotBtn.engaged=true;
    }
    else{
      screenshotBtn.engaged=false;
    }
  }

  if (screenshotBtn.engaged==true){
    //
    save('you!.png');
  }
}

function fontSuccess(){
  //
}

function fontFail(){
  //
  console.error("Font Marola failed to load");
}


//class feedback 4 29 2026
// tile movement/drift
// larger transformations
// other parts?