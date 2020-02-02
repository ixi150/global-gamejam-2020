const canvas = document.getElementById("GameCanvas");
const context = canvas.getContext("2d");

var frame = 0;
var fps = 30;
var deltaTime = 1.0/fps;
var startTime = GetTime();
var frameCount = 0;
var frameCountingTime = 0;

var sun=0;
var rain=0;
var snow=0; 
var temperature=0;
var points=0;

function GetTime()
{
    return Date.now() / 1000;
}
function GetInputValue(id)
{
    return document.getElementById(id).value*1;
}

class Game
{
    constructor()
    {
        this.UpdateEnded=function(){};
    }

    GameStart()
    {
        //Scene init
        this.flowers=[];
        this.wonFlowers=[];
        let plant = CreatePlant();
        plant.position.x=300;
        this.flowers.push(plant);
        
        
    }

    GameUpdate()
    {
        var endTime = GetTime();
        deltaTime = endTime - startTime;
        startTime = endTime;
        frameCount++;
        //frame++;
        
        sun = GetInputValue("sun");
        rain = GetInputValue("rain");
        snow = GetInputValue("snow");
        temperature = 1.5*sun-snow-rain/10;

        for (let i = 0; i < this.flowers.length; i++) 
        {
            const f = this.flowers[i];
            f.position.x-=25*deltaTime;

            if (f.size>=1)
            {
                this.wonFlowers.push(f);
                this.flowers.splice(i, 1);
                document.getElementById("points").textContent=++points;
                continue;
            }

            if (f.position.x < -canvas.width/2)
            {
                this.flowers.splice(i, 1);
                continue;
            }

            f.Update();
        }
        
        for (let i = 0; i < this.wonFlowers.length; i++) 
        {
            const f = this.wonFlowers[i];
            f.position.y+=90*deltaTime;

            if (f.position.y > canvas.height)
            {
                this.wonFlowers.splice(i, 1);
            }
        }

        this.GameDraw();

        this.UpdateEnded();
    }

    GameDraw()
    {
        context.save();
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle='#95cbcf';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.translate(canvas.width/2, canvas.height);
        
        this.flowers.forEach(f => {
            f.Draw();
        });
        this.wonFlowers.forEach(f => {
            f.Draw();
        });
        
        context.restore();
        
        //drawFPS
        if (true || keys[81]) //q
        {
            context.textBaseline = 'top';
            context.textAlign = "right";
            context.fillStyle = "rgba(0,0,0,0.4)";
            context.font = "20px Arial";
            context.fillText("FPS:"+fps, canvas.width-10, 10);
        }
    }

    FpsCountUpdate()
    {
        var currentTime = GetTime();
        if (frameCountingTime > 0)
        {
            fps = Math.round(frameCount/ (currentTime-frameCountingTime));
        }
        frameCount=0;
        frameCountingTime=currentTime;
    }
}

function SpawnNewFlower()
{
    let plant = CreatePlant();
    plant.position.x=500
    game.flowers.push(plant);
}

var game = new Game();
window.onload = function()
{
    game.GameStart();

    //Start game loop
    window.setInterval(function(){game.GameUpdate();}, 1000/fps);
    // game.UpdateEnded = function(){ window.setTimeout(function(){game.GameUpdate();}, 0.01); };
    // game.GameUpdate();
    window.setInterval(game.FpsCountUpdate, 500);
    window.setInterval(SpawnNewFlower, 6000);
};