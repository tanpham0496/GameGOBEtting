function SoundSystem()
{
	this.isLoadComplete           = false;
	this.nowResourceLoaderedCount = 0;	
	this.intAllResourceCount      = 0;
	this.arrResource              = [];
}
 
SoundSystem.prototype.AddSound = function(fileName)
{
	// console.log('fileNameSound',fileName);
	var soundMusic  = new Audio();
	soundMusic.src  = fileName;
	soundMusic.loop = false;
	document.body.appendChild(soundMusic);
	soundMusic.addEventListener("canplaythrough", onLoadSoundComplete, false);
	this.arrResource.push({name: fileName, sound: soundMusic, isPlayed: false});
	this.intAllResourceCount++;
	// console.log('this.intAllResourceCountSound',this.intAllResourceCount);
};

SoundSystem.prototype.PlaySound = function(fileName, stop, allstop)
{
	if(allstop)
	{
	   for(var i = 0; i < this.arrResource.length; i++)
   	   {
           if(this.arrResource[i].sound.ended != true && this.arrResource[i].isPlayed != false)
		   {
		      this.arrResource[i].sound.pause();
		      try{
                  this.arrResource[i].sound.currentTime = 0;    
              }catch(err){}
           }
  	   }
	}

	for(var i = 0; i < this.arrResource.length; i++)
	{
		if(this.arrResource[i].name == fileName)
		{   
           if(stop && this.arrResource[i].sound.ended != true && this.arrResource[i].isPlayed != false)
		   {
  		      this.arrResource[i].sound.pause();
		      try{
                  this.arrResource[i].sound.currentTime = 0;    
              }catch(err){}
           }

           this.arrResource[i].sound.play();
           this.arrResource[i].isPlayed = true;
           break;		      	
		}
	}
	return null;
};
