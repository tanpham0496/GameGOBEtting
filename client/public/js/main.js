var resourcePreLoader;
var SoundSystem;
var refreshIntervalId, ansIntervalId;

var GoBoard;
var GegaStack; 

var Dump, Sound;
var PSX, PSY, PMark, PStone;
var OnDump;
var FGameInfo;
var GameI;
var MoveP;

var AutoMode, NowMode;
var HintUsage, tmpHintUsage; 
var gibo;

var nAirTxt;
var AirTxtI;

var ULevel;
var nMove;
var DumTitle;

var BackTop;
var BackInfo;

var MBoard;

var TopM, LeftM;
var MMoveGap;
var NumBase;
var SplitS;

var cval;
var gibo_name;

var falseClickCnt;
var falseClickXY;

function TTimeInfo()
{
   this.RTime;
   this.TickC;
   this.TickO;                    
};

function TGameInfo()
{
   this.Game;
   this.Slot;
   this.BSize;
   this.Mode;
   this.RKind;
   this.GKind;
   this.Match;
   this.State;
   this.Handi;
   this.KomiP;
   this.KomiV;
   this.BaseT;
   this.BTime = new TTimeInfo();
   this.WTime = new TTimeInfo();
   this.TimeL;
   this.TickT;
   this.TickC;
   this.NTurn;
   this.Stone;
   this.MoveS;
   this.DiedP;
   this.MoveX;
   this.MoveY;
   this.BDied;
   this.WDied;
   this.WaitC;
   this.GameR;
   this.Ended;
   this.BName;
   this.WName;
   this.Lines;
};

function TGiboInfo()
{
   this.GName;
   this.Round;
   this.GKind;
   this.TimeL;
   this.TickT;
   this.TickO;
   this.Handi;
   this.BTime;
   this.WTime;
   this.ETime;
   this.Maker;
   this.GMemo;
   this.GDate;
   this.Place;
   this.Black;
   this.White;
   this.GameR;
   this.HName;
   this.CName;
   this.LTime;
   this.SRead;
   this.SReadTime;
   this.Dum;
   this.BGrade;
   this.WGrade;
   this.Kind;
   this.Comment;
};

function TOrOT()
{
   this.X;
   this.Y;
   this.S;
};

function TAirTxtI()
{
   this.Text;
   this.SeqN;
   this.Mode;
};


function TBackInfo()
{
   this.Mode;
   this.MaxSN;
   this.Basic;
   
   this.Basic = new TGoBasic();
   // console.log('this.Basic', this.Basic)
};

function Sleep(msecs)
{
   var start = new Date().getTime();
   var cur   = start;
   while(cur - start < msecs)
   {
      cur = new Date().getTime();
   }
};


function onGameInit() //load
{
    var SSE, i;

    Sound  = true;
    Dump   = false;
    OnDump = false;
    SplitS = '\!';
  
    AutoMode  = false;
    NowMode   = "Review";
    HintUsage = true;
    BackTop   = 0;
    nAirTxt   = 0;
    
    loadXGolbal();

    if(isMobile || wh == 'ctab')
    {
       TopM  = 0;
       LeftM = 0;    
    }
    else
    {
       TopM  = 25;
       LeftM = 13;    
    }
    MMoveGap = 5;
    document.title = string[80];
    
    if(wh == 'ctab')
    {
       document.getElementById("btn_replay").innerHTML     = string[125];
       document.getElementById("btn_return").innerHTML     = string[126];
       document.getElementById("btn_order").innerHTML      = string[127];
       document.getElementById("btn_order_end").innerHTML  = string[128];    
    } 
    else
    {
       document.getElementById("btn_replay").innerHTML     = string[117];
       document.getElementById("btn_return").innerHTML     = string[117];
       document.getElementById("btn_order").innerHTML      = string[118];
       document.getElementById("btn_order_end").innerHTML  = string[118];    

       SSE = document.getElementById("secondSE");
    
       for(i = 0; i < 5; i++)
       {
          SSE.options[i] = new Option(i+1+string[135], i+1, false, false ) ;      
       }  
    }     
    
//   refreshIntervalId = setInterval(GameStart, 1000);

  resourcePreLoader = new ResourcePreLoader();
  resourcePreLoader.AddImage("../image/Boardb.bmp"); 
  resourcePreLoader.AddImage("../image/bedge.bmp"); 
  resourcePreLoader.AddImage("../image/gedge.bmp");
    
  for(var i = 10; i <= 59; i++) //
  {
    resourcePreLoader.AddImage("../image/bs40.png");
    resourcePreLoader.AddImage("../image/ws40.png");
  }
    resourcePreLoader.AddImage("../image/bs40.png");
    resourcePreLoader.AddImage("../image/ws40.png");
  
    resourcePreLoader.AddImage("../"+img_folder+"/btn_01.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_01_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_01_dn.png");

    resourcePreLoader.AddImage("../"+img_folder+"/btn_02.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_02_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_02_dn.png");

    resourcePreLoader.AddImage("../"+img_folder+"/btn_auto.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_auto_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_auto_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_bs.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_bs_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_bs_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_ws.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_ws_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_ws_dn.png");

    resourcePreLoader.AddImage("../"+img_folder+"/btn_bws.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_bws_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_bws_dn.png");

    resourcePreLoader.AddImage("../"+img_folder+"/btn_gibo.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_gibo_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_gibo_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_hintoff.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_hintoff_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_hintoff_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_hinton.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_hinton_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_hinton_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_move.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_move_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_move_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_print.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_print_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_print_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_replay.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_replay_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_replay_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_return.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_return_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_return_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_stop.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_stop_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_stop_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/btn_order.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_order_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_order_dn.png");

    resourcePreLoader.AddImage("../"+img_folder+"/btn_order_end.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_order_end_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/btn_order_end_dn.png");

    resourcePreLoader.AddImage("../"+img_folder+"/btn_sound_on.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/btn_sound_off.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/control_back.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/control_back_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/control_back_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/control_ff.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/control_ff_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/control_ff_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/control_last.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/control_last_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/control_last_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/control_play.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/control_play_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/control_play_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/control_rewind.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/control_rewind_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/control_rewind_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/control_start.png"); 
    resourcePreLoader.AddImage("../"+img_folder+"/control_start_up.png");
    resourcePreLoader.AddImage("../"+img_folder+"/control_start_dn.png");
    
    resourcePreLoader.AddImage("../"+img_folder+"/nophoto.gif");    
  
  SoundSystem = new SoundSystem();
  SoundSystem.AddSound("../sound/toc.mp3");

  FGameInfo   = new TGameInfo();
  GameI       = new TGiboInfo();
  MoveP       = [];
  for(var i = 1; i <= 500; i++)
  {
     MoveP[i] = new TOrOT();  
  }
  
    falseClickCnt = 0;
    falseClickXY = [];
  for(var i = 1; i <= 361; i++)
  {
     falseClickXY[i] = new TOrOT(); 
  }
  
  AirTxtI = [];
  for(var i = 1; i <= 2000; i++)
  {
     AirTxtI[i] = new TAirTxtI(); 
  }
  
  BackInfo = [];
  for(var i = 0; i <= 10; i++)
  {
     BackInfo[i] = new TBackInfo(); 
  }
  
  MBoard = [];
    for(i = 0; i <= 19; i++)
    {
       MBoard[i] = [];  
    }
  
  DumTitle = 1;
  
  cval = getCookie("gibo_sound");
  
    if(isMobile || wh == 'ctab'){cval = "off";} 
  
  if(cval == "" || cval =="on"){document.getElementById("gibo_sound").src  = resourcePreLoader.GetImage('../'+img_folder+'/btn_sound_on.png').src;}    
  else {document.getElementById("gibo_sound").src  = resourcePreLoader.GetImage('../'+img_folder+'/btn_sound_off.png').src;}
  
//   window.onmousewheel = function(e){wheel(e);}

};

