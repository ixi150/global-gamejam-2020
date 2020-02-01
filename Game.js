const canvas = document.getElementById("GameCanvas");
const context = canvas.getContext("2d");

var frame = 0;
var fps = 30;
var deltaTime = 1.0/fps;
var startTime = GetTime();
var frameCount = 0;
var frameCountingTime = 0;

function GetTime()
{
    return Date.now() / 1000;
}
function GetSliderValue(id)
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
        this.flowers.push(CreatePlant());
        
        
    }

    GameUpdate()
    {
        var endTime = GetTime();
        deltaTime = endTime - startTime;
        startTime = endTime;
        frameCount++;
        //frame++;
        
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
        
        let water = GetSliderValue("slider-water")/100;
        let sun = GetSliderValue("slider-sun")/100;
        let temperature = GetSliderValue("slider-temperature")/100;
        
        // stalk.c0 = { x:GetSliderValue('slider-x')/100, y:GetSliderValue('slider-y')/100};
        // stalk.c1 = { x:GetSliderValue('slider-c1x')/100, y:GetSliderValue('slider-c1y')/100};
        // stalk.c2 = { x:GetSliderValue('slider-c2x')/100, y:GetSliderValue('slider-c2y')/100};
        
        this.flowers.forEach(f => {
            f.water=water;
            f.sun=sun;
            f.temperature=temperature;
            f.Draw();
        });
        
        context.restore();
        
        //drawFPS
        if (true || keys[81]) //q
        {
            context.textBaseline = 'top';
            context.textAlign = "right";
            context.fillStyle = "black";
            context.font = "20px Arial";
            context.fillText(fps, canvas.width-10, 10);
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

window.onload = function()
{
    var game = new Game();
    game.GameStart();
    game.UpdateEnded = function()
    {
        window.setTimeout(function(){game.GameUpdate();}, 0.01);
    };
    //Start game loop
    //this.gameLoopInterval = window.setInterval(function(){game.GameUpdate();}, 1000/fps);

    game.GameUpdate();
    this.gameFpsInterval = window.setInterval(game.FpsCountUpdate, 500);
};