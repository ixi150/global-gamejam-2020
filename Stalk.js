class Stalk
{
    constructor()
    {
        this.childStalks=[];
        this.childStalksRotationMultiplier=1.5;
        this.leanLeft=false;
        this.rotationOffset=0;
        this.rotationBiasMultiplier=1;
        this.rotationSpeed=0.5+.8*Math.random();
        this.rotationMagnitude=4+3*Math.random();
        this.widthStops=[];
        this.animationTime=0;

        this.curveResolution=100;
        this.baseWidth=15;
        this.baseHeight=250;

        this.outlineWidth=2;
        this.coreCover=0.8;
        this.coreWidth=2;
        this.normalsCover=0.7;
        this.normalsLengthMultiplier=0.9;
        this.normalsLengthBonus=-1;
        this.normalsDencity=0.92;
        this.normalsWidth=1;
        this.baseColor='#00dd00';
        this.frozenColor='#b3e6e5';
        this.hotColor='#eb4e10';
        this.dryColor='#80612d';
        this.wetColor='#125214';
        // this.baseColor='rgb(0, 200, 0)';
        // this.frozenColor='rgb(0, 200, 200)';
        // this.hotColor='rgb(200, 200, 0)';
        // this.dryColor='rgb(100, 150, 50)';
        // this.wetColor='rgb(0, 50, 40)';
        this.coreColor='rgba(0, 0, 0, 0.5)';
        this.normalsColor='rgba(0, 0, 0, 0.3)';

        this.drawControlPoints=false;
        this.drawOutline=true;
        this.drawBegin=false;
        this.drawEnd=false;
        this.drawCore=false;
        this.drawNormals=false;

        this.c0 = {x:0.0, y:1.0};
        this.c1 = {x:0.0, y:0.3};
        this.c2 = {x:0.0, y:0.7};

        this.modWidth=1;
        this.childrenRotationBias=0;
        this.modColorTemperature=0;
        this.modColorWater=0;
        this.modAnimationSpeed=1;
    }

    AddWidthStop(lengthPercent, widthMultiplier)
    {
        this.widthStops.push({l: lengthPercent, w:widthMultiplier});
        this.widthStops.sort(function (a, b) {
            if (a.l > b.l) {
                return 1;
            }
            if (b.l > a.l) {
                return -1;
            }
            return 0;
        });
    }

    ClearWidthStops()
    {
        this.widthStops=[];
    }

    EvaluateWidthStops(t)
    {
        if (this.widthStops.length == 0)
        {
            return 1;
        }

        if (this.widthStops.length == 1)
        {
            return this.widthStops[0].w;
        }

        let prev=this.widthStops[0];
        let next=prev;
        for(let i=1; i<this.widthStops.length; i++)
        {
            let curr=this.widthStops[i];
            if (t >  curr.l)
            {
                next=prev=curr;
            }
            else
            {
                next=curr;
                break;
            }
        }

        let min = prev.l;
        let max = next.l;
        if (max <= 0)
        {
            return next.w;
        }
        let lerp = (t-min)/(max-min);
        return Math.lerp(prev.w, next.w, lerp);
    }

    AppendChild(stalk, anchor)
    {
        stalk.anchor=anchor;
        this.childStalks.push(stalk);
    }

    Draw(position, rotation)
    {
        context.save();
        context.translate(position.x, -position.y);
        this.animationTime += deltaTime*this.rotationSpeed*this.modAnimationSpeed;
        let sin=Math.sin(this.animationTime);
        let cos=Math.cos(this.animationTime);
        let rotAnimation=sin*this.rotationMagnitude;
        rotation+=this.rotationOffset+rotAnimation;
        context.rotate(rotation * Math.PI / 180);

        //shadow defaults
        context.shadowBlur = 8;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;

        // Define the points as {x, y}
        let start = { x:0, y:0 };
        let cp1 = { x:this.baseHeight*this.c1.x+cos*-1, y:-this.baseHeight*this.c1.y+sin*6 };
        let cp2 = { x:this.baseHeight*this.c2.x+cos*-2, y:-this.baseHeight*this.c2.y+sin*4 };
        let end = { x:this.baseHeight*this.c0.x+cos*-3, y:-this.baseHeight*this.c0.y+sin*2 };
        if (this.leanLeft)
        {
            cp1.x*=-1;
            cp2.x*=-1;
            end.x*=-1;
        }
        var curve = new Bezier(start.x, start.y , cp1.x, cp1.y , cp2.x, cp2.y , end.x, end.y);


        // Normals
        let bodyPoints=[];
        let corePoints=[];
        let normalRoots=[];
        let normalPoints=[];
        let startBodyWidth=0;
        let endBodyWidth=0;
        let drawNormalsEveryOther=Math.round(Math.lerp(this.curveResolution, 1, this.normalsDencity));
        for(let i=0; i<=this.curveResolution; i++) 
        {
            let t=i/this.curveResolution;
            let pt = curve.get(t);
            let nv = curve.normal(t);
            
            let sin = Math.sin(t * 0 * Math.PI);
            let bodyWidth = this.baseWidth + sin * 0;
            bodyWidth*=this.EvaluateWidthStops(t) * this.modWidth;
            let offset = { x: bodyWidth*nv.x, y: bodyWidth*nv.y};
            let p1 = { x: pt.x+offset.x, y:pt.y+offset.y};
            let p2 = { x: pt.x-offset.x, y:pt.y-offset.y};
            
            bodyPoints[i]=p1;
            bodyPoints[this.curveResolution*2-i+1]=p2;
            
            if (i==0)
            {
                startBodyWidth=bodyWidth;
            }
            else if (i==this.curveResolution)
            {
                endBodyWidth=bodyWidth;
            }
            
            corePoints.push(pt);
            
            if (this.drawNormals && t>.1 && this.normalsCover > t && (i % drawNormalsEveryOther) == 0)
            {
                let normalWidth = this.normalsLengthMultiplier * bodyWidth + this.normalsLengthBonus;
                if (normalWidth > 0)
                {
                    let p0 = curve.get(t-.05);
                    let offset = { x: normalWidth*nv.x, y: normalWidth*nv.y};
                    let p1 = { x: pt.x+offset.x, y:pt.y+offset.y};
                    let p2 = { x: pt.x-offset.x, y:pt.y-offset.y};
                    normalRoots.push(p0);
                    normalPoints.push(p1);
                    normalPoints.push(p2);
                }
            }
        }

        //draw body
        context.beginPath();
        context.moveTo(0,0);
        for(let i=1; i<bodyPoints.length; i++) 
        {
            let p=bodyPoints[i];
            context.lineTo(p.x, p.y);
        }
        context.closePath();
        var getColor=function(base, min, max,t)
        {
            if (t >= 0)
            {
                return lerpColor(base, max, t);
            }
            return lerpColor(base, min, -t);
        }
        let color = getColor(this.baseColor, this.frozenColor, this.hotColor, this.modColorTemperature);
        color = getColor(color, this.dryColor, this.wetColor, this.modColorWater);
        context.fillStyle = color;
        context.shadowColor = "black";
        context.fill();
        
        if (this.drawOutline)
        {
            context.strokeStyle = "black";
            context.lineWidth = this.outlineWidth;
            context.stroke();
        }
        
        if (this.drawBegin || this.drawEnd)
        {
            context.beginPath();
            context.fillStyle = this.baseColor;
            if (this.drawBegin)
            {
                context.arc(start.x, start.y, startBodyWidth, 0, 2 * Math.PI);  // Start point
            }
            if (this.drawEnd)
            {
                context.arc(end.x, end.y, endBodyWidth, 0, 2 * Math.PI);      // End point
            }
            context.fill();
        }
       
        //reset shadows
        context.shadowColor = "#00000000";

        //draw core
        if (this.drawCore)
        {
            context.beginPath();
            context.strokeStyle = this.coreColor;
            context.lineWidth = this.coreWidth;
            context.moveTo(0,0);
            for (let i=0; i<corePoints.length && i/this.curveResolution < this.coreCover; i++)
            {
                let p=corePoints[i];
                context.lineTo(p.x, p.y);
            }
            context.stroke();
        }

         //draw normals
         if (this.drawNormals)
         {
            context.strokeStyle = this.normalsColor;
            context.lineWidth = this.normalsWidth;
            for (let i=0; i<normalRoots.length; i++)
            {
                context.beginPath();
                let p0=normalRoots[i];
                let p1=normalPoints[i*2];
                let p2=normalPoints[i*2+1];
                context.moveTo(p1.x, p1.y);
                context.lineTo(p0.x, p0.y);
                context.lineTo(p2.x, p2.y);
                context.stroke();
            }
         }

        //draw children stalks
        for (let i=0; i<this.childStalks.length; i++)
        {
            let child = this.childStalks[i];
            let index = Math.round(child.anchor*corePoints.length);
            if (child.leanLeft)
            {
                index = bodyPoints.length - index;
            }
            let pos = bodyPoints[index];
            pos.y*=-1;
            let nv = curve.normal(child.anchor);
            var angle = Math.atan2(nv.y, nv.x);
            var degrees = 180*angle/Math.PI;

            child.modWidth=this.modWidth;
            child.modColorTemperature=this.modColorTemperature;
            child.modColorWater=this.modColorWater;
            child.modAnimationSpeed=this.modAnimationSpeed;
            let rotationBias=this.childrenRotationBias * (child.leanLeft?1:-1) * child.rotationBiasMultiplier;
            child.Draw(pos, this.childStalksRotationMultiplier*degrees - 90 + rotationBias);
        }

        //debug stuff
        if (this.drawControlPoints)
        {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI);  // Control point one
            context.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);  // Control point two
            context.fill();
        }

        context.restore();
    }
}

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
    leaf.curveResolution=15;
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

    leaf.c0 = {x:0.1, y:1.0};
    leaf.c1 = {x:0.2, y:0.3};
    leaf.c2 = {x:-0.3, y:0.75};

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
    leaf.curveResolution=10;
    leaf.AddWidthStop(0.0, 1.0);
    leaf.AddWidthStop(1.0, 0.0);
    leaf.rotationBiasMultiplier=0;

    leaf.baseColor='#a88431';
    leaf.dryColor=leaf.baseColor;
    leaf.wetColor=leaf.baseColor;
    leaf.frozenColor='#ffffff';
    leaf.hotColor='#000000';
    
    leaf.rotationMagnitude = 0;
    leaf.rotationSpeed = 0;

    return leaf;
}