function onLoadImageResourceComplete()
{
  resourcePreLoader.nowResourceLoaderedCount++;

  if(resourcePreLoader.nowResourceLoaderedCount == resourcePreLoader.intAllResourceCount)
  {
    resourcePreLoader.isLoadComplete = true;
  }
};

function onLoadSoundComplete()
{ 
  SoundSystem.nowResourceLoaderedCount++;

  if(SoundSystem.nowResourceLoaderedCount == SoundSystem.intAllResourceCount)
  {
    SoundSystem.isLoadComplete = true;
  }
};

function onGameResize()
{
  pbBoard.resizeCanvas();
};

function GameStart(gibo) //load
{

   if(resourcePreLoader.isLoadComplete && SoundSystem.isLoadComplete)
  if(resourcePreLoader.isLoadComplete)
  {
     // console.log('resourcePreLoader.isLoadComplete',resourcePreLoader.isLoadComplete);
    clearInterval(refreshIntervalId);
      var theCanvas = document.getElementById("board");
      // pbBoard       = new TOrOGoPB(theCanvas, resourcePreLoader.GetImage("../image/Boardb.bmp"));
      pbBoard       = new TOrOGoPB(theCanvas, resourcePreLoader.GetImage("../image/Boardb.bmp"), resourcePreLoader.GetImage("../image/bedge.bmp"));
      if(wh == 'ctab'){pbBoard.SetXYMarkG(0);}
      pbBoard.resizeCanvas();
      window.addEventListener('resize', onGameResize, false);
        NumBase   = new TNumInfo();
      //   console.log('NumBase', NumBase)
        GoBoard   = new TGoBoard("Base", NumBase, BasicInit(19));
      //   console.log('GoBoard', GoBoard)
        GegaStack = new TStack();
       
         //   gibo      = document.getElementById("gibo_txt").value;
         //   console.log('gibo: ', gibo);
          
           
          
        ULevel    = document.getElementById("level").value;
        //gibo_name = document.getElementById("gibo").value;
      //   console.log('gibo_name: ', gibo_name);
        
        //if(gibo_name.substr(-3).toLowerCase() == 'sgf'){
           DecodeSGFFile(gibo);
         //}
      //   else if(gibo_name.substr(-3).toLowerCase() == 'ngf'){DecodeNGFFile(gibo);}
      //   else if(gibo_name.substr(-3).toLowerCase() == 'ugf'){DecodeUGFFile(gibo);}

      //  var IntervalId =   setInterval(() => {
      
      //   var statusInterval =  GoBoard.Progress();
      //   if(!statusInterval){
      //      clearInterval(IntervalId)
      //   }
      // }, 100)

  }
};

