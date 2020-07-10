var NumBase ;
var MaxMS = 500;

function TNumInfo()
{
   this.NumSV  = 0;
   this.MinSN  = 0;
   this.NumTag = true;
};

function TBaseRec() //openhint
{
   this.X;
   this.Y;
   this.S;
};

function TDiedBuf()
{
   this.Top;
   this.Info = [];
   for (var i = 1; i <= MaxMS; i++)
   {
      this.Info[i] = new TBaseRec();
   }   
};

function TMoveRec()
{
   this.Stone;
   this.px;
   this.py;
   this.dx;
   this.dy;
};

function TPutSeq()
{
   this.PutSeq    = [];
   for(var i = 0; i <= MaxMS; i++)
   {
      this.PutSeq[i] = new TMoveRec(); 
   }
};

function TMoveInfo()
{
   this.X;
   this.Y;
   this.Seq;
   this.WCS;
   this.BCS;
   this.Now;
};

function TGoBasic()
{
   var i; 
   this.BSize;
   this.Now;
   this.BCS;
   this.WCS;
   this.Handi;
   this.H3Down;
   this.SeqNo;
   this.DiedBuf = new TDiedBuf();
   this.PutSeq  = new TPutSeq();
   this.Board = [];
   this.MarkB = [];
   for(i = 0; i <= 19; i++)
   {
      this.Board[i] = [];  
   }

   for(i = 0; i <= 19; i++)
   {
      this.MarkB[i] = [];  
   }
}
 
function BasicInit(Size)
{
   var i, j;
   var Basic =  new TGoBasic();

   Basic.Now    = "Black";
   Basic.BCS    = 0;
   Basic.WCS    = 0;
   Basic.BSize  = Size;
   Basic.SeqNo  = 0;
   Basic.Handi  = 0;
   Basic.H3Down = true;
   
   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
           Basic.Board[i][j] = "Empty";   
      }
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
           Basic.MarkB[i][j] = 0;   
      }
   }
        
   Basic.DiedBuf.Top = 0;
   for(i = 0; i <= MaxMS; i++)
   {
      Basic.PutSeq.PutSeq[i].Stone = "Empty";
      Basic.PutSeq.PutSeq[i].px    = -1;
      Basic.PutSeq.PutSeq[i].py    = 0;
      Basic.PutSeq.PutSeq[i].dx    = 0; 
      Basic.PutSeq.PutSeq[i].dy    = 0;
   }
   
   return Basic;
};

function TGoBoard(iMode, iNumInfo, Basic)
{
   var i, j;   
   this.Mode    = iMode;
   this.NumSV   = iNumInfo.NumSV;
   this.MinSN   = iNumInfo.MinSN;
   this.NumTag  = iNumInfo.NumTag;

   this.Now     = Basic.Now;
   this.BSize   = Basic.BSize;
   this.SeqNo   = Basic.SeqNo;
   this.Handi   = Basic.Handi;
   this.H3Down  = Basic.H3Down;
   this.DiedBuf = Basic.DiedBuf;
   this.PutSeq  = Basic.PutSeq;

   this.Board = [];
   for(i = 0; i <= 19; i++)
   {
      this.Board[i] = [];  
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         this.Board[i][j] = Basic.Board[i][j];
      }
   }
   
   this.MarkB = [];
   for(i = 0; i <= 19; i++)
   {
      this.MarkB[i] = [];  
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         this.MarkB[i][j] = Basic.MarkB[i][j];
      }
   }

   this.NowX    = this.PutSeq.PutSeq[0].PX;
   this.NowY    = this.PutSeq.PutSeq[0].PY;
   this.Next    = this.InvertStone(this.Now);
   this.MaxSN   = this.SeqNo;
   this.MaxPut  = this.PutSeq;
   
   this.MarkV;
   this.Next;
   
   this.DieX;
   this.DieY;
   
   this.OnPlay;
   
   this.NowDied = new TStack();
   this.nPreD;
   
   this.Stack = new TStack();
   this.cDied = new TStack();
   this.mvCurrent = 501;
   
}; 

