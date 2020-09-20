import Level from "./Level.js";
import Player from "./Player.js";
import {level1Object} from "./LevelStrings.js"

const CANVASWIDTH = 1280;
const CANVASHEIGHT = 800;


class Game {

    constructor() {
        //canvas
        this.canvas = document.getElementById("GameWindow");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASHEIGHT;
        //Sound
        this.jumpSound = document.getElementById("JumpSound");
        this.wallJumpSound = document.getElementById("WallJumpSound");
        this.winSound = document.getElementById("WinSound");
        this.deathSound = document.getElementById("DeathSound");
        //Buttons/TitleScreen
        this.startGameButton = document.getElementById("StartGame");
        this.loadLevelButton = document.getElementById("LoadLevel");
        
        
        this.frameCount = 0;
        this.addListeners();
        this.showTitleScreen();
        this.createLevel(30,4000,2000,level1Object);
    }

    startGame() {
        this.createPlayer();
        this.timerStart = Date.now();
        
        this.hideTitleScreen();
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    loadLevel() {
       
        let file = this.loadLevelButton.files[0];
        this.reader = new FileReader();

        this.reader.onload = function(e) {
            this.createLevel(fileNameSplit[0], fileNameSplit[1], fileNameSplit[2], e.target.result);
        }.bind(this);

        this.reader.readAsText(file);

        let fileNameSplit = file.name.split("_");
        
        
    }

    showScoreBoard() {

        console.log(localStorage.getItem('Sekunde'));
        console.log(localStorage.getItem('Millisekunde'));
    }

    createLevel(gridSize, canvasWidth, canvasHeight,levelString) {
        
        this.world = new Level(gridSize, canvasWidth, canvasHeight, levelString);
    }
    

    createPlayer() {
        
        this.player = new Player(this.world.playerStartX, this.world.playerStartY, 30, 40);
    }

    
    showTitleScreen() {
        this.startGameButton.style.display = 'inline';
        this.loadLevelButton.style.display = 'inline';
        this.startGameButton.addEventListener("click", this.startGame.bind(this), {once: true} );
        this.loadLevelButton.addEventListener("change", this.loadLevel.bind(this), {once: true});
        
    }

    hideTitleScreen() {

        this.startGameButton.style.display = 'none';
        this.loadLevelButton.style.display = 'none';
        this.startGameButton.removeEventListener("click", this.startGame.bind(this) );
        this.loadLevelButton.removeEventListener("change", this.loadLevel.bind(this) );
       
    }

    
    addListeners() {

        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        
        switch(event.which) {
            case 16: //shift
                (this.player.jumpCount !==0) ? this.player.shiftKey = 1 : this.player.shiftKey = 1.5 ;
                break;
            case 39: //rechts(arrow)
                this.player.rightarrow = true;                
                break;

            case 37: //links(arrow)
                this.player.leftarrow = true;                
                break;

            case 32: //Space
                
                if(this.player.wallglide) {                    
                    
                    if(this.player.leftarrow){
                        this.player.velocityX = 15;
                        
                    }
                    if(this.player.rightarrow) {
                        this.player.velocityX = -15;
                    }
                    this.wallJumpSound.play();
                    this.player.velocityY = -8;    
                    this.player.jumpCount = 2; 
                    this.player.wallglide =false;               
                }
                else {
                    if((this.player.jumpCount < 2) && !event.repeat) {
                        //this.jumpSound.fastSeek(0.0);
                        this.player.velocityY = -8;
                        this.player.jumpCount += 1;
                        this.jumpSound.play();
                }
                break;
            }
        }
        
    }
  
    
    onKeyUp(event) {
        switch(event.which) {
            case 16:
                this.player.shiftKey = 1;
                break;
            case 39:
                this.player.rightarrow = false;
                this.player.velocityX -= this.player.velocityX;
                break;
            case 37:
                this.player.leftarrow = false;
                this.player.velocityX -= this.player.velocityX;
                break;
             
        }
    }
    levelComplete( milliseconds) {
        console.log("You Won!");
        this.winSound.play();
       
        localStorage.setItem('Millisekunde', milliseconds);
        this.showTitleScreen();
    }

    youDied() {

        console.log("You Died!");
        this.deathSound.play();
        this.showTitleScreen();
        
    }

    gameLoop() {    
        
      
        let timePassed = Date.now() - this.timerStart;        
              
        let milliseconds = Math.floor(timePassed/100);
        

        this.frameCount += 1;
        

        if( this.player.playerAlive ) {

            if(!this.player.playerWon) {
        
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            
            this.player.playerupdate();
            
            

            for(let i in this.world.levelObjects) {

                this.player.collisioncheck(this.world.levelObjects[i]);
         
            }
            
                    
            //"Camera-focus" on player
            this.context.save();

            this.context.translate(-this.player.x +CANVASWIDTH/3, -this.player.y +CANVASHEIGHT/1.5);

            for(let j in this.world.levelObjects) {
                
                
                this.world.levelObjects[j].draw(this.context);
                
            }
            

            this.player.spriteAnimation(this.context, this.frameCount);
            

            this.context.restore();
        
                       
            document.getElementById("timer").innerHTML = milliseconds ;
            window.requestAnimationFrame(this.gameLoop.bind(this));
            }
            else{
                this.levelComplete(milliseconds);
            }
        }
        else{
            this.youDied();
        }
    }

}

export default Game;