function DecodeSGFFile(rgibo)
{
   var c, index, Fail, Ended, Token, Value, i, P, Mode, Kind, rnE;
   
   Mode          = 0;
   Fail          = false;
   nMove         = 12;
   GameI.GName   = "";
   GameI.Handi   = 0;
   GameI.Comment = '';
   index         = 0;
   Ended         = false;
   Token         = '';
   GameI.Lines   = 19;
   do
   {
      // console.log('nMove: ', nMove);
      // console.log('Mode: ', Mode);
      c = rgibo[index];
      // if(!c){
      //    Ended = true; 
      // }
      // console.log('c: ', c);
      // console.log('index: ', index);
      switch(Mode){
      case 0 : if(c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90)
               {
                  Mode = 1;
                  Token = Token + c;
               }
               else if(c == ";")
               {
                  Mode = 2; 
               } 
               else if(c == "(" || c.charCodeAt(0) == 13 || c.charCodeAt(0) == 10)
               {
 
               } 
               else if(c == ")")
               {
                  Ended = true; 
                  console.log('Ended: ', Ended);
               } 
               else
               {
                  Token = ""; 
               }
               break; 
      case 1 : if(c == '[')
               {
                  Mode  = 5;
                  Value = '';
                  if (Token == 'C')
                  {
                     Mode = 3;  
                  }  
                  else if (Token == 'RN')
                  {
                     Mode = 4;
                     rnE  = 0;
                  } 
                  else if ((Token == 'TE') || (Token == 'EV')) {Kind = 1;}
                  else if (Token == 'GN') {Kind = 1;}
                  else if (Token == 'GD') {Kind = 1;}
                  else if (Token == 'GH') {Kind = 1;}
                  else if (Token == 'RD') {Kind = 2;}
                  else if (Token == 'DT') {Kind = 2;}
                  else if (Token == 'PC') {Kind = 3;}
                  else if (Token == 'PB') {Kind = 4;}
                  else if (Token == 'PW') {Kind = 5;}
                  else if (Token == 'RE') {Kind = 6;}
                  else if (Token == 'TM') {Kind = 7;}
                  else if (Token == 'LT') {Kind = 8;}
                  else if (Token == 'LC') {Kind = 9;}
                  else if (Token == 'KO') {Kind = 10;}
                  else if (Token == 'BR') {Kind = 11;}
                  else if (Token == 'WR') {Kind = 12;}
                  else if (Token == 'GK') {Kind = 13;}
                  else if (Token == 'TC') {Kind = 14;}
                  else if (Token == 'HD') {Kind = 15;}
                  else if (Token == 'LN') {Kind = 16;}
                  Token = '';
               } 
               else if(c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90)
               {
                  Token = Token + c;
               }
               else
               {
                  Fail = true;  
               }
               break; 
               
      case 2 : if(c == 'B' || c == 'W') {Token = c;}
               else if(c =='E'){Token = c; Mode = 1;}
               else if(c == "[")
               {
                  if (Token == 'B' || Token == 'W'){Value = '';}
                  else if (Token.length >= 2)
                  {
                     Token = Token + c;
                     Mode  = 5;
                     Value = "";
                        if (Token == 'C'){Mode = 3;}
                        else if(Token == 'RN')
                        {
                           Mode = 4;
                           rnE  = 0;  
                        } 
                     else if ((Token == 'TE') || (Token == 'EV')) {Kind = 1;}
                     else if (Token == 'GN') {Kind = 1;}
                     else if (Token == 'GD') {Kind = 1;}
                     else if (Token == 'GH') {Kind = 1;}
                     else if (Token == 'RD') {Kind = 2;}
                     else if (Token == 'DT') {kind = 2;}
                     else if (Token == 'PC') {Kind = 3;}
                     else if (Token == 'PB') {Kind = 4;}
                     else if (Token == 'PW') {Kind = 5;}
                     else if (Token == 'RE') {Kind = 6;}
                     else if (Token == 'TM') {Kind = 7;}
                     else if (Token == 'LT') {Kind = 8;}
                     else if (Token == 'LC') {Kind = 9;}
                     else if (Token == 'KO') {Kind = 10;}
                     else if (Token == 'BR') {Kind = 11;}
                     else if (Token == 'WR') {Kind = 12;}
                     else if (Token == 'GK') {Kind = 13;}
                     else if (Token == 'TC') {Kind = 14;}
                     else if (Token == 'HD') {Kind = 15;}
                     else if (Token == 'LN') {Kind = 16;}                        
                     Token = '';
                  }
                  else{Token = Token + c;}   
               }
               else if(c.charCodeAt(0) >= 96 && c.charCodeAt(0) <= 122){Value = Value + c;}
               else if(c == ']')
               {
                  if(Value.length == 2 && Value[0].charCodeAt(0) >= 96 && Value[0].charCodeAt(0) <= 122
                     && Value[1].charCodeAt(0) >= 96 && Value[1].charCodeAt(0) <= 122)
                  {
                     Mode = 0;
                     nMove = nMove + 1;

                     MoveP[nMove].X = Value[0].charCodeAt(0) - 96;
                     MoveP[nMove].Y = Value[1].charCodeAt(0) - 96;
                     if (Token == 'B'){MoveP[nMove].S = 0;}
                     else {MoveP[nMove].S = 1;}
                     Token = '';
                     Value = '';
                  }
                  else if(Value.length < 2){Fail = false;}
                  else {Fail = false;}   
               }
               break;
               
      case 3 : if(c == "["){}
               else if(c == ']')
               {
                  nAirTxt               = nAirTxt + 1;
                  AirTxtI[nAirTxt].SeqN = nMove;
                  AirTxtI[nAirTxt].Text = '[' + nMove.toString() + '] ' + Value;
                  AirTxtI[nAirTxt].Mode = 1;
                  Mode                  = 0;
                  Token                 = '';
                  Value                 = '';
               }
               else{Value = Value + c;}
               break;
               
      case 4 : if(c == "(")
               {
                  rnE   = rnE + 1;  
                  Value = Value + c;
               }
               else if(c == ')')
               {
                  rnE = rnE - 1;
                  if (rnE == -1)
                  {
                     nAirTxt               = nAirTxt + 1;
                     AirTxtI[nAirTxt].SeqN = nMove;
                     AirTxtI[nAirTxt].Text = DecodeVar(Value);
                     AirTxtI[nAirTxt].Mode = 2;
                     Mode                  = 0;
                     Token                 = '';
                     Value                 = '';
                  }
                  else {Value = Value +c;} 
               }
               else{Value = Value + c;}
               break;
               
      case 5 : if(c == '['){}
               else if(c == ']')
               {
                  Mode = 0;
                  switch(Kind){
                     case 1 : GameI.GName     = GameI.GName + Value; break;
                     case 2 : GameI.GDate     = Value; break;
                     case 3 : GameI.Place     = Value; break;
                     case 4 : GameI.Black     = Value; break;
                     case 5 : GameI.White     = Value; break;
                     case 6 : GameI.GameR     = Value; break;
                     case 7 : GameI.LTime     = Value; break;
                     case 8 : GameI.SRead     = Value; break;
                     case 9 : GameI.SReadTime = Value; break;
                     case 10: GameI.Dum       = Value; break;
                     case 11: GameI.BGrade    = Value; break;
                     case 12: GameI.WGrade    = Value; break;
                     case 13: GameI.Kind      = Value; break;
                     case 14: GameI.Comment   = Value; break;
                     case 15: GameI.Handi     = Value; break;
                     case 16: GameI.Lines     = Value; break;                     
                  } 
                  Kind = 0;
               }
               else{Value = Value + c;}
               break;
      }  
       
   index = index + 1;
   }while((index + 1 < rgibo.length) && !Fail);
   
   if ((GameI.Kind != '1') && ((ULevel == '0') || (ULevel == '2')))
   {
      GameI.Comment = string[8];
   }   
   
   if (!Fail || Ended){SetViewFile();}
   return !Fail;
};

