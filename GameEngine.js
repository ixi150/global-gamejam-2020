class GameObject
{
    constructor(transform, renderer)
    {
        this.transform = transform;
        this.renderer = renderer;

        this.components = new Array();
        this.components.push(transform);
        this.components.push(renderer);
        for (var i =0; i<this.components.length; i++)
        {
            this.components[i].gameObject = this;
        }
    }

    Update()
    {
        for (var i =0; i<this.components.length; i++)
        {
            this.components[i].Update();
        }
    }

    Draw()
    {
        for (var i =0; i<this.components.length; i++)
        {
            this.components[i].Draw();
        }
    }
}

class Component
{
    constructor()
    {
        this.gameObject = null;
    }

    Update(){}
    Draw(){}
}

class Transform extends Component
{
    constructor()
    {
        super();
        this.position = new Vector(0,0);
        this.rotation = 0;
    }
}

class Renderer extends Component
{
    constructor(image, pivot) 
    {
        super();
        this.image = image;
        this.pivot = pivot;
    }

    Draw()
    {
        context.save();
        let transform = this.gameObject.transform;
        context.translate(canvas.width/2 + transform.position.x, canvas.height/2 - transform.position.y);
        context.rotate(transform.rotation * Math.PI / 180);
        context.drawImage(this.image, this.pivot.x, this.pivot.y, 50, 50);
        
        context.restore();
    }
}

class Vector
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }

    Length()
    {

    }

    Normalize()
    {

    }
}


Math.lerp = function (value1, value2, amount) 
{
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

Math.clamp = function (v, min, max) 
{
    if (v >= max) return max;
    if (v <= min) return min;
    return v;
};

Math.moveTowards = function (current, target, delta)
{
    let missing = target-current;
    if (Math.abs(missing)<delta)
        return target;
    return current + delta*Math.sign(missing);
};