TGoBoard.prototype.InvertStone = function(Ts)
{
   if (Ts == "Black")
   {
      return "White";   
   }
   else
   {
      return "Black";   
   }  
};

TGoBoard.prototype.ResetBoard = function(Size)
{
   var Basic, i, j;

   this.BCS     = 0;
   this.WCS     = 0;
   Basic        = BasicInit(Size);
   this.Now     = Basic.Now;
   this.BSize   = Size;
   this.SeqNo   = Basic.SeqNo;
   this.Handi   = Basic.Handi;
   this.H3Down  = Basic.H3Down;
   this.DiedBuf = Basic.DiedBuf;
   this.PutSeq  = Basic.PutSeq;
   this.Board = [];
   for(i = 0; i <= 19; i++)
   {
      this.Board[i] = [];  
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         this.Board[i][j] = Basic.Board[i][j];
      }
   }
   
   this.MarkB = [];
   for(i = 0; i <= 19; i++)
   {
      this.MarkB[i] = [];  
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         this.MarkB[i][j] = Basic.MarkB[i][j];
      }
   }
   this.NowX    = this.PutSeq.PutSeq[0].PX;
   this.NowX    = this.PutSeq.PutSeq[0].PY;
   this.Next    = this.InvertStone(this.Now);
   this.MaxSN   = this.SeqNo;
   this.MaxPut  = this.PutSeq;
};

TGoBoard.prototype.SetHandi = function(h, d)
{
   this.Handi  = h;
   this.H3Down = d;
   if ((this.Handi > 1) && (this.Handi < 20))
   {
      if (this.BSize == 19)
      {
         this.MarkV = 0;
         if (this.Handi >= 2) {this.TurnStone();}
         if (this.Handi >= 2)
         {
            this.PutStone(16,  4, 'Black');
            this.PutStone( 4, 16, 'Black');
         }
         if (this.Handi >= 3)
         {
            if (this.H3Down) {this.PutStone(16, 16, 'Black');}
            else {this.PutStone( 4,  4, 'Black');}
         }
         if (this.Handi >= 4)
         {
            if (this.H3Down){this.PutStone( 4,  4, 'Black');}  
            else {this.PutStone(16, 16, 'Black');}
         }
         if ((this.Handi == 5) || (this.Handi == 7) || (this.Handi == 9)){this.PutStone(10, 10, 'Black');}

         if (this.Handi >= 6)
         {
            this.PutStone( 4, 10, 'Black');
            this.PutStone(16, 10, 'Black');
         }

         if (this.Handi >= 8)
         {
            this.PutStone(10,  4, 'Black');
            this.PutStone(10, 16, 'Black');
         }

         if (this.Handi >= 10)
         {
            this.PutStone( 7,  7, 'Black');
            this.PutStone( 7, 13, 'Black');
            this.PutStone(13,  7, 'Black');
            this.PutStone(13, 13, 'Black');
         }
      }
      else if (BSize == 13)
      {
         this.MarkV = 0;
         if (this.Handi >= 2) {this.TurnStone();}
         if (this.Handi >= 2)
         {
            this.PutStone(10,  4, 'Black');
            this.PutStone( 4, 10, 'Black');
         }
         if (this.Handi >= 3)
         {
            if (this.H3Down) {this.PutStone(10, 10, 'Black');}
            else {this.PutStone( 4,  4, 'Black');}
         }
         if (this.Handi >= 4)
         {
            if (this.H3Down){this.PutStone( 4,  4, 'Black');}  
            else {this.PutStone(10, 10, 'Black');}
         }
         if ((this.Handi == 5) || (this.Handi == 7) || (this.Handi == 9)){this.PutStone(7, 7, 'Black');}

         if (this.Handi >= 6)
         {
            this.PutStone( 4, 7, 'Black');
            this.PutStone(10, 7, 'Black');
         }

         if (this.Handi >= 8)
         {
            this.PutStone(7,  4, 'Black');
            this.PutStone(7, 10, 'Black');
         }
      }
      else if (BSize == 9)
      {
         this.MarkV = 0;
         if (this.Handi >= 2) {this.TurnStone();}
         if (this.Handi >= 2)
         {
            this.PutStone(7, 3, 'Black');
            this.PutStone(3, 7, 'Black');
         }
         if (this.Handi >= 3)
         {
            if (this.H3Down) {this.PutStone(7, 7, 'Black');}
            else {this.PutStone( 3,  3, 'Black');}
         }
         if (this.Handi >= 4)
         {
            if (this.H3Down){this.PutStone( 3,  3, 'Black');}  
            else {this.PutStone(7, 7, 'Black');}
         }
         if ((this.Handi == 5) || (this.Handi == 7) || (this.Handi == 9)){this.PutStone(5, 5, 'Black');}

         if (this.Handi >= 6)
         {
            this.PutStone( 3, 5, 'Black');
            this.PutStone( 7, 5, 'Black');
         }

         if (this.Handi >= 8)
         {
            this.PutStone(5,  3, 'Black');
            this.PutStone(5,  7, 'Black');
         }
      }
   }
};