function DecodeVar(Value)
{
   var c,i,k,l,M,nM,nP,sP,MP,VP,V,T,H,result;
   
   VP = [];
   MP = [];
   for(i = 1; i <= 400; i++)
   {
     VP[i] = new TOrOT(); 
     MP[i] = new TOrOT();
   }
  
   M  = 0;
   nM = 0;
   nP = 0;
   T  = '';
   H  = '';
   V  = '';
   i  = 0;
   k  = 0;
   l  = Value.length;
   
   while(i + 1 <= l)
   {
      c = Value[i];
      switch(M){
         case 0 : if (c == ']'){M = 1;} break;
         case 1 : if(c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90){T = T + c;} 
                  else if(c == '[')
                  {
                     if (T == 'PT')
                     {
                         M = 2;
                         T = '';
                         V = '';
                     }    
                  }
                  else{i = l - 1;}
                  break;
         case 2 : if(c >= 0 && c <= 9){V = V + c;} 
                  else if(c == ']')
                  {
                        M  = 3;
                        sP = V;
                        V  = '';
                  }
                  else{i = l - 1;}
                  break;
         case 3 : if (c == ';')  {M = 4;}
                  else if (c == 'C') {M = 5;}
                  else if (c == ')') {M = 0;}
                  else {i = l - 1;} 
                  break;
         case 4 : if (c == 'B' || c == 'W' || c == 'L') {T = c;}
                  else if (c == '[') {V = '';}
                  else if (c.charCodeAt(0) >= 96 && c.charCodeAt(0) <= 122) {V = V + c;}
                  else if (c == ']')
                  {
                     if (V != '' && V[0].charCodeAt(0) >= 96 && V[0].charCodeAt(0) <= 122
                     && V[1].charCodeAt(0) >= 96 && V[1].charCodeAt(0) <= 122) 
                     {
                        if (T == 'L')
                        {
                           nP       = nP + 1;
                           VP[nP].X = V[0].charCodeAt(0) - 96;
                           VP[nP].Y = V[1].charCodeAt(0) - 96;
                           VP[nP].S = V[2].charCodeAt(0) - 97;
                           M        = 3;
                           T        = '';
                           V        = '';
                        }                                         
                        else
                        {
                           k = k + 1;
                           if (k >= sP)
                           {
                              nM       = nM + 1;
                              MP[nM].X = V[0].charCodeAt(0) - 96;
                              MP[nM].Y = V[1].charCodeAt(0) - 96;
                              if (T == 'B'){MP[nM].S = 0;}
                              else{MP[nM].S = 1;}
                           }
                           M = 3;
                           T = '';
                           V = '';
                        }
                     }
                     else{i = l - 1;}
                  }
                  break;

         case 5 : if (c == '[')  {}
                  else if (c == ']')
                  {
                     H = V;
                     M = 3;
                     T = '';
                     V = '';
                  }
                  else {V = V + c;} 
                  break;
         }
         i = i + 1;
      }
      
      if (nM == 0){result = '';}
      else
      {
         result = Int2Str(sP) + Int2Str(nM);

         for(i = 1; i <= nM; i++)
         {
            result = result + String.fromCharCode(65 + MP[i].X) + String.fromCharCode(65 + MP[i].Y);
         } 
         if (nP > 0)
         {
            result = result + SplitS + Int2Str(nP);
            for(i = 1; i <= nP; i++)
            {
               result = result + String.fromCharCode(65 + VP[i].X) + String.fromCharCode(65 + VP[i].Y) + (600 + VP[i].S).toString();
            }
         }    
         else{result = result + SplitS;}
         result = result + SplitS + H;
      }

      return result;
};

function Int2Str(val)
{
  return String.fromCharCode(65 + parseInt(val / 26)) + String.fromCharCode(65 + (val % 26));
};

function DecodeNGFFile(rgibo)
{
   var S, tempS, value;
   var H, M, i;

   GameI.GName = ReadLine();
   GameI.Lines = ReadLine();
   S = ReadLine();
   GameI.White = S.substr(0,S.indexOf(' '));

   S = S.substr(S.indexOf(' '), S.length);
   value = '';
   for(i = 0; i <= S.length - 1; i++)
   {
      if ((S[i] != ' ') && (S[i] != '*')){value = value + S[i];} 
   }
   GameI.WGrade = value;

   S = ReadLine();
   GameI.Black = S.substr(0,S.indexOf(' '));

   S = S.substr(S.indexOf(' '), S.length);
   value = '';
   for(i = 0; i <= S.length - 1; i++)
   {
      if ((S[i] != ' ') && (S[i] != '*')){value = value + S[i];} 
   }
   GameI.BGrade = value;

   GameI.Place = ReadLine();
   GameI.Handi = ReadLine();
   S           = ReadLine();
   if ((S == '0') || (S == ''))
   {
      GameI.SRead     = '30';
      GameI.SReadTime = '3';
   }
   else
   {
      GameI.SRead     = S.substr(0,S.indexOf(' '));
      GameI.SReadTime = S.substr(S.indexOf(' ')+1,S.length-S.indexOf(' ')+1);
   }

   S = ReadLine();
   if(S == '0'){GameI.Dum = string[9];}
   else{GameI.Dum = S + '.5';}

   S = ReadLine();
   if (S.indexOf('-') == 6){GameI.GDate = S.substr(2, S.length-2);}
   else{GameI.GDate = S;}

   S = ReadLine();
   if (S == '599'){GameI.LTime = string[10];}
   else
   {
      H = parseInt(S / 60);
      M = S % 60;
      if (H == 0){GameI.LTime = M + string[11];}
      else
      {
         if (M == 0){GameI.LTime = H + string[12];}
         else{GameI.LTime = H + string[12] + M + string[11];}
      }
   }

   S     = ReadLine();
   value = '';

   for (i = 0; i <= S.length - 1; i++)
   {
      if (S[i] != '>'){value = value + S[i];}
      else{break;}
   }
   GameI.GameR = value;

   nMove = ReadLine();

   for (i = 1; i <= nMove; i++)
   {
      S = ReadLine();
      if (S.substr(4,1) == 'B'){MoveP[i].S = 0;}
      else{MoveP[i].S = 1;} 

      tempS = S.substr(5, 1);
      MoveP[i].X = tempS.charCodeAt(0) - 65;
      tempS = S.substr(6, 1);
      MoveP[i].Y = tempS.charCodeAt(0) - 65; 
   }
   SetViewFile();
};

