import LevelEditor from "./LevelEditor.js"
import {Block_GameObject} from "./GameObject.js"
import {DeathPit_GameObject} from "./GameObject.js"
import {WinFlag_GameObject} from "./GameObject.js"

const TILESIZE = 30;

class Level {

    constructor(gridSize, canvasWidth, canvasHeight, levelSource) {

        this.gridSize = gridSize;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.levelSource = levelSource;
        this.levelObjects = [];
        this.stringMapArray = ['Z',  'U', 'I', 'H', 'J', 'K',  'B',  'N',  'M',  'T', 'G', 'V', 'P', 'D', '_', 'W'];

        this.playerStartX;
        this.playerStartY;
        this.generateLevel();

    }


    string_to_Object(string, posX, posY) {
        
        switch (string) {
    
            
            case "D":
                this.levelObjects.push (new DeathPit_GameObject(posX, posY, TILESIZE));
                break;
            case "W":
                this.levelObjects.push(new WinFlag_GameObject(posX,posY, TILESIZE));
                break;
            case "P":
                this.playerStartX = posX;
                this.playerStartY = posY;
                break;
            default:
                for(let i=0; i<this.stringMapArray.length;i++) {
                    if(this.stringMapArray[i] === string) {
                        this.levelObjects.push( new Block_GameObject(posX, posY, TILESIZE,i));
                    }
                }
                break;
        };
            
    }
    

    generateLevel() {
        let posX = 0; 
        let posY = 0;
        let j=0;
        let maxGridwidth = Math.floor(this.canvasWidth/this.gridSize) +1;
        for(let i=0; i < this.levelSource.length; i++) {
            
           if(j===maxGridwidth){
               posY +=1;
               posX = 0;
               j = 0;
            }
            if( (this.levelSource[i] !== "_") ) {
                
                this.string_to_Object(this.levelSource[i], posX*TILESIZE , posY*TILESIZE) ;
            }
            j += 1;
            posX += 1;
        }
    }
}

export default Level;
