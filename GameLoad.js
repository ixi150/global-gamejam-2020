function LoadScript(path)
{
    var imported = document.createElement("script");
    imported.src = path + ".js";
    document.head.appendChild(imported);
}

LoadScript("lerp-color");
LoadScript("bezier");
LoadScript("GameEngine");
LoadScript("GameInput");
LoadScript("Stalk");
LoadScript("Flower");
LoadScript("Game");