
 
 class GameObject {
    constructor(x, y, width, spritetile) {
 
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.spritetile=spritetile |0 ;
        this.deals_dmg_to_player = false;
        this.winGame = false;
        
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
        
           this.loadSpritesheet();
        
    }
    
    
    loadSpritesheet() {

        this.gameObjectSprite = new Image();
        this.gameObjectSprite.src = "./Source/tileset.png";

    }
    draw(ctx){
        let x = this.spriteObjects[this.spritetile].x;
        let y = this.spriteObjects[this.spritetile].y;
        let w = this.spriteObjects[this.spritetile].w;
        let h = this.spriteObjects[this.spritetile].h;           
        ctx.drawImage(this.gameObjectSprite, x,y,w,h, this.x,this.y, this.width+0.5, this.width+0.5);
    }
    /*
    draw(ctx) {
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width+0.5, this.width+0.5);
        
    }
    */
 }
 
 class Block_GameObject extends GameObject {
        constructor(x,y, width, spritetile) {
            super(x,y, width, spritetile);            
        }

 }

 class DeathPit_GameObject extends GameObject {
        constructor(x,y, width, spritetile) {
            super(x,y, width, spritetile);
            this.spritetile = 13;
            this.deals_dmg_to_player = true;
        }
 }

 class WinFlag_GameObject extends GameObject {
        constructor(x,y, width, spritetile) {
            super(x,y, width, spritetile);
            this.spritetile = 15;
            this.winGame = true;
           
        }
 }




export default GameObject;
export {Block_GameObject};
export {DeathPit_GameObject};
export {WinFlag_GameObject};