function DecodeUGFFile(rgibo)
{
   var S, tempS, value;
   var H, M, i;

   ReadLine();
   ReadLine();
   ReadLine();
   ReadLine();
   ReadLine();

   S           = ReadLine();
   GameI.GName = S.substr(6,S.length);
   
   S           = ReadLine();
   GameI.Place = S.substr(6,S.length);

   S           = ReadLine();
   GameI.GDate = S.substr(5, S.indexOf(',') - 5);

   ReadLine();
   ReadLine();

   S           = ReadLine();
   GameI.Handi = S.substr(5,1);
   GameI.Dum   = S.substr(7,S.length);

   S     = ReadLine();
   tempS = S.substr(7, S.indexOf(';')-7);

   H = parseInt(tempS / 60);
   M = tempS % 60;
   if (H == 0){GameI.LTime = M + string[11];}
   else
   {
      if (M == 0){GameI.LTime = H + string[12];}
      else{GameI.LTime = H + string[12] + M + string[11];}
    }

   S     = S.substr(S.indexOf(';')+1, S.length);
   tempS = S.substr(0, S.indexOf(';'));

   if (tempS == '0')
   {
      GameI.SReadTime = '10' + string[19];
   }
   else
   {
      GameI.SReadTime = tempS  + string[19];
   }

   S            = S.substr(S.indexOf(';')+1, S.length);
   GameI.SRead  = S.substr(0,S.indexOf(','))  + string[18];

   S     = ReadLine();
   tempS = S.substr(7, 1); 

   if (tempS == 'B') {GameI.GameR = string[73];}
   else {GameI.GameR = string[74];}

   tempS = S.substr(9, 1);

   if (tempS == 'T') {GameI.GameR = GameI.GameR + string[75];}
   else if (tempS == 'C') {GameI.GameR = GameI.GameR + string[76];}
   else if (tempS == 'F') {GameI.GameR = GameI.GameR + string[77];}
   else {GameI.GameR = GameI.GameR + S.substr(S.indexOf(',')+1,S.length) + string[78];}

   S = ReadLine();
   nMove = S.substr(6, S.length);

   ReadLine();
   ReadLine();
   ReadLine();

   S           = ReadLine();
   GameI.White = S.substr(7,S.indexOf(',')-7);

   S            = S.substr(S.indexOf(',')+1, S.length);
   GameI.WGrade = S.substr(0,S.indexOf(','));


   S           = ReadLine();
   GameI.Black = S.substr(7,S.indexOf(',')-7);

   S            = S.substr(S.indexOf(',')+1, S.length);
   GameI.BGrade = S.substr(0,S.indexOf(','));

   ReadLine();

   for (i = 1; i <= nMove; i++)
   {
      S = ReadLine();
      if (S.substr(3,1) == 'B'){MoveP[i].S = 0;}
      else{MoveP[i].S = 1;} 

      tempS = S.substr(0, 1);
      MoveP[i].X = tempS.charCodeAt(0) - 64;
      tempS = S.substr(1, 1);
      MoveP[i].Y = tempS.charCodeAt(0) - 64; 
   }

   GameI.Lines = 19;

   SetViewFile();
};

function ReadLine()
{
   var value, index;

   value = '';
   index = 0;
   
   while (gibo[index] != '\n')
   {
      value = value + gibo[index];
      index = index + 1;
   }
   
   gibo = gibo.substr(index+1, gibo.length);  
   return value;
};


function GoBoardDraw(X, Y, Mark, Stone)
{
   if (!Dump && Sound && Stone != 'Empty' && cval != 'off')
   {
      SoundSystem.PlaySound("../sound/toc.mp3", true, false); 
   }
   
   PSX    = X;
   PSY    = Y;
   PMark  = Mark;
   PStone = Stone;
   pbBoard.DrawStone(Stone,X,Y,Mark);
};

function GoBoardBack(X, Y, Mark, Stone)
{
   if(OnDump)
   {
      return; 
   }
   
   pbBoard.DrawStone(Stone,X,Y,Mark);
};

function GoBoardInfo(MoveInfo, Move, Back)
{
   if(OnDump)
   {
      return; 
   }
   if(!Back)
   {
      if (MoveInfo.X < 0)
      {
         FGameInfo.MoveX = 0; 
      }
      else
      {
         FGameInfo.MoveX = MoveInfo.X;  
      } 
                          
      FGameInfo.MoveY = MoveInfo.Y;
      FGameInfo.BDied = MoveInfo.WCS;
      FGameInfo.WDied = MoveInfo.BCS;
      
      if(isMobile)
      {
        document.getElementById("WDied").innerHTML = FGameInfo.WDied;        
        document.getElementById("BDied").innerHTML = FGameInfo.BDied;
         SetNowSN(GoBoard.NowSeqNo());
      }
      else
      {
         if(wh == 'ctab')
         {
            player.rows[0].cells[2].innerHTML = string[130] + ' ' + FGameInfo.WDied;
            player.rows[1].cells[2].innerHTML = string[130] + ' ' + FGameInfo.BDied;
            
            document.getElementById("nowSN").innerHTML = string[131] + ' ' + GoBoard.NowSeqNo() + string[116];
         }   
         else
         {
            if(nation == 6)
            {
               player_eng.rows[0].cells[0].innerHTML = FGameInfo.WDied;
               player_eng.rows[2].cells[0].innerHTML = FGameInfo.BDied;
            } 
            else
            {
               player.rows[0].cells[3].innerHTML = FGameInfo.WDied;
               player.rows[2].cells[3].innerHTML = FGameInfo.BDied;
            }             
         }           
      }
   }
};

function SetNowSN(sn)
{
   document.getElementById("nowSN").innerHTML = sn + string[116];
};


// function pbBoardMouseDown(Button, X, Y)
// {
//    if(AutoMode){AutoMode = false;} 

//    switch(NowMode){
//       case "MakeVar" : if(Button == 0)
//                        {
//                           Sound = true;
//                           GoBoard.BoardProcess(false, X, Y, true);  
//                        }
//                        else
//                        {
//                           Sound = false;
//                           GoBoard.Retract();
//                        }     
//                        break;   
//       case "Review"  : if(Button == 0)
//                        {
//                           Sound = true;
//                           if(!GoBoard.Progress())
//                           {
//                              alert(string[1]);  
//                           }
//                        }
//                        else
//                        {
//                           Sound = false;
//                           GoBoard.Retract();
//                        }     
//                        SetNowHelpText();
//                        break;
                       
//       case "AnswerB"    :
//       case "AnswerW"    :
//       case "AnswerBoth" :
//          console.log('AnswerBoth: ');
//                       tmpHintUsage = HintUsage;
//                       if(Button == 0)
//                       {
//                          if(GoBoard.IsEmpty(X, Y))
//                          {
//                             Sound = true;
                         
//                             if(GoBoard.NowSeqNo() == GoBoard.NowMaxSN())
//                             {
//                                alert(string[1]);
//                                return;
//                             } 
                         
//                             if(GoBoard.PutSeq.PutSeq[GoBoard.NowSeqNo()+1].px == X && GoBoard.PutSeq.PutSeq[GoBoard.NowSeqNo()+1].py == Y)
//                             {
//                                if(HintUsage){EraserHint();}
//                                EraserFalseClick();
//                              GoBoard.Progress();
//                              ansIntervalId = setInterval(Progress, 500);
//                              return;
//                             }
//                             else
//                             {
//                                ShowFalseClick(X, Y);                              
//                             }
//                          }
//                       }
//                       else
//                       {
//                          alert(string[4]+"\n\n"+string[5]);                   
//                       }
//                       SetNowHelpText();
//                       break;
//    } 
// };