TGoBoard.prototype.TurnStone = function()
{
   var temp;
   
   temp      = this.Now;
   this.Now  = this.Next;
   this.Next = temp;
};


TGoBoard.prototype.PutStone = function(x,y,Stone)
{
   this.Board[y][x] = Stone;
   if (this.Mode != 'Back')
   {
     if(this.MarkV == 0){GoBoardBack(x, y, this.MarkV, this.Board[y][x]);}
     else{GoBoardDraw(x, y, this.MarkV, this.Board[y][x]);}
   } 
};

TGoBoard.prototype.PassMove = function()
{
   this.NowX = 0;
   this.NowY = 0;
   this.DieX = 0;
   this.DieY = 0;
   
   this.MarkValue();
   this.AddPutSeq();
   this.TurnStone();
   if (this.Mode == 'Back'){GoBoardInfo(this.NowMoveInfo(), true, true);}
   else{GoBoardInfo(this.NowMoveInfo(), true, false);}
};


TGoBoard.prototype.MarkValue = function()
{
   var PX, PY, Stone;
   PX    = this.PutSeq.PutSeq[this.SeqNo].px;
   PY    = this.PutSeq.PutSeq[this.SeqNo].py;
   Stone = this.PutSeq.PutSeq[this.SeqNo].Stone;
   
   if ((this.Mode != 'Back') && this.NumTag) {this.MarkV = this.SeqNo-this.MinSN+this.NumSV+1;}
   else if (this.Mode != 'Back')
   {
      if (PX > 0)
      {
         if (this.MarkB[PY][PX] > 0)
         {
            if (this.NumTag){this.MarkB[PY][PX] = this.SeqNo-this.MinSN+this.NumSV;} 
            else {this.MarkB[PY][PX] = 0;}

            if (this.Mode != 'Back') 
            {
               if (this.MarkB[PY][PX] == 0) {GoBoardBack(PX, PY, this.MarkB[PY][PX], Stone);}
               else{GoBoardBack(PX, PY, this.MarkB[PY][PX], Stone);}                        
            }
         }
      }    
      this.MarkV = this.mvCurrent;
   }
};

TGoBoard.prototype.AddPutSeq = function()
{
   this.SeqNo                           = this.SeqNo + 1;
   this.PutSeq.PutSeq[this.SeqNo].px    = this.NowX;
   this.PutSeq.PutSeq[this.SeqNo].py    = this.NowY;
   this.PutSeq.PutSeq[this.SeqNo].dx    = this.DieX;
   this.PutSeq.PutSeq[this.SeqNo].dy    = this.DieY;
   this.PutSeq.PutSeq[this.SeqNo].Stone = this.Now;
};

