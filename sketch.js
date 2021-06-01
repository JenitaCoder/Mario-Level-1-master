var mario,mario_running,mario_collided,mario_coin,score=0,mario_obstacle1M,mario_obstacle2T,mario_obstacle3K;
var bg,bgImage;
var brickGroup;
var coinGroup;
var gameState="PLAY";

function preload(){
    //loading the running mario animation
    mario_running=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");

    bgImage=loadImage("images/bgnew.jpg");
    brickImage=loadImage("images/brick.png");
    mario_coin=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
    coinsound=loadSound("sounds/coinSound.mp3");
    mario_obstacle1M=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png");
    mario_obstacle2T=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png");
    diesound=loadSound("sounds/dieSound.mp3");
    mario_obstacle3K=loadAnimation("images/keyObs1.png","images/keyObs2.png","images/keyObs3.png","images/keyObs4.png","images/keyObs5.png");
    mario_collided=loadAnimation("images/dead.png");
    restartimage=loadImage("images/restart.png");
}

function setup() {
createCanvas(1000, 600);

// creating the background sprite
bg=createSprite(500,300,1000,600);
bg.addImage(bgImage);
bg.scale=0.5;
bg.velocityX=-6;


//creating the mario
mario=createSprite(200,505,20,50);
mario.addAnimation("running",mario_running);
mario.addAnimation("col", mario_collided);
mario.scale=0.3;

restart=createSprite(500,300);
restart.addImage(restartimage);
restart.visible=false

//creating the ground sprite
ground=createSprite(200,590,400,10);
ground.visible=false;

//creating groups
brickGroup=new Group();
coinGroup=new Group();
obstacle1MGroup=new Group();

}

function draw() {

    if(gameState=="PLAY")
    {

    //marking infinite background
    if(bg.x<100)
    {
        bg.x=bg.width/4;
    }

    //prevent mario moving out with the bricks
    if(mario.x<200)
    {
        mario.x=200;
    }

    //prevent mario moving out from top
    if(mario.y<50)
    {
        mario.y=50;
    }

    //making mario jump with space
    if(keyDown("space"))
    {
        mario.velocityY=-16;
    }

    //calling function to generate bricks
    generateBricks();

    //make mario collide with brick
    for(var i=0;i<(brickGroup).length;i++)
    {
        var temp=brickGroup.get(i);
        if(temp.isTouching(mario))
        {
            mario.collide(temp);
        }
    }

    //calling function to generate coins
    generatecoins();


    //make mario catch the coin
    for(var i=0;i<(coinGroup).length;i++)
    {
        var tem=coinGroup.get(i);
        if(tem.isTouching(mario))
        {
            //increase score when coin is caught
            score++;
            //destroy coin when it is caught
            tem.destroy();
            tem=null;
            //play sound when coin is caught
            coinsound.play();

        }
    }

    //calling function to generate obstacles
    generateobstacle1M();

    //gravity to mario
    mario.velocityY=mario.velocityY+0.5;
    if(obstacle1MGroup.isTouching(mario))
        {
            diesound.play();
            gameState="END";
        }
    
    }

    else if(gameState=="END")
    {
        mario.changeAnimation("col",mario_collided);
        mario.y=589;
        bg.velocityX=0;
        mario.velocityX=0;
        mario.velocityY=0;
        obstacle1MGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        brickGroup.setVelocityXEach(0);
        obstacle1MGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
        brickGroup.setLifetimeEach(-1);
        restart.visible=true;
  
        if(mousePressedOver(restart)){
          restartGame(); 
         }
    }


    //mario colliding with ground
    mario.collide(ground);
    
    drawSprites();

    //displaying the score on screen
    textSize(20);
    fill("brown")
    text("Coins Collected: "+ score, 500,50)

    
}

//generating bricks
function generateBricks()
{
    
    if(frameCount%70==0)
    {
        var brick=createSprite(1200,120,40,10);
        brick.y=random(150,450);
        brick.addImage(brickImage);
        brick.scale=0.8;
        brick.velocityX=-6;
        brick.lifetime=250;
        brickGroup.add(brick);
    }

}

//generating coins
function generatecoins()
{
    if(frameCount%70==0)
    {
        var coin=createSprite(1200,120,10,10);
        coin.y=random(150,450);
        coin.addAnimation("coin",mario_coin);
        coin.scale=0.100;
        coin.velocityX=-6;
        coin.lifetime=250;
        coinGroup.add(coin);
    } 
}

//generating obstacles
function generateobstacle1M()
{
    if(frameCount%70==0)
    {
        var obstacle1=createSprite(1200,545,10,10);
        //choosing obstacles 
        var choice=Math.round(random(1,3));
        //decresing obstacle size
        obstacle1.scale=0.2;
        if(choice==1)
        {
        obstacle1.addAnimation("obstacle1M",mario_obstacle1M);}
        else if(choice==2){
        obstacle1.addAnimation("obstacle2T",mario_obstacle2T);}
        else if(choice==3){
        obstacle1.addAnimation("obstacle3K",mario_obstacle3K);
        obstacle1.scale=0.5;
        }
 
        obstacle1.velocityX=-6;
        //giving lifetime to obstacles
        obstacle1.lifetime=250;
        //adding obstacles
        obstacle1MGroup.add(obstacle1);
    } 
}

function restartGame()
{
    gameState="PLAY";
    coinscore=0;
    obstacle1MGroup.destroyEach();
    coinGroup.destroyEach();
    brickGroup.destroyEach();
    mario.changeAnimation("running",mario_running);
    
  restart.visible=false;

}





