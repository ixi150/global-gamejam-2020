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
        this.perfectTemperature =   80 + 15*Math.random();
        this.perfectRain =          30 + 15*Math.random();
        this.perfectSun =           60 + 15*Math.random();
        this.growthSpeed = .09;
        this.rainVulnerability          = .5;
        this.sunVulnerability           = .5;
        this.temperatureVulnerability   = .5;

        this.maxHealth = 100;
        this.health = this.maxHealth/2;

        this.stalks=[];
        this.position={ x:0, y:0 };

        this.sun        =0 + Math.random();
        this.water      =0 + Math.random();
        this.temperature=0 + Math.random();
        this.waterFalling       =0.2;
        this.sunFalling         =0.0;
        this.temperatureFalling =0.0;
        this.size=0.3 + 0.05*Math.random();

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

    Update()
    {
        function UpdateValue(value, perfect, climate, falling, vulnerability)
        {
            value -= falling * deltaTime;
            let targetValue = 2*(climate-perfect)/100.0;
            value = Math.lerp(value, targetValue, vulnerability*deltaTime);

            // climate /= 100;
            // value += climate*vulnerability* deltaTime;
            return Math.clamp(value,-1,1);
        }

        this.sun=UpdateValue(this.sun, this.perfectSun, sun, this.sunFalling, this.sunVulnerability);
        this.temperature=UpdateValue(this.temperature, this.perfectTemperature, temperature, this.temperatureFalling, this.temperatureVulnerability);
        this.water=UpdateValue(this.water, this.perfectRain, rain, this.waterFalling+Math.abs(this.temperature/10), this.rainVulnerability);

        let inconvenience = 2*Math.abs(this.sun) +1*Math.abs(this.temperature) +1*Math.abs(this.water);
        let growth = Math.clamp(1-inconvenience, 0, 1) * this.growthSpeed;
        this.size = Math.clamp(this.size+growth*deltaTime,0,1);
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
            stalk.modSize=this.size;
            stalk.Draw(this.position, 0);
        }
    }
}


