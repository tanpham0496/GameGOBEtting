function ResourcePreLoader()
{
	this.isLoadComplete           = false;
	this.nowResourceLoaderedCount = 0;	
	this.intAllResourceCount      = 0;
	this.arrResource              = [];
}
 
ResourcePreLoader.prototype.AddImage = function(fileName)
{
	// console.log('fileName',fileName);
	var img = new Image();
	img.src = fileName;
	img.addEventListener("load", onLoadImageResourceComplete, false);
	this.arrResource.push({name: fileName, image: img});
	this.intAllResourceCount++;
	// console.log('this.intAllResourceCount',this.intAllResourceCount);
};

ResourcePreLoader.prototype.GetImage = function(fileName) //load
{
	for(var i = 0; i < this.arrResource.length; i++)
	{
		if(this.arrResource[i].name == fileName)
		{
			return this.arrResource[i].image;
		}
	}
	return null;
};
