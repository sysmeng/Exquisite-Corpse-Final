class button{
    //
    constructor(sizeVect,posVect,text,font){
        this.sizeVect=sizeVect;
        this.posVect=posVect;
        this.text=text;
        this.font=font;
        this.engaged=false;
    }

    interact(){
        //
        this.engaged=true;
    }

    graphic(){
        //
        rectMode(CENTER);
        if (this.engaged==false){
            //
            noStroke();
            fill(200,200,200);
            rect(this.posVect.x,this.posVect.y,this.sizeVect.x+20,this.sizeVect.y+20);
        }
        fill(255,255,255);
        rect(this.posVect.x,this.posVect.y,this.sizeVect.x,this.sizeVect.y);
        textAlign(CENTER,CENTER);
        //fontSize()
        textFont(fontData);
        text(this.text,this.posVect.x,this.posVect.y,this.sizeVect.x,this.sizeVect.y);
        //draw button
        //draw shadow for interact
        //text
        //text(this.text)
    }
}