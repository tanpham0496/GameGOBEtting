function TStack() //openhint
{
   this.N    = 0;
   this.Data = [];
    for(var i = 0; i <= MaxMS; i++)
    {
       this.Data[i] = new TBaseRec();  
    }
    
    this.X;
    this.Y;
};

TStack.prototype.init = function() //openhint
{
   this.N = 0;
};

TStack.prototype.Top = function() //openhint
{
   return this.N; 
};

TStack.prototype.TopX = function()
{
   if(this.N > 0)
   {
      return this.Data[this.N].X;   
   }
   else
   {
      return -1;  
   }  
};

TStack.prototype.TopY = function()
{
   if(this.N > 0)
   {
      return this.Data[this.N].Y;   
   }
   else
   {
      return -1;  
   }  
};

TStack.prototype.SeqNo = function()
{
   if(this.N > 0)
   {
      return this.Data[this.N].S;   
   }
   else
   {
      return -1;  
   }  
};
 
TStack.prototype.Clear = function()
{
   this.N = 0; 
};

TStack.prototype.PopXY = function(x, y)
{
   if(this.N > 0)
   {
      this.X = this.Data[this.N].X;
      this.Y = this.Data[this.N].Y;
      this.N = this.N - 1;
   }
};

TStack.prototype.PushXY = function(x, y)
{
   if(this.N < MaxMS)
   {
      this.N = this.N + 1;
      this.Data[this.N].X = x;
      this.Data[this.N].Y = y;
   }
   else
   {
      this.N = this.N;  
   }
};

TStack.prototype.PopXYS = function(x, y, s)
{
   this.N = this.N + 1;
   this.Data[this.N].X = x;
   this.Data[this.N].Y = y;
   this.Data[this.N].S = s;
};

TStack.prototype.PushXYS = function(x, y, s)
{
   if(this.N > 0)
   {
      this.X = Data[this.N].X;
      this.Y = Data[this.N].Y;
      this.N = Data[this.N].S;
      this.N = this.N - 1;
   }  
};
