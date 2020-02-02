function CreateStalk()
{
    var stalk = new Stalk();
    stalk.baseColor='#00dd00';
    stalk.baseHeight=300;
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
    leaf.baseWidth=size/3;
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
    leaf.attachDistanceFromCore=0.9;

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
    leaf.inheritsModWidth=false;

    return leaf;
}

function CreateHead(size)
{
    var head = new Stalk();

    head.baseHeight=size;
    head.baseWidth=size/2;
    head.curveResolution=30;
    head.AddWidthStop(0.0, 0.0);
    head.AddWidthStop(0.25, 0.66);
    head.AddWidthStop(0.5, 1.0);
    head.AddWidthStop(0.75, 0.66);
    head.AddWidthStop(1.0, 0.0);
    head.rotationBiasMultiplier=0;

    head.baseColor='#ffff11';
    head.dryColor=head.baseColor;
    head.wetColor=head.baseColor;
    head.frozenColor='#88bbee';
    head.hotColor='#ee1111';
    head.baseShape=head.wetShape=head.dryShape;
    
    head.rotationOffset=90;
    head.rotationMagnitude = 0;
    head.rotationSpeed = 0;
    //head.inheritsModWidth=false;
    head.attachDistanceFromCore=0;
    return head;
}

function CreateHeadWithPellets(size)
{
    var head = CreateHead(size);

    head.AppendChild(CreatePelet(false, size/2), .01);
    head.AppendChild(CreatePelet(true,  size/2), .01);
    head.AppendChild(CreatePelet(false, size/2), .3);
    head.AppendChild(CreatePelet(true,  size/2), .3);
    head.AppendChild(CreatePelet(false, size/2), .5);
    head.AppendChild(CreatePelet(true,  size/2), .5);
    head.AppendChild(CreatePelet(false, size/2), .7);
    head.AppendChild(CreatePelet(true,  size/2), .7);
    head.AppendChild(CreatePelet(false, size/2), .99);
    head.AppendChild(CreatePelet(true,  size/2), .99);

    // head.AppendChild(CreatePelet(false, size/2), .5);
    // head.AppendChild(CreatePelet(true,  size/2), .5);
    return head;
}

function CreatePelet(leanLeft, size)
{
    var head = new Stalk();
    head.leanLeft=leanLeft;
    if (!leanLeft)
    {
        head.rotationOffset=180;
    }

    head.baseHeight=size;
    head.baseWidth=size/2;
    head.curveResolution=15;
    head.AddWidthStop(0.0, 0.0);
    head.AddWidthStop(0.25, 0.66);
    head.AddWidthStop(0.5, 1.0);
    head.AddWidthStop(0.75, 0.66);
    head.AddWidthStop(1.0, 0.0);
    //head.rotationBiasMultiplier=0;

    head.baseColor='#ffffff';
    head.dryColor=head.baseColor;
    head.wetColor=head.baseColor;
    head.frozenColor='#ffffff';
    head.hotColor='#ffcccc';
    head.baseShape=head.wetShape=head.dryShape;
    
    //head.rotationOffset=90;
    head.rotationMagnitude = 5;
    head.rotationSpeed = 0.5;

    head.attachDistanceFromCore=.8;
    return head;
}