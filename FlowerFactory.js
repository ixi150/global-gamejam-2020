function CreatePlant()
{
    var flower = new Flower();
    flower.AddStalk(CreateStalkWithLeafs());
    return flower;
}