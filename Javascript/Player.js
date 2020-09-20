
const MAXSPEED = 6;

class Player {
    constructor(x, y, width, height) {
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shiftKey = 1;

        this.jumpCount = 0;
        this.rightarrow = false;
        this.leftarrow = false;
        this.playerFacingRight = true;
        this.wallglide = false;
        this.playerAlive = true;
        this.playerWon = false;
       
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0.3;

        this.animationLoop = [0,1,2,3];
        this.animationLoopIndex = 0;
        this.loadSpritesheet();

    
    
    }

    loadSpritesheet() {

        this.playerSprite = new Image();
        this.playerSprite.src = "./Source/adventurer-Sheet.png";

    }
  

    playerupdate() {
        
        
        if(this.leftarrow){
            this.velocityX -= this.accelerationX;
            this.accelerationX = (MAXSPEED + this.velocityX)/10;
            this.playerFacingRight=false;
        }
        if(this.rightarrow){
            this.velocityX += this.accelerationX;
            this.accelerationX = (MAXSPEED - this.velocityX)/10;
            this.playerFacingRight=true;
        }
        if(this.rightarrow && this.leftarrow){
            this.velocityX = 0 ;
        }

        if(this.velocityY <= 80) {
            this.velocityY += this.accelerationY;      
        }
        if(this.velocityY >= 0.9 && this.jumpCount !== 2){
            this.jumpCount = 1;
        }
        
        this.x += this.shiftKey*this.velocityX;
        this.y += this.velocityY;
        
    }
    spriteAnimation(ctx, frameCount) {
        
        let leftOfset = 0;
        let playerState = 0;
        if(!this.playerFacingRight) {
            leftOfset = 306;
        }
        if(this.velocityX !==0 && this.jumpCount == 0){
            playerState = 1;
            this.animationLoop=[0,1,2,3,4,5];
        }    
        if(this.velocityY >= 0.3 ) {
            playerState = 7;
            this.animationLoop=[0,1];
        }
        if(this.velocityY < 0) {
            playerState = 2;
            this.animationLoop=[0,1];
        }
        if(this.wallglide && this.velocityX === 0) {
            playerState = 4;
            this.animationLoop=[0,1,2,3];
        }
        if(this.jumpCount==2 && this.velocityY < 0) {
            playerState = 3;
            this.animationLoop = [0,1,2,3];
        }
        if(playerState === 0) {
            this.animationLoop=[0,1,2,3];
        }
        if(frameCount%10 == 0 ) {
            this.animationLoopIndex += 1;
           
        };   

        if(this.animationLoopIndex >= this.animationLoop.length) { 
            this.animationLoopIndex = 0;
        };
        
        this.draw(ctx, this.animationLoop[this.animationLoopIndex] , playerState, leftOfset);
        

    }
    
    draw(ctx, frameX, frameY, leftOfset) {
        
        ctx.drawImage(this.playerSprite , 9+(frameX*50)+leftOfset ,
            (frameY*2)+(frameY*36) , 23, 35, this.x, this.y, this.width, this.height );
    }

    collisioncheck(obstacle) {
        if (this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&            
            this.y < obstacle.y + obstacle.width &&
            this.y + this.height > obstacle.y) {

                if(this.y +this.height  > obstacle.y +obstacle.width && this.y < obstacle.y+obstacle.width && this.velocityY < 0 ) {
                    
                    return this.collisionHandling(1, obstacle)
                }
                
                if(this.y+this.height > obstacle.y && this.y < obstacle.y && this.velocityY >= 0) {

                    return this.collisionHandling(2, obstacle)
                }

                if(this.x+this.width > obstacle.x && this.x < obstacle.x + obstacle.width && this.velocityX  <= 0) {
                    
                    return this.collisionHandling(3, obstacle)
                }

                if(this.x < obstacle.x && this.x + this.width < obstacle.x + obstacle.width && this.velocityX >= 0 ) {
                    

                    return this.collisionHandling(4, obstacle)
                }
                
            }
        
    }

    collisionHandling(state, obstacle) {
        
        switch(state) {

            //Von Unten
            case 1:
                if(obstacle.winGame == true) {
                        this.playerWon = true;
                }
                if(obstacle.deals_dmg_to_player == true) {
                    this.playerAlive = false;
                }
                else {
                this.y = obstacle.y+obstacle.width+0.1;
                this.velocityY = 0;
                this.wallglide = false;
                }
                break;

            //Von Oben
            case 2: 
                if(obstacle.winGame == true) {
                    this.playerWon = true;

                }
                if(obstacle.deals_dmg_to_player == true) {
                    this.playerAlive = false;
                }
                else {
                
                this.y = obstacle.y-this.height-0.1;
                
                this.velocityY = 0;
                this.jumpCount = 0;
                this.wallglide = false;
                }
                
                break;
            
            //Von Rechts
            case 3:
                if(obstacle.winGame == true) {
                    this.playerWon = true;

                }
                if(obstacle.deals_dmg_to_player == true) {
                    this.playerAlive = false;
                }
                else {
                    this.x = obstacle.x+obstacle.width+0.1;
                    this.wallglide = true;
                    this.velocityX=0;
                
                    if( this.y+this.height/4 < obstacle.y + obstacle.width) {
                        this.velocityY = 0.4;
                        this.jumpCount = 1;
                        
                        }

                    
                }
                break;     

            //Von Links
            case 4:
                if(obstacle.winGame == true) {
                    this.playerWon = true;

                }
                if(obstacle.deals_dmg_to_player == true) {
                    this.playerAlive = false;
                }
                else {
                    this.x = obstacle.x-this.width-0.1;
                    this.wallglide = true;
                    this.velocityX = 0;
                    if( this.y+this.height/4 < obstacle.y + obstacle.width) {
                        this.velocityY = 0.4;
                        this.jumpCount = 1;   
                        
                                 
                    }                
                }
                break;

        }
    }
}

export default Player;