function Progress()
{
   console.log('Progress: ');
   if ((GoBoard.NowSeqNo() < GoBoard.NowMaxSN()) && (((NowMode == "AnswerB") && (GoBoard.NowStone() != "Black")) || ((NowMode == "AnswerW") && (GoBoard.NowStone() != "White")) ||
      ((NowMode == "AnswerBoth") && (GoBoard.NowStone() != "Black") && (GoBoard.NowStone() != "White"))))     
      {
      GoBoard.Progress(); 
   }
   else
   {
      clearInterval(ansIntervalId);
      SetNowHelpText();
      if (tmpHintUsage){ShowHint();} 
      if(GoBoard.NowSeqNo() == GoBoard.NowMaxSN()){alert(string[1]);}
   }
};

function SetViewFile()
{
   var i,j, init, minfo;

   FGameInfo.WaitC       = 0;
   FGameInfo.Handi       = GameI.Handi;
   FGameInfo.KomiP       = 0;
   FGameInfo.KomiV       = 6;
   FGameInfo.TickC       = 3;
   FGameInfo.TickT       = 60;
   FGameInfo.BaseT       = 0;
   FGameInfo.MoveS       = nMove;
   FGameInfo.TimeL       = 0;
   FGameInfo.BTime.RTime = 0;
   FGameInfo.BTime.TickO = false;
   FGameInfo.BTime.TickC = 3;
   FGameInfo.WTime.RTime = 0;
   FGameInfo.WTime.TickO = false;
   FGameInfo.WTime.TickC = 3;
   
   init = [];

   for(i = 0; i <= 19; i++)
   {
      init[i] = [];     
   }

   for(i = 0; i <= 19; i++)
   {
      for(j = 0; j <= 19; j++)
      {
         init[i][j] = "Empty";      
      }
   }

   GoBoard.ResetBoard(GameI.Lines);
   pbBoard.SetBoard(init,GameI.Lines);
   GoBoard.SetHandi(FGameInfo.Handi, false);
   
   if(isMobile)
   {
      document.getElementById("mtitle").innerHTML   = GameI.GName;
      if(nation != 6)
      {
         document.getElementById("mplacet").innerHTML  = '<b>' + string[120] + '</b>';
         document.getElementById("mplace").innerHTML   = GameI.Place;          
      }         

      minfo = ''; 
      minfo = GameI.GName + '<br>';
      minfo = minfo + '<strong><img src="../'+img_folder+'/bs.png" width="16" height="16"> '+ GameI.Black + ' vs ' + GameI.White + ' <img src="./'+img_folder+'/ws.png" width="16" height="16"></strong><br>';
      minfo = minfo + GameI.GDate + '<br>';          
      minfo = minfo + GameI.GameR;           
      document.getElementById("info").innerHTML = minfo;  
      document.getElementById("mtimet").innerHTML   = '<b>' + string[16] + '</b>';          
      document.getElementById("mtime").innerHTML    = GameI.LTime;      
      document.getElementById("secondt").innerHTML  = '<b>' + string[17] + '</b>';         
      if(nation == 3){document.getElementById("second").innerHTML   = GameI.SRead + '&nbsp;' + GameI.SReadTime;}
      else           {document.getElementById("second").innerHTML   = GameI.SRead + string[18] + '&nbsp;' + GameI.SReadTime + string[19];}
        
      if (GameI.Handi == 0){DumTitle = 1;}
      else if (GameI.Handi == 1)
      {
         DumTitle  = 2;
         GameI.Dum = string[20];
      }
      else
      {
         DumTitle  = 2;
         GameI.Dum = GameI.Handi.toString() + string[21];
      }  
 
      if (DumTitle == 1)
      {
         document.getElementById("mdumt").innerHTML = '<b>' + string[22] + '</b>';
      } 
      else
      {
         document.getElementById("mdumt").innerHTML = '<b>' + string[23] + '</b>';        
      }
      document.getElementById("mdum").innerHTML = GameI.Dum;
   }
   else
   {
      if(nation == 1)
      {
         if(wh == 'ctab')
         {
            document.getElementById("game_title").innerHTML   = GameI.GName;
            document.getElementById("date_title").innerHTML   = string[129] + '&nbsp;' + string[14];
            document.getElementById("date_val").innerHTML     = GameI.GDate;
            document.getElementById("place_title").innerHTML  = string[129] + '&nbsp;' + string[15];
            document.getElementById("place_val").innerHTML    = GameI.Place;
            document.getElementById("time_title").innerHTML   = string[129] + '&nbsp;' + string[16];
            document.getElementById("time_val").innerHTML     = GameI.LTime;
            document.getElementById("second_title").innerHTML = string[129] + '&nbsp;' + string[17];
            document.getElementById("second_val").innerHTML   = GameI.SRead + string[18] + '&nbsp;' + GameI.SReadTime + string[19];
         }  
         else
         { //add infomation from .sgf
            MInfo.rows[0].cells[0].innerHTML = GameI.GName;
            MInfo.rows[1].cells[0].innerHTML = string[13] + '&nbsp;' + string[14] + ' : ' + GameI.GDate + '<br>';
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[15] + ' : ' + GameI.Place + '<br>';
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[16] + ' : ' + GameI.LTime + '<br>';
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[17] + '&nbsp; : ' + GameI.SRead + string[18] + '&nbsp;' + GameI.SReadTime + string[19] + '<br>';
         }           

         if (GameI.Handi == 0){DumTitle = 1;}
         else if (GameI.Handi == 1)
         {
            DumTitle  = 2;
            GameI.Dum = string[20];
         }
         else
         {
            DumTitle  = 2;
            GameI.Dum = GameI.Handi.toString() + string[21];
         }  
 
         if(wh == 'ctab')
         {
            if (DumTitle == 1)
            {
               document.getElementById("dum_title").innerHTML   = string[129] + '&nbsp;' + string[22];
               document.getElementById("dum_val").innerHTML     = GameI.Dum;
            } 
            else
            {
               document.getElementById("dum_title").innerHTML   = string[129] + '&nbsp;' + string[23];
               document.getElementById("dum_val").innerHTML     = GameI.Dum;
            }
            document.getElementById("result_title").innerHTML   = string[129] + '&nbsp;' + string[24];
            document.getElementById("result_val").innerHTML     = GameI.GameR;
         }  
         else
         {
            if (DumTitle == 1)
            {
               MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[22] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Dum + '<br>';     
            } 
            else
            {
               MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[23] + '&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Dum + '<br>';
            }
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[24] + ' : ' + GameI.GameR;
         }           
      }
      else if(nation == 2)
      {
         if (GameI.Place.length > 13){GameI.Place = GameI.Place.substr(0, 11) + '...';}
    
         MInfo.rows[0].cells[0].innerHTML = GameI.GName;
         MInfo.rows[1].cells[0].innerHTML = string[13] + '&nbsp;' + string[14] + ' : ' + GameI.GDate + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[15] + ' : ' + GameI.Place + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[16] + ' : ' + GameI.LTime + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[17] + ' : ' + GameI.SRead + string[18] + '&nbsp;' + GameI.SReadTime + string[19] + '<br>';

         if (GameI.Handi == 0){DumTitle = 1;}
         else if (GameI.Handi == 1)
         {
            DumTitle  = 2;
            GameI.Dum = string[20];
         }
         else
         {
            DumTitle  = 2;
            GameI.Dum = '7.5' + string[21];
         }

         if (DumTitle == 1)
         {
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[22] + ' : ' + GameI.Dum + '<br>';    
         } 
         else
         {
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[23] + ' : ' + GameI.Dum + '<br>';
         }
   
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[24] + ' : ' + GameI.GameR;
      }
      else if(nation == 3)
      {
         MInfo.rows[0].cells[0].innerHTML = GameI.GName;
         MInfo.rows[1].cells[0].innerHTML = string[13] + '&nbsp;' + string[14] + '&nbsp;&nbsp; : ' + GameI.GDate + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[15] + ' : ' + GameI.Place + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[16] + ' : ' + GameI.LTime + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[17] + '&nbsp;&nbsp; : ' + GameI.SRead + '&nbsp;' + GameI.SReadTime + '<br>';
  
         if (GameI.Handi == 0){DumTitle = 1;}
         else if (GameI.Handi == 1)
         {
            DumTitle  = 2; 
            GameI.Dum = string[20];
         }
         else
         {
            DumTitle  = 2;
            GameI.Dum = GameI.Handi.toString() + string[21];
         }

         if (DumTitle == 1)
         {
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[22] + '&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Dum + '<br>';    
         } 
         else
         {
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[23] + '&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Dum + '<br>';
         }
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[24] + ' : ' + GameI.GameR;
      }
      else if(nation == 6)
      {
         MInfo.rows[0].cells[0].innerHTML = GameI.GName;
         MInfo.rows[1].cells[0].innerHTML = string[13] + '&nbsp;' + string[14] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.GDate + '<br>';
        MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[15] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Place + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[16] + ' : ' + GameI.LTime + '<br>';
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[17] + ' : ' + GameI.SRead + string[18] + '&nbsp;' + GameI.SReadTime + string[19] + '<br>';

         if (GameI.Handi == 0){DumTitle = 1;}
         else if (GameI.Handi == 1)
         {
            DumTitle  = 2;
            GameI.Dum = string[20];
         }
         else
         {
            DumTitle  = 2;
            GameI.Dum = GameI.Handi.toString() + string[21];
         }  
 
         if (DumTitle == 1)
         {
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[22] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Dum + '<br>';    
         } 
         else
         {
            MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[23] + '&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.Dum + '<br>';
         }
         MInfo.rows[1].cells[0].innerHTML = MInfo.rows[1].cells[0].innerHTML + string[13] + '&nbsp;' + string[24] + '&nbsp;&nbsp;&nbsp;&nbsp; : ' + GameI.GameR;
      }
   }   

   if(isMobile)
   {
      document.getElementById("info_title").innerHTML    = string[123];
      document.getElementById("detail_title").innerHTML  = string[124];
      document.getElementById("explain_title").innerHTML = string[67];
      
   }
   else
   {
     if(wh != 'ctab'){document.getElementById("explain_title").innerHTML = string[13] + '&nbsp;' + string[67];}
   }
   
   if(wh != 'ctab')
   {
      document.getElementById("news").innerHTML = string[13] + '&nbsp;' + string[69] + document.getElementById("news").innerHTML;
      document.getElementById("nextmove").innerHTML = string[13] + '&nbsp;' + string[68] + document.getElementById("nextmove").innerHTML;
      document.getElementById("explain").innerHTML = '';
   }     

   if(isMobile)
   {
         if(bimg != ''){document.getElementById("BPlayer").src = PhotoDir+bimg;}
         else          {document.getElementById("BPlayer").src = resourcePreLoader.GetImage('../'+img_folder+'/nophoto.gif').src;}   
         if(wimg != ''){document.getElementById("WPlayer").src = PhotoDir+wimg;}
         else          {document.getElementById("WPlayer").src = resourcePreLoader.GetImage('../'+img_folder+'/nophoto.gif').src;}
         
         BImage = document.getElementById("BPlayer");
         BImage.onerror = function() {
            this.src = resourcePreLoader.GetImage('../'+img_folder+'/nophoto.gif').src;
         };

         WImage = document.getElementById("WPlayer");
         WImage.onerror = function() {
            this.src = resourcePreLoader.GetImage('../'+img_folder+'/nophoto.gif').src;
         };
   }
   else
   {
     if(wh == 'ctab')
     {
        player.rows[0].cells[1].innerHTML = cutByLen(GameI.Black,16) + ' ' + GameI.BGrade;
        player.rows[1].cells[1].innerHTML = cutByLen(GameI.White,16) + ' ' + GameI.WGrade;
     }   
     else
     {
        if(nation == 6)
        {
           player_eng.rows[0].cells[1].innerHTML = cutByLen(GameI.Black,20);
           player_eng.rows[0].cells[2].innerHTML = GameI.BGrade;
           player_eng.rows[2].cells[1].innerHTML = cutByLen(GameI.White,20);
           player_eng.rows[2].cells[2].innerHTML = GameI.WGrade;
        } 
        else
        {
           player.rows[0].cells[0].innerHTML = cutByLen(GameI.Black,16);
           player.rows[0].cells[1].innerHTML = GameI.BGrade;
           player.rows[2].cells[0].innerHTML = cutByLen(GameI.White,16);
           player.rows[2].cells[1].innerHTML = GameI.WGrade;
        }             
     }       
   }

   Dump = true;
   for(i = 1; i <= nMove; i++)
   {
      if (MoveP[i].X == 0) {GoBoard.PassMove();}
      else {GoBoard.BoardProcess(false, MoveP[i].X, MoveP[i].Y, true);}
   }                        
 
   while (GoBoard.NowSeqNo() >= 1)
   {
      GoBoard.Retract();
   } 
   // console.log('====>Progress: ');
//   GoBoard.Progress();
   Dump = false;
   SetNowHelpText();

   if((GameI.Kind == '1') || (ULevel == '0') || (ULevel == '2'))
   {
      document.getElementById("explain").innerText = GameI.Comment;
   }
   
   onGameResize();
};

