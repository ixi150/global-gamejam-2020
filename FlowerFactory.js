function CreatePlant()
{
    let random = Math.round(Math.random()*10);
    switch (random) {
        case 0: return CreateRose();
        case 1: return CreateRose();
        case 2: return CreateRose();
        case 3: return CreateCactus();
        case 4: return CreateCactus();
        case 5: return CreateCactus();
        case 6: return CreateCactus();
    
        default:
            return CreateDaisy();
    }
}

function CreateDaisy()
{
    var flower = new Flower();
    var stalk = CreateStalk();

    stalk.AppendChild(CreateLeaf(true, 70), .3);
    stalk.AppendChild(CreateLeaf(false, 70), .4);
    stalk.AppendChild(CreateLeaf(true, 70), .5);
    stalk.AppendChild(CreateLeaf(false, 70), .6);
    stalk.AppendChild(CreateLeaf(true, 70), .7);
    
    stalk.AppendChild(CreateHeadWithPellets(100), .9);

    flower.AddStalk(stalk);
    return flower;
}

function CreateRose()
{
    var flower = new Flower();
    flower.points=3;
    var stalk = CreateStalk();
    stalk.AppendChild(CreateSpike(false, 20), .3);
    stalk.AppendChild(CreateSpike(true, 20), .35);
    stalk.AppendChild(CreateSpike(true, 20), .4);
    stalk.AppendChild(CreateSpike(false, 20), .45);
    stalk.AppendChild(CreateSpike(true, 20), .5);
    stalk.AppendChild(CreateSpike(false, 20), .55);

    stalk.AppendChild(CreateLeaf(true, 70), .3);
    stalk.AppendChild(CreateLeaf(false, 70), .5);
    stalk.AppendChild(CreateLeaf(true, 70), .7);
    
    stalk.baseWidth=15;
    stalk.baseHeight=500;

    var head = CreateHead(110);
    head.baseColor='#ff0000';
    head.dryColor=head.baseColor;
    head.wetColor=head.baseColor;
    head.frozenColor='#88bbee';
    head.hotColor='#ee1111';
    stalk.AppendChild(head, .9);

    flower.AddStalk(stalk);
    flower.perfectTemperature =   30 + 5*Math.random();
    flower.perfectRain =          25 + 5*Math.random();
    flower.perfectSun =           50 + 10*Math.random();
    return flower;
}

function CreateCactus()
{
    var flower = new Flower();
    flower.points=2;
    var stalk = CreateStalk();
    stalk.ClearWidthStops();
    stalk.AddWidthStop(0.0, 0.8);
    stalk.AddWidthStop(0.7, 1.0);
    stalk.AddWidthStop(0.9, 0.8);
    stalk.AddWidthStop(1.0, 0.0);

    stalk.AppendChild(CreateSpike(false, 40), .1);
    stalk.AppendChild(CreateSpike(true,  40), .15);
    stalk.AppendChild(CreateSpike(true,  40), .25);
    stalk.AppendChild(CreateSpike(false, 40), .25);
    stalk.AppendChild(CreateSpike(true,  40), .3);
    stalk.AppendChild(CreateSpike(true,  40), .35);
    stalk.AppendChild(CreateSpike(true,  40), .4);
    stalk.AppendChild(CreateSpike(false, 40), .45);
    stalk.AppendChild(CreateSpike(true,  40), .5);
    stalk.AppendChild(CreateSpike(false, 40), .55);
    stalk.AppendChild(CreateSpike(false, 40), .65);
    stalk.AppendChild(CreateSpike(false, 40), .7);
    stalk.AppendChild(CreateSpike(true, 40), .75);
    stalk.AppendChild(CreateSpike(true,  40), .8);
    stalk.AppendChild(CreateSpike(true,  40), .85);
    stalk.AppendChild(CreateSpike(false, 40), .9);

    stalk.baseWidth=30;
    stalk.baseHeight=400;

    stalk.baseShape=new CurveShape(-1);
    stalk.wetShape=new CurveShape(0);
    stalk.dryShape=new CurveShape(-1);

    flower.AddStalk(stalk);
    flower.perfectTemperature =   100 + 5*Math.random();
    flower.perfectRain =          10 + 5*Math.random();
    flower.perfectSun =           90 + 10*Math.random();
    return flower;
}