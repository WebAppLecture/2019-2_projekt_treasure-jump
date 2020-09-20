
//const this.gridsize=50;
//const this.maxGridwidth = this.canvas.width/this.gridsize;



class LevelEditor{
    constructor() {

        this.canvas = document.getElementById("LevelEditor");
        this.context = this.canvas.getContext("2d");

        //Buttons!
        this.whiteButton = document.getElementById("WhiteButton");
        this.topLeftSpriteButton = document.getElementById("TopLeft");
        this.topMiddleSpriteButton = document.getElementById("TopMiddle");
        this.topRightSpriteButton = document.getElementById("TopRight");
        this.middleLeftSpriteButton = document.getElementById("MiddleLeft");
        this.middleSpriteButton = document.getElementById("Middle");
        this.middleRightSpriteButton = document.getElementById("MiddleRight");
        this.bottomLeftSpriteButton = document.getElementById("BottomLeft");
        this.bottomMiddleSpriteButton = document.getElementById("BottomMiddle");
        this.bottomRightSpriteButton = document.getElementById("BottomRight");
        this.top2MiddleSpriteButton = document.getElementById("TopMiddle2");
        this.middle2SpriteButton = document.getElementById("Middle2");
        this.middleBlackSpriteButton = document.getElementById("MiddleBlack");
        this.spikesSpriteButton = document.getElementById("Spikes");
        this.playerSpriteButton = document.getElementById("Player");
        this.winButton = document.getElementById("Treasure");

        this.loadFileButton = document.getElementById("loadFile");
        this.saveFileButton = document.getElementById("saveFile");
        this.drawGridButton = document.getElementById("ClearButton");


        this.color = "black" ;
        this.levelString = '';
        this.spriteObjects = [
                              {name: "TopLeft", x: 40, y: 185, w: 40, h: 40, String: 'Z'},   {name: "TopMiddle", x: 80, y: 185, w: 40, h: 40, String: 'U'},
                              {name: "TopRight", x: 512, y: 185, w: 40, h: 40,  String: 'I'}, {name: "MiddleLeft", x: 40, y: 225, w: 40, h: 40,  String: 'H'}, 
                              {name: "Middle", x: 80, y: 225, w: 40, h: 40,  String: 'J'},    {name: "MiddleRight", x: 512, y: 225, w: 40, h: 40, String:'K'},
                              {name: "BottomLeft", x: 333, y: 95, w: 40, h: 40,  String: 'B'},{name: "BottomMiddle", x: 401, y: 95, w: 14, h: 44, String: 'N'},
                              {name: "BottomRight", x: 442, y: 95, w: 40, h: 40,  String: 'M'},{name: "Middle2", x: 144, y: 240, w: 32, h: 32,  String: 'T'},
                              {name: "TopMiddle2", x: 192, y: 185, w:48, h: 39,  String: 'G' }, {name: "BlackMiddle", x: 80, y: 251, w: 40, h: 37,  String: 'V'},
                              {name: "Player", x: 150, y: 32, w: 30, h: 30, String: 'P'},    {name: "Spikes", x: 201, y: 1, w: 40, h: 40,  String: 'D'}, 
                              {name: "Eraser", x: 315, y: 0, w: 30, h: 30,  String: '_'}, {name: "Treasure/Win", x: 500, y: 5, w: 25, h: 23,  String: 'W'}
                             ];

        this.canvas.width = 500;
        this.canvas.height = 500;

        this.actualSprite = 0;
        this.gridX;
        this.gridY;
        this.gridsize = document.getElementById("GridSize").value | 10;
        this.maxGridwidth = this.canvas.width/this.gridsize;
        this.mouseDown = false;
        
        
        this.addListener();
        this.initString();
        this.loadSpritesheet();
        this.drawOnLoad(this.levelString);
        
    }

    loadSpritesheet() {
        this.LevelSprite = new Image();
        this.LevelSprite.src = "./Source/tileset.png";
    }
    