TGoBoard.prototype.NowMoveInfo = function()
{
   var MoveInfo = new TMoveInfo();

   MoveInfo.X   = this.NowX;
   MoveInfo.Y   = this.NowY;
   MoveInfo.Seq = this.SeqNo;
   window.chess = this.SeqNo
   //console.log('this.SeqNo: ', this.SeqNo);
   MoveInfo.WCS = this.WCS;
   MoveInfo.BCS = this.BCS;
   MoveInfo.Now = this.Now;
   return MoveInfo;

};


TGoBoard.prototype.BoardProcess = function(Play, X, Y, Visible)
{
   this.OnPlay  = Play;
   this.DieX    = 0;
   this.DieY    = 0;
   this.NowX    = X;
   this.NowY    = Y;
   this.NowDied.init();
   
   if(this.CanPut())
   {
      this.nPreD = this.NowDied.Top();
      if (this.MinSN > this.SeqNo){this.MinSN = this.SeqNo;}
      this.MarkValue();
      if (Visible) {this.PutnMark(X, Y, this.Now);}
      this.DiedStone();
      this.AddPutSeq();
      this.TurnStone();
      if (this.Mode == 'Back'){GoBoardInfo(this.NowMoveInfo(), true, true);}
      else{GoBoardInfo(this.NowMoveInfo(), true, false);}
   }
   else if (this.Mode != 'Back'){}
   else if (this.IsValidXY(X, Y))
   {
      this.AddPutSeq();
      if (Visible){this.PutStone(X, Y, this.Now);} 
      this.TurnStone();
      GoBoardInfo(this.NowMoveInfo(), true, true);
   }
   this.MaxSN = this.SeqNo;
};


TGoBoard.prototype.IsValidXY = function(x,y) //openhint
{
   if ((x > 0) && (x <= this.BSize) && (y > 0) && (y <= this.BSize)){return true;}
   else{return false;}  
};

TGoBoard.prototype.IsEmpty = function(x,y) //openhint
{
   if (this.IsValidXY(x, y) && (this.Board[y][x] == 'Empty')) {return true;}
   else {return false;}
};


TGoBoard.prototype.CanPut = function() //openhint
{
   var result; 
   if (this.IsEmpty(this.NowX, this.NowY))
   {
     result = true;
      this.Board[this.NowY][this.NowX] = this.Now;
      if (this.KillPut())
      {
         if (this.NowDied.Top() == 1)
         {
            this.DieX   = this.NowDied.TopX();
            this.DieY   = this.NowDied.TopY();
            result      = !this.Repeated();
         }
      }
      else {result = !this.Suicide();}
      this.Board[this.NowY][this.NowX] = 'Empty';
   }
   else {result = false;}
   return result;   
};

TGoBoard.prototype.KillPut = function() //openhint
{
   var x,y,k,NoEsc,CheckB;
   var i, j;

   CheckB = [];
   for(i = 0; i <= 19; i++)
   {
      CheckB[i] = [];   
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         CheckB[i][j] = this.Board[i][j];
      }
   }

   for (k = 1; k <= 4; k++)
   {
       switch(k)
       {
          case 1: y = this.NowY;   x = this.NowX - 1; break;
          case 2: y = this.NowY;   x = this.NowX + 1; break;
          case 3: y = this.NowY-1; x = this.NowX;     break;
          case 4: y = this.NowY+1; x = this.NowX;     break;
       }

       if (this.IsValidXY(x, y) && (CheckB[y][x] == this.Next))
       {
          NoEsc = true;
          this.cDied.init();
          this.Stack.init();
          this.Stack.PushXY(x, y);
          while(NoEsc && (this.Stack.Top() > 0))
          {
             this.Stack.PopXY(x, y);
             x = this.Stack.X;
             y = this.Stack.Y;
             if (CheckB[y][x] == 'Empty'){NoEsc = false;}
             else if (CheckB[y][x] == this.Next)
             {
                this.cDied.PushXY(x, y);
                CheckB[y][x] = 'Check';
                if ((y-1) >      0){this.Stack.PushXY(x, y-1);}
                if ((x-1) >      0){this.Stack.PushXY(x-1, y);}
                if ((y+1) <= this.BSize){this.Stack.PushXY(x, y+1);}
                if ((x+1) <= this.BSize){this.Stack.PushXY(x+1, y);}
             }
          }
          while (this.cDied.Top() > 0)
          {
             this.cDied.PopXY(x, y);
             x = this.cDied.X;
             y = this.cDied.Y;
             if (NoEsc) {this.NowDied.PushXY(x, y);}
             else {CheckB[y][x] = 'Empty';}
          }
       }
   }
   if (this.NowDied.Top() == 0) {return false;}
   else {return true;}
};

