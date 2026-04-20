//

class tile{

    constructor (img,posVect){ //pass image section
        this.tileRawImg=img;
        this.pos=posVect;
        this.alteredImage;

    }

    update(){
        //
    }

    graphics(){
        //
    }

    scramble(){
        //
        this.opVal=int(random(0,3));
        console.log(this.opVal);
        if (this.opVal==1){
            //
            console.log("A");
            //tint
        }
        else if (this.opVal==1){
            //
            console.log("B");
            //rescale
        }
        else if(this.opVal==2){
            //
            console.log("C");
            //
        }
        //recut
    }
}