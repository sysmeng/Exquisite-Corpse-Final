class button{
    //
    constructor(sizeVect,posVect,text){
        this.sizeVect=sizeVect;
        this.posVect=posVect;
        this.text=text;
        this.engaged=false;
    }

    interact(){
        //
        this.engaged=true;
    }

    graphic(){
        //
        rectMode(CENTER);
        rect(this.posVect.x,this.posVect.y,this.sizeVect.x,this.sizeVect.y);
        textAlign(CENTER,CENTER);
        //fontSize()
        text(this.text,this.posVect.x,this.posVect.y,this.sizeVect.x,this.sizeVect.y);
        //draw button
        //draw shadow for interact
        //text
        //text(this.text)
    }
}