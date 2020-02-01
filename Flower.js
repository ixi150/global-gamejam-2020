class Modifier
{
    constructor(min, max)
    {
        this.min=min;
        this.max=max;
    }

    Evaluate(v)
    {
        if (v >= 0)
        {
            return Math.lerp(1, this.max, v);
        }
        return Math.lerp(1, this.min, -v);
    }
}


class Flower
{
    constructor()
    {
        this.maxHealth = 100;
        this.health = this.maxHealth/2;

        this.stalks=[];
        this.position={ x:0, y:0 };

        this.temperature=0;
        this.water=0;
        this.sun=0;


        this.widthTemperatureMod = new Modifier(0.9, 1.1);
        this.widthWaterMod = new Modifier(.3, 1.3);
        this.widthSunMod = new Modifier(0.95, 1.1);

        this.rotationBiasWaterMod = new Modifier(30, -70);

        this.animationSpeedMod = new Modifier(0, 4);
    }

    AddStalk(stalk)
    {
        this.stalks.push(stalk);
    }

    Draw()
    {
        for(let i=0; i<this.stalks.length; i++)
        {
            let stalk=this.stalks[i];

            let modWidth = 1;
            modWidth*=this.widthTemperatureMod.Evaluate(this.temperature);
            modWidth*=this.widthWaterMod.Evaluate(this.water);
            modWidth*=this.widthSunMod.Evaluate(this.sun);
            stalk.modWidth = modWidth;

            let rotationBias = 0;
            rotationBias+=this.rotationBiasWaterMod.Evaluate(this.water);
            stalk.childrenRotationBias=rotationBias
            stalk.modColorTemperature=this.temperature;
            stalk.modColorWater=this.water;

            stalk.modAnimationSpeed=this.animationSpeedMod.Evaluate(this.temperature);

            stalk.Draw(this.position, 0);
        }
    }
}

function CreatePlant()
{
    var flower = new Flower();
    flower.AddStalk(CreateStalkWithLeafs());
    return flower;
}
