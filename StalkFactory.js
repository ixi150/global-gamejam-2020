function CreateStalk()
{
    var stalk = new Stalk();
    stalk.baseColor='#00dd00';
    stalk.baseHeight=400;
    stalk.AddWidthStop(0.0, 2);
    stalk.AddWidthStop(0.1, 1.5);
    stalk.AddWidthStop(0.8, 1.1);
    stalk.AddWidthStop(0.95, 0.9);
    stalk.AddWidthStop(1.0, 0.0);

    stalk.c0 = {x:0.1, y:1.0};
    stalk.c1 = {x:0.2, y:0.3};
    stalk.c2 = {x:-0.3, y:0.75};

    return stalk;
}

function CreateStalkWithLeafs()
{
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
    return stalk;
}

function CreateLeaf(leanLeft, size)
{
    var leaf = new Stalk();
    leaf.leanLeft=leanLeft;
    if (!leanLeft)
    {
        leaf.rotationOffset=180;
    }

    leaf.drawCore=true;
    leaf.drawNormals=true;
    size += 0.3*size*Math.sin(Math.random()*2*Math.PI);
    leaf.baseHeight=size;
    leaf.curveResolution=10;
    leaf.AddWidthStop(0.0, 0.0);
    leaf.AddWidthStop(0.1, .5);
    leaf.AddWidthStop(0.2, 1.0);
    leaf.AddWidthStop(0.8, 0.2);
    leaf.AddWidthStop(1.0, 0.0);

    leaf.dryColor='#edd079';
    leaf.wetColor='#073008';
    leaf.hotColor='#ff0000';
    
    leaf.rotationMagnitude = 5 + 5*Math.random();
    leaf.rotationSpeed = 2 + 1*Math.random();

    leaf.baseShape=leaf.wetShape=leaf.dryShape=new CurveShape(2);

    return leaf;
}

function CreateSpike(leanLeft, size)
{
    var leaf = new Stalk();
    leaf.leanLeft=leanLeft;
    if (!leanLeft)
    {
        leaf.rotationOffset=180;
    }

    size += 0.3*size*Math.sin(Math.random()*2*Math.PI);
    leaf.baseHeight=size;
    leaf.baseWidth=5;
    leaf.curveResolution=3;
    leaf.AddWidthStop(0.0, 1.0);
    leaf.AddWidthStop(1.0, 0.0);
    leaf.rotationBiasMultiplier=0;

    leaf.baseColor='#a88431';
    leaf.dryColor=leaf.baseColor;
    leaf.wetColor=leaf.baseColor;
    leaf.frozenColor='#ffffff';
    leaf.hotColor='#000000';
    leaf.baseShape=leaf.wetShape=leaf.dryShape;
    
    leaf.rotationMagnitude = 0;
    leaf.rotationSpeed = 0;

    return leaf;
}