//

class tile{

    constructor (img,posVect){ //pass image section
        this.tileRawImg=img;
        this.pos=posVect;
        //this.alteredImage;
        this.tileDrawImg;
        //console.log(this.transVal);

    }

    update(mouseVector){
        // interact!
        this.pos=mouseVector;
        console.log(this.pos);
    }

    graphics(){
        //
        push();
        if (this.opVal==0){
            //
            //console.log("A");
            //tint
            //console.log(this.transVal);
            tint(this.transVal);
            image(this.tileRawImg,this.pos.x,this.pos.y);
            
        }
        else if (this.opVal==1){
            //
            //console.log("B");
            //scale
            //console.log(this.transVal);   

            image(this.tileRawImg,this.pos.x,this.pos.y,int(this.tileRawImg.width*this.transVal),int(this.tileRawImg.height*this.transVal));
        }
        else if(this.opVal==2){
            //
            //console.log("C");
            //shear
            //console.log(this.transVal);
            shearX(PI*this.transVal);
            rotate(this.transVal);
            image(this.tileRawImg,this.pos.x,this.pos.y,int(this.tileRawImg.width*(1+abs(this.transVal)),int(this.tileRawImg.height*(1+abs(this.transVal)))));
            
        }
        else if(this.opVal==3){
            //
            //console.log("D");
            //mash
            image(this.tileRawImg,this.pos.x,this.pos.y);
        }
        
        noTint();
        pop();
        

        //this.tileDrawImg = this.tileRawImg;
        //image(this.tileDrawImg,int(random(0,width)),int(random(0,height)));
    }

    scramble(){
        //
        this.opVal=int(random(0,3));
        //console.log(this.opVal);
        //recut
        if (this.opVal==0){
            this.transVal=color(random(150,255),random(150,255),random(150,255));
        }
        else if(this.opVal==1){
            //
            this.transVal=random(1.2,1.5);
        }
        else if(this.opVal==2){
            //
            this.transVal=random(-1/16,1/16);
        }
        else if(this.opVal==3){
            //
            
        }
    }
}