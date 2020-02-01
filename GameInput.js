// var input = new Vector(0,0);
// if (keys[65] || keys[37]) //a / left
// {
//     input.x -= 1;
// }
// if (keys[68] || keys[39]) //d / right
// {
//     input.x += 1;
// }
// if (keys[83] || keys[40]) //s / down
// {
//     input.y -= 1;
// }
// if (keys[87] || keys[38]) //w / up
// {
//     input.y += 1;
// }


var OnKeyCodeDownListener = window.addEventListener( "keydown", OnKeyCodeDown, false );
var OnKeyCodeUpListener = window.addEventListener( "keyup", OnKeyCodeUp, false );

var keys=[];
function OnKeyCodeDown(event) 
{
    // var char = event.which || event.keyCode;
    // console.log("KeyDown: " + char);
    keys[event.keyCode] = true;
}

function OnKeyCodeUp(event) 
{
    // var char = event.which || event.keyCode;
    // console.log("KeyUp: " + char);
    keys[event.keyCode] = false;
}