function SetAssist(Mode, GoBasic)
{
   console.log('SetAssist');
   var NumBase; 
   NumBase = new TNumInfo();
   
   if ((Mode == 'MakeVar') && (GoBoard.NumTag)){numEndBtnClick();}
   Sound                   = false;
   BackTop                 = BackTop + 1;
   BackInfo[BackTop].Mode  = NowMode;
   BackInfo[BackTop].Basic = deepObjCopy(GoBasic);
   BackInfo[BackTop].MaxSN = GoBoard.NowMaxSN();
   NowMode                 = Mode;
   
   switch(NowMode)
   {
      case 'MakeVar' : 
         document.getElementById("board_div").style.background = '#408080';
         pbBoard.SetEdge(resourcePreLoader.GetImage("../image/gedge.bmp"), "white");
         GoBoard.SetBasic(GoBasic, true, true);
         NumBase.NumSV      = 0;
         NumBase.MinSN      = GoBoard.NowSeqNo();
         NumBase.NumTag     = true;
         GoBoard.SetNumBase(NumBase);
         break;
      case 'Review' : 
         GoBoard.SetBasic(GoBasic, true, true);
         break;
   }

   Sound = true;
};

function ReturnBack()
{
   Sound = false;
   if(isMobile){document.getElementById("board_div").style.background = 'white';}
   else        {document.getElementById("board_div").style.background = '#d4d0c8';}
   ReturnPrePosition(BackInfo[BackTop].Basic);
   
   NowMode = BackInfo[BackTop].Mode;
   if (NowMode == 'Review')
   {
      pbBoard.SetEdge(resourcePreLoader.GetImage("../image/bedge.bmp"), "black");  
      GoBoard.SetSBasic(BackInfo[BackTop].Basic);
      GoBoard.SetMaxSN(BackInfo[BackTop].MaxSN);
   }
   BackTop = BackTop - 1;
   Sound   = true;
};

