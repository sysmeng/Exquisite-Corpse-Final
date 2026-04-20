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
        push();
        transform(this.sizeVect.x,this.sizeVect.y);
        //draw button
        //draw shadow for interact
        //text
        //text(this.text)
        pop();
    }
}