    drawGrid() {

        let x;
        (this.canvas.height >= this.canvas.width) ? x=this.canvas.height : x = this.canvas.width;
        this.context.lineWidth = 0.5;
        this.context.strokeStyle = "black";

        for(let i=0; i*this.gridsize <= x; i++) {
            //vertical Lines
            this.context.beginPath();
            this.context.moveTo(i*this.gridsize,0);
            this.context.lineTo(i*this.gridsize, this.canvas.height);
            this.context.stroke();
            this.context.closePath();
            //horizontalLines
            this.context.beginPath();
            this.context.moveTo(0,i*this.gridsize);
            this.context.lineTo(this.canvas.width, i*this.gridsize);
            this.context.stroke();
            this.context.closePath();
            
        }
        
        this.context.lineWidth = 0;
    }
  
    //Initialize String
    initString() {
        this.levelString = '';
        for(let i=0; i*this.gridsize <= this.canvas.width; i++) {
            for(let j = 0; j*this.gridsize <= this.canvas.height; j++) {
                this.levelString += '_';
            }
        }
    }
    
    change_Color(string) {
        this.color = string;    
    }
    
    
    change_Sprite_Tile(int){
        this.actualSprite = int;
    }

    addListener() {
        
        this.canvas.addEventListener("mousemove",this.onMouseMove.bind(this));
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup",this.onMouseUp.bind(this));
        this.canvas.addEventListener("mouseout",this.onMouseOut.bind(this));

        this.topLeftSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this,0) );
        this.topMiddleSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this,1));
        this.topRightSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 2));

        this.middleLeftSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this,3) );
        this.middleSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this,4));
        this.middleRightSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 5));

        this.bottomLeftSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this,6) );
        this.bottomMiddleSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this,7));
        this.bottomRightSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 8));
        this.middle2SpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 9));
        this.top2MiddleSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 10));
        this.middleBlackSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 11));
        this.playerSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 12));
        this.spikesSpriteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 13 ));

        this.whiteButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 14));
        this.winButton.addEventListener("click", this.change_Sprite_Tile.bind(this, 15));
        this.drawGridButton.addEventListener("click", this.loadGrid.bind(this));
        
        this.saveFileButton.addEventListener("click", this.saveFile.bind(this));
        this.loadFileButton.addEventListener("change", this.loadFile.bind(this), false);

    }

    drawRect(x,y, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x*this.gridsize,y*this.gridsize, this.gridsize,this.gridsize);        
    }

    drawThisSpriteImage(int, posX, posY){
        let x = this.spriteObjects[int].x;
        let y = this.spriteObjects[int].y;
        let w = this.spriteObjects[int].w;
        let h = this.spriteObjects[int].h;
        let g = this.gridsize;        
        this.context.drawImage(this.LevelSprite, x,y,w,h, posX*g,posY*g,g,g);
    }
    

    //int -> x,y
    stringPostion_to_GridPosition(position) {

        this.maxGridwidth = Math.floor(this.canvas.width/this.gridsize)+1;
        this.gridX=0;
        this.gridY=0;
        
        if(position < this.maxGridwidth) {
            this.gridY=0;
            this.gridX=position;
            return
        }

        else{
            do{
                this.gridY += 1;
            }  while(position >= this.gridY*this.maxGridwidth); 
            this.gridY -= 1;
            this.gridX = position-this.gridY*this.maxGridwidth;
            return
        }
    }
   
    //Save/replace Position of drawn block to String 
   
    saveDrawtoString(x,y) {
        if(this.actualSprite === 12) {

            for(let i = 0; i<= this.levelString.length; i++) {
                if((this.levelString[i] === 'P')&& (i!=(x+y*this.maxGridwidth)) ) {
                    //Delete old player position from string
                    this.levelString = this.levelString.substring(0, (i) ) 
                    + '_' + this.levelString.substring((i)+1);

                    this.stringPostion_to_GridPosition(i);
                    
                    //redraw old player position to white
                    this.drawThisSpriteImage(14,this.gridX, this.gridY)
                };
            };   

            this.levelString = this.levelString.substring(0, (x+y*this.maxGridwidth) ) 
            + this.spriteObjects[this.actualSprite].String + this.levelString.substring((x+y*this.maxGridwidth)+1);

        }
        if(this.actualSprite === 15) {

            for(let i = 0; i<= this.levelString.length; i++) {
                if((this.levelString[i] === 'W')&& (i!=(x+y*this.maxGridwidth)) ) {
                    //Delete old player position from string
                    this.levelString = this.levelString.substring(0, (i) ) 
                    + '_' + this.levelString.substring((i)+1);

                    this.stringPostion_to_GridPosition(i);
                    
                    //redraw old player position to white
                    this.drawThisSpriteImage(14,this.gridX, this.gridY)
                };
            };   

            this.levelString = this.levelString.substring(0, (x+y*this.maxGridwidth) ) 
            + this.spriteObjects[this.actualSprite].String + this.levelString.substring((x+y*this.maxGridwidth)+1);

        }
        
        else{
            this.levelString = this.levelString.substring(0, (x+y*this.maxGridwidth) ) 
            + this.spriteObjects[this.actualSprite].String + this.levelString.substring((x+y*this.maxGridwidth)+1);
        }
        

    }

    onMouseMove(e){
        let X = e.offsetX;
        let Y = e.offsetY;

        this.gridX = Math.floor(X/this.gridsize);
        this.gridY = Math.floor(Y/this.gridsize); 

        if(this.mouseDown) {
            //this.drawRect(this.gridX, this.gridY, this.color);
            this.drawThisSpriteImage( this.actualSprite, this.gridX, this.gridY);
            this.saveDrawtoString(this.gridX, this.gridY);
        }
    }  

    onMouseDown(e) {

        this.mouseDown = true;
        let X = e.offsetX;
        let Y = e.offsetY;

        //convert mouseposition in canvas to grid(rounded down);
        this.gridX = Math.floor(X/this.gridsize);
        this.gridY = Math.floor(Y/this.gridsize);        
        
        //this.drawRect(this.gridX, this.gridY, this.color);
        this.drawThisSpriteImage( this.actualSprite, this.gridX, this.gridY);
        this.saveDrawtoString(this.gridX, this.gridY);
        //this.saveDrawBlocktoString(this.gridX, this.gridY);
    }

    onMouseUp() {
        this.mouseDown = false;        
    }
    
    onMouseOut() {
        this.mouseDown = false;
    }
    
   

    drawOnLoad(string) {
       
        
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        for(let i=0; i <= string.length; i++) {
            this.stringPostion_to_GridPosition(i);
            
            for(let j=0; j < this.spriteObjects.length; j++) {
                if(string[i] === this.spriteObjects[j].String) {
                    this.actualSprite = j;    
                    this.saveDrawtoString(this.gridX, this.gridY);
                    this.drawThisSpriteImage(j, this.gridX, this.gridY);
                }
            }              
                   
        }
        this.drawGrid();
    }
    //download string as text file
    saveFile() {
        let playerSet = false;
        let winFlag = false;
        
        for(let i=0; i<=this.levelString.length; i++) {
            if(this.levelString[i] === 'P') {
                playerSet = true;
            }
            if(this.levelString[i] === 'W') {
                winFlag = true;
            }
        }
        if(playerSet && winFlag){
            let a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.levelString));
            a.setAttribute('download', this.gridsize+'_'+this.canvas.width+'_'+this.canvas.height+'_'+'level'+'.txt');
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else{ 
            window.alert("Player and/or Win not set");
            return
        }       
    }

    //chose file, that includes level string
    loadFile() {
       
        let file = this.loadFileButton.files[0];
        this.reader = new FileReader();

        this.reader.onload = function(e) {
            this.loadGrid();
        }.bind(this);

        this.reader.readAsText(file);

        let fileNameSplit = file.name.split("_");
        
        document.getElementById("GridSize").value = parseInt(fileNameSplit[0],10);
        document.getElementById("Canvaswidth").value = parseInt(fileNameSplit[1],10);
        document.getElementById("Canvasheight").value = parseInt(fileNameSplit[2],10);
        
    }

    
    loadGrid() {
        this.gridsize = document.getElementById("GridSize").value;
        this.canvas.width = document.getElementById("Canvaswidth").value;
        this.canvas.height = document.getElementById("Canvasheight").value;

        this.initString();

        if(typeof this.reader == 'undefined' || typeof this.reader == null ){
            this.drawOnLoad(this.levelString);
        }
        else{
            this.drawOnLoad(this.reader.result);

        }
        this.color = "black";
    }

    
     
}

export default LevelEditor