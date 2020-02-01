function CreatePlant()
{
    var flower = new Flower();
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
    
    stalk.AppendChild(CreateHead(100), .9);

    flower.AddStalk(stalk);
    return flower;
}