function ReturnPrePosition(Basic)
{
   var i,n,X,Y,PX,PY,PS,NBase,XYS;
   NBase = new TNumInfo();

   if (GoBoard.NumTag == false){GoBoard.SetNumBase(NumBase);}
   if (NowMode == 'MakeVar')
   {
      while((GoBoard.NowSeqNo() >= GoBoard.MinSN) && (GoBoard.NowSeqNo() > 0)){GoBoard.Retract();}
      while((GoBoard.NowSeqNo() >= Basic.SeqNo) && (GoBoard.NowSeqNo() > 0)){GoBoard.Retract();}

      for( i = GoBoard.NowSeqNo(); i <= Basic.SeqNo; i++)
      {
          X = Basic.PutSeq.PutSeq[i].px;
          Y = Basic.PutSeq.PutSeq[i].py;
          if ((X == 0) && (Y == 0)){GoBoard.PassMove();}
          else{GoBoard.BoardProcess(false, X, Y, true);}
      }
      GoBoard.SetBasic(BackInfo[BackTop].Basic, false, true);
   }
   else if (NowMode != 'Review')
   {
      GoBoard.SetBasic(Basic, true, true);
      if (GoBoard.NumTag == true)
      {
         if (GoBoard.NowSeqNo() == 0)
         {
            NBase.NumSV  = 0;
            NBase.MinSN  = 0;
            NBase.NumTag = true;
            GoBoard.SetNumBase(NBase);
         }
         else
         {
            GoBoard.SetNumTag(true);
            XYS = GoBoard.GetPXPY(PX, PY, PS);
            PX = XYS[0]; 
            PY = XYS[1];
            PS = XYS[2];
            if (PX > 0){MBoard[PY][PX] = 0;}
         }
      }
   }
};


function SetNowHelpText()
{
   var i,n,nn,NSeq;

   if ((GameI.Kind == '1') || (ULevel == '0') || (ULevel == '2') || (wh == 'ctab')){return;}

   if (NowMode == 'MakeVar'){NSeq = GoBoard.MinSN;}
   else {NSeq = GoBoard.NowSeqNo();}
   
   document.getElementById("explain").innerHTML = '';   

   n  = 0;
   nn = 0;
   for (i = 1; i <= nAirTxt; i++)
   {
       if (AirTxtI[i].SeqN == NSeq)
       { 
          nn = nn + 1;
          if (AirTxtI[i].Mode == 1)
          {
             if (nn == 1){document.getElementById("explain").innerHTML = document.getElementById("explain").innerHTML + AirTxtI[i].Text;}
             else {document.getElementById("explain").innerHTML = document.getElementById("explain").innerHTML + '<br>' + AirTxtI[i].Text;}
          }
          else
          {
             n = n + 1;
             if (nn == 1){document.getElementById("explain").innerHTML = document.getElementById("explain").innerHTML + referenceText(NSeq, n);}
             else {document.getElementById("explain").innerHTML = document.getElementById("explain").innerHTML + '<br>' + referenceText(NSeq, n);}
          }   
       }
   }
};

function referenceText(NSeq, n)
{
   var reText;
  
   reText = "<a href = 'javascript:openReference("+NSeq+","+n+");'>";
   reText = reText + string[28] + ' ' + NSeq + '-' + n + '</a>';
   return reText;
};   

function openReference(NSeq, n)
{
   var w, h, l, t, gibo;
   
   gibo = document.getElementById("gibo").value;
   
   w = 570;
   h = 700;
   
   l = (screen.width - w) / 2; 
   t = (screen.height - h) / 2;   
    
   window.open('./gibo_reference.asp?gibo='+gibo+'&NSeq='+NSeq+'&HelpN='+n+'&nation='+nation, 'reference', 'width=' + w + ', height= ' + h + ', toolbar=no, scrollbars=no, menubar=no, location=no, diectories=no, status=no, resizable=yes, top=' + t +', left='+l).focus(); 
};
  
// function handle(delta){
//    var s = delta + ": ";
     
//    if(inputSystem.mouseX >= 0 && inputSystem.mouseX <= pbBoard.szBoard && inputSystem.mouseY >= 0 && inputSystem.mouseY <= pbBoard.szBoard)
//    {
//      if (delta < 0) {
//       console.log('====Progress: ');
//         GoBoard.Progress();        
//      }
//      else {
//         GoBoard.Retract();       
//      }
//      SetNowHelpText();
//    }      
//  }

// function wheel(event){
//      var delta = 0;
//      if (!event) event = window.event; 
//      if (event.wheelDelta) {
//          delta = event.wheelDelta/120;
//          if (window.opera) delta = - delta;
//      } else if (event.detail) delta = - event.detail/3;
//      if (delta) handle(delta);
// }

window.addEventListener("load", onGameInit, false); //load //call load event