TGoBoard.prototype.Repeated = function()
{
   var result;
   result = false;
   if ((this.PutSeq.PutSeq[this.SeqNo].px == this.DieX) && (this.PutSeq.PutSeq[this.SeqNo].py == this.DieY) &&
      (this.PutSeq.PutSeq[this.SeqNo].dx == this.NowX) && (this.PutSeq.PutSeq[this.SeqNo].dy == this.NowY)) {result = true;}
   return result;    
};

TGoBoard.prototype.Suicide = function() //openhint
{
   var x,y,CheckB,result;

   result = true;
   
   CheckB = [];
   for(i = 0; i <= 19; i++)
   {
      CheckB[i] = [];   
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         CheckB[i][j] = this.Board[i][j];
      }
   }

   this.Stack.init();
   this.Stack.PushXY(this.NowX, this.NowY);
   while (result && (this.Stack.Top() > 0))
   {
      this.Stack.PopXY(x, y);
      x = this.Stack.X;
      y = this.Stack.Y;
      if (CheckB[y][x] == 'Empty') {result = false;}
      else if (CheckB[y][x] == this.Now)
      {
         CheckB[y][x] = 'Check';
         if ((y-1) >      0){this.Stack.PushXY(x, y-1);}
         if ((x-1) >      0){this.Stack.PushXY(x-1, y);}
         if ((y+1) <= this.BSize){this.Stack.PushXY(x, y+1);}
         if ((x+1) <= this.BSize){this.Stack.PushXY(x+1, y);}
      }
   }
   return result;// draw stone?
};


TGoBoard.prototype.DiedStone = function()
{
   var x,y;

   if (this.NowDied.Top() > 0)
   {
      if (this.Now == 'Black'){this.BCS = this.BCS + this.NowDied.Top();} 
      else this.WCS = this.WCS + this.NowDied.Top();
      
      while (this.NowDied.Top() > 0)
      {
          this.NowDied.PopXY(x, y);
          x = this.NowDied.X;
          y = this.NowDied.Y;
          this.DiedBuf.Top = this.DiedBuf.Top + 1;
          this.DiedBuf.Info[this.DiedBuf.Top].X = x;
          this.DiedBuf.Info[this.DiedBuf.Top].Y = y;
          this.DiedBuf.Info[this.DiedBuf.Top].S = this.SeqNo;
          this.RemoveXY(x, y);
      }
   }
};

TGoBoard.prototype.RemoveXY = function(x,y)
{
   this.MarkB[y][x] = 0;
   this.Board[y][x] = 'Empty';
   if (this.Mode != 'Back'){GoBoardBack(x, y, 0, 'Empty');}
};

TGoBoard.prototype.Retract = function()
{
   var x,y,n,px,py;
   
   px = this.PutSeq.PutSeq[this.SeqNo].px;
   py = this.PutSeq.PutSeq[this.SeqNo].py;
   
   if ((this.SeqNo > 0) && (px >= 0))
   {
      this.NowX  = px;
      this.NowY  = py;
      this.SeqNo = this.SeqNo - 1;
      if (this.NowX > 0)
      {
         n = 0;
         this.RemoveXY(this.NowX, this.NowY);
         while ((this.DiedBuf.Top > 0) && (this.DiedBuf.Info[this.DiedBuf.Top].S == this.SeqNo))
         {
            n = n + 1;
            x = this.DiedBuf.Info[this.DiedBuf.Top].X;
            y = this.DiedBuf.Info[this.DiedBuf.Top].Y;
            this.DiedBuf.Top = this.DiedBuf.Top - 1;
            if ((this.Mode != 'Back') && this.NumTag) {this.ResetSeqMark(x, y);}
            else {this.MarkV = 0;}
            this.PutnMark(x, y, this.Now);
         }
         if (this.Now == 'Black') {this.WCS = this.WCS - n;}
         else {this.BCS = this.BCS - n;}
         
      }
      this.TurnStone();
      px = this.PutSeq.PutSeq[this.SeqNo].px;
      py = this.PutSeq.PutSeq[this.SeqNo].py;
      this.NowX = px;
      this.NowY = py;
      if (this.Mode != 'Back')
      {
         if (!this.NumTag && (this.NowX > 0)) {this.SetMarkXY(this.NowX, this.NowY, this.mvCurrent);}
         GoBoardInfo(this.NowMoveInfo(), false, false);
      }
   }
   else if (this.Mode != 'Back') {}
};

TGoBoard.prototype.PutnMark = function(x,y,Stone)
{
   this.Board[y][x] = Stone;
   this.SetMarkXY(x, y, this.MarkV);
};

TGoBoard.prototype.ResetSeqMark = function(x,y)
{
   var k;

   k          = this.SeqNo;
   this.MarkV = 0;
   while ((k > this.MinSN) && (this.MarkV == 0))
   {
      if ((this.PutSeq.PutSeq[k].px == x) && (this.PutSeq.PutSeq[k].py == y)) {this.MarkV = k - this.MinSN + this.NumSV;}
      k = k - 1;
   }
};

TGoBoard.prototype.NowSeqNo = function() //open hint
{
   return this.SeqNo;
};
let i = 0;
TGoBoard.prototype.Progress = function()
{
   
   // console.log("====> i", i)
   i++;
   var px,py,result;
   result = false;
   if (this.SeqNo < this.MaxSN)
   {
      result = true;
      px = this.PutSeq.PutSeq[this.SeqNo+1].px;
      py = this.PutSeq.PutSeq[this.SeqNo+1].py;
      if (px == 0){
         this.PassMove();
      } 
      else
      {
         this.DieX    = 0;
         this.DieY    = 0;
         this.NowX    = px;
         this.NowY    = py;
         this.NowDied.init();
         if (this.CanPut())
         {
            this.MarkValue();
            this.PutnMark(this.NowX, this.NowY, this.Now);
            this.DiedStone();
            this.AddPutSeq();
            this.TurnStone();
            GoBoardInfo(this.NowMoveInfo(), true, false);
            // console.log('this.NowMoveInfo(): ', this.NowMoveInfo());
         }
      }
   }
   return result;
};

TGoBoard.prototype.SetMarkXY = function(x,y,MarkV)
{
   this.MarkB[y][x] = MarkV;
   if (this.Mode != 'Back') 
   {
      if(MarkV == 0){GoBoardBack(x, y, MarkV, this.Board[y][x]);}
      else{GoBoardDraw(x, y, MarkV, this.Board[y][x]);}
   }
};


TGoBoard.prototype.SetNumTag = function(Tag)
{
   this.NumTag = Tag;
};

TGoBoard.prototype.SetNumBase = function(NumBase)
{
   this.NumSV   = NumBase.NumSV;
   this.MinSN   = NumBase.MinSN;
   this.NumTag  = NumBase.NumTag;
};

TGoBoard.prototype.GetSeqMarkB = function()
{
   var i,X,Y,result;
   
   result = [];
   for(i = 0; i <= 19; i++)
   {
      result[i] = [];   
   }
   
   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
           result[i][j] = 0;  
      }
   }

   for(i = 1; i <= this.SeqNo; i++)
   {
       X = this.PutSeq.PutSeq[i].px;
       Y = this.PutSeq.PutSeq[i].py;
       if ((X > 0) && (this.Board[Y][X] != 'Empty')){result[Y][X] = i;}
   }

   this.NumSV   = 1;
   this.MinSN   = 1;
   this.NumTag  = true;
   return result;
};


TGoBoard.prototype.GetBasic = function()
{
   var Basic;
   Basic = new TGoBasic();
   
   Basic.Now     = this.Now;
   Basic.BCS     = this.BCS;
   Basic.WCS     = this.WCS;
   Basic.BSize   = this.BSize;
   Basic.SeqNo   = this.SeqNo;
   Basic.Handi   = this.Handi;
   Basic.DiedBuf = this.DiedBuf;
   Basic.PutSeq  = this.PutSeq;
   Basic.Board   = this.Board;
   Basic.MarkB   = this.MarkB;
   return Basic;
};

TGoBoard.prototype.NowMaxSN = function() //openhint
{
   // console.log('TGoBoard: ');

   return this.MaxSN;
};

TGoBoard.prototype.SetBasic = function(Basic, Draw, SMax)
{
   this.Now     = Basic.Now;
   this.BCS     = Basic.BCS;
   this.WCS     = Basic.WCS;
   this.BSize   = Basic.BSize;
   this.SeqNo   = Basic.SeqNo;
   this.Handi   = Basic.Handi;
   this.DiedBuf = Basic.DiedBuf;
   this.PutSeq  = Basic.PutSeq;
   this.Board   = Basic.Board;
   this.MarkB   = Basic.MarkB;
   if (SMax){this.MaxSN = this.SeqNo;}
   this.SetNext();
   if (Draw && (this.SeqNo > 0)){GoBoardDraw(this.PutSeq.PutSeq[this.SeqNo].px, this.PutSeq.PutSeq[this.SeqNo].py, 501, this.Next);}
};

TGoBoard.prototype.SetNext = function()
{
   if (this.Now == 'Black'){this.Next = 'White';}
   else{this.Next = 'Black';} 
};

TGoBoard.prototype.GetPXPY = function(X,Y,S)
{
   var XYS = [];   
   XYS[0] = this.PutSeq.PutSeq[this.SeqNo].px;
   XYS[1] = this.PutSeq.PutSeq[this.SeqNo].py;
   XYS[2] = this.Next;
   
   return XYS;
};

TGoBoard.prototype.SetSBasic = function(Basic)
{
   this.Now     = Basic.Now;
   this.Handi   = Basic.Handi;
   this.DiedBuf = Basic.DiedBuf;
   this.PutSeq  = Basic.PutSeq;
   this.Board   = Basic.Board;
   this.MarkB   = Basic.MarkB;
   this.MaxSN   = this.SeqNo;
};


TGoBoard.prototype.SetMaxSN = function(MxSN)
{
   this.MaxSN = MxSN;
};

TGoBoard.prototype.NowStone = function()
{
   return this.Now;
};

TGoBoard.prototype.CanPutXY = function(X,Y) //openhint
{
   var TmpX,TmpY, result;

   TmpX         = this.NowX;
   TmpY         = this.NowY;
   this.DieX    = 0;
   this.DieY    = 0;
   this.NowX    = X;
   this.NowY    = Y;
   this.NowDied = new TStack();   
   result       = this.CanPut();
   this.NowX    = TmpX;
   this.NowY    = TmpY;
   
   return result;
};
