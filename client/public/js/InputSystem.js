var autoIntervalId;

function InputSystem() //load
{
   if( navigator.platform  ){
       if( filter.indexOf(navigator.platform.toLowerCase())<0 )
       {
          window.addEventListener("touchstart", ontouchstart, false);
          window.addEventListener("touchmove", ontouchmove, false);
          window.addEventListener("touchend", ontouchend, false);
       }
       else
       {
         //  window.addEventListener("mousemove", onMouseMove, false);
         //  window.addEventListener("mouseup", onMouseUp, false);
         //  window.addEventListener("keydown", onKeyDown, false);
         //  window.addEventListener("keyup", onKeyUp, false);
       }
   }
      
   this.mouseX  = 0;
   this.mouseY  = 0;
   this.mouseXT = 0;
   this.mouseYT = 0;
   return this;
};

// function onMouseMove(e)
// {
//    var theCanvas = document.getElementById("board_div2");
   
//    inputSystem.mouseX = e.clientX - theCanvas.offsetLeft - LeftM;    
//    inputSystem.mouseY = e.clientY - theCanvas.offsetTop - TopM;
// };

// function onMouseUp(e)
// {
//    var X, Y, XY, MDX, MDY;
      
//    if(inputSystem.mouseX >= 0 && inputSystem.mouseX <= pbBoard.szBoard && inputSystem.mouseY >= 0 && inputSystem.mouseY <= pbBoard.szBoard)
//    {
//       X  = parseInt(inputSystem.mouseX / pbBoard.szGrid) + 1;
//       Y  = parseInt(inputSystem.mouseY / pbBoard.szGrid) + 1;
      
//       if (pbBoard.CCord)
//       {
//          XY = pbBoard.CCordXY(X, Y);
//          MDX = XY[0];
//          MDY = XY[1];
//       }
//       else
//       {
//          MDX = X;
//          MDY = Y;
//       }

//       pbBoardMouseDown(e.button, MDX, MDY);
//    }
// };

function onKeyDown(e)
{
   
};

// function onKeyUp(e)
// {
//    if(e.keyCode == 32 || e.keyCode == 39 || e.keyCode == 13)
//    {
//       GoBoard.Progress();  
//    }
//    else if (e.keyCode == 8|| e.keyCode == 37)
//    {
//       GoBoard.Retract();   
//    }  
// };


function ontouchmove(e)
{
  e.preventDefault();
   var theCanvas = document.getElementById("board_div2");
   var touch     = e.touches[0];

   inputSystem.mouseX = touch.pageX - theCanvas.offsetLeft - LeftM;  
   inputSystem.mouseY = touch.pageY - theCanvas.offsetTop - TopM;
};

function ontouchstart(e)
{
   var theCanvas       = document.getElementById("board_div2");
   var touch           = e.touches[0]; 
   inputSystem.mouseX  = touch.pageX - theCanvas.offsetLeft - LeftM;
   inputSystem.mouseY  = touch.pageY - theCanvas.offsetTop - TopM;
   inputSystem.mouseXT = inputSystem.mouseX;
   inputSystem.mouseYT = inputSystem.mouseY;
};

function ontouchend(e)
{
   var X, Y, XY, MDX, MDY, ebutton;
      
   if(inputSystem.mouseX >= 0 && inputSystem.mouseX <= pbBoard.szBoard && inputSystem.mouseY >= 0 && inputSystem.mouseY <= pbBoard.szBoard && inputSystem.mouseXT >= 0 && inputSystem.mouseXT <= pbBoard.szBoard && inputSystem.mouseYT >= 0 && inputSystem.mouseYT <= pbBoard.szBoard)
   {
      X  = parseInt(inputSystem.mouseXT / pbBoard.szGrid) + 1;
      Y  = parseInt(inputSystem.mouseYT / pbBoard.szGrid) + 1;
      
      if (pbBoard.CCord)
      {
         XY = pbBoard.CCordXY(X, Y);
         MDX = XY[0];
         MDY = XY[1];
      }
      else
      {
         MDX = X;
         MDY = Y;
      }

      if(inputSystem.mouseXT <= inputSystem.mouseX){ebutton = 0;}
      else{ebutton = 0;}   

      pbBoardMouseDown(ebutton, MDX, MDY);
   }
   
   inputSystem.mouseXT = 0;
   inputSystem.mouseYT = 0;
};


function mouse_event(obj, act)
{
   switch (act) {
      case 1 : obj.src = resourcePreLoader.GetImage('./'+img_folder+'/' + obj.id + '_up.png').src;
               break; 
      case 2 : obj.src = resourcePreLoader.GetImage('./'+img_folder+'/' + obj.id + '.png').src;
               break; 
      case 3 : obj.src = resourcePreLoader.GetImage('./'+img_folder+'/'  + obj.id + '_dn.png').src;
               break; 
      case 4 : obj.src = resourcePreLoader.GetImage('./'+img_folder+'/'  + obj.id + '.png').src;
               break; 
      case 5 : switch(obj.id){
                  case "btn_01"         : news_visible(false);
                                          break;      
                  case "btn_02"         : news_visible(true);
                                          break;      
                  case "btn_move"       : moveBtnClick();
                                          break;      
                  case "btn_auto"       : autoBtnClick();
                                          break;      
                  case "btn_stop"       : autoEndBtnClick();
                                          break;
                  case "btn_print"      : printBtnClick();
                                          break;
                  case "btn_order"      : numBtnClick();
                                          break;
                  case "btn_order_end"  : numEndBtnClick();
                                          break;
                  case "btn_replay"     : testBtnClick();
                                          break;
                  case "btn_return"     : testEndBtnClick();
                                          break;
                  case "control_start"  :
                  case "control_rewind" :
                  case "control_back"   :
                  case "control_play"   :
                  case "control_ff"     :
                  case "control_last"   : VBtnClick(obj.id);
                                          break;
                  case "btn_gibo"       : btn_gibo_Click();
                                          break;
                  case "btn_hinton"     : btn_hinton_Click();
                                          break;
                  case "btn_hintoff"    : btn_hintoff_Click();//openHint
                                          break;
               }
               break; 
   }
};

function ans_mouse_event(obj)
{
   var HintU;

   document.getElementById("btn_gibo").style.visibility = "visible";

   HintU = HintUsage;
   
   if (NowMode == "MakeVar"){testEndBtnClick();}
   if (HintUsage){EraserHint();}
   EraserFalseClick();
   
   document.getElementById("btn_bs").src  = resourcePreLoader.GetImage('./'+img_folder+'/btn_bs.png').src;
   document.getElementById("btn_ws").src  = resourcePreLoader.GetImage('./'+img_folder+'/btn_ws.png').src;
   document.getElementById("btn_bws").src = resourcePreLoader.GetImage('./'+img_folder+'/btn_bws.png').src;
   
   obj.src = resourcePreLoader.GetImage('./'+img_folder+'/' + obj.id + '_dn.png').src;

   switch(obj.id){
      case "btn_bs"  : NowMode = "AnswerB";
                       while ((GoBoard.NowStone() != "Black" ) && (GoBoard.Progress())){};
                       break;
      case "btn_ws"  : NowMode = "AnswerW";
                       while ((GoBoard.NowStone() != "White" ) && (GoBoard.Progress())){};
                       break;
      case "btn_bws" : NowMode = "AnswerBoth";
                       while ((GoBoard.NowStone() != "Black" ) && (GoBoard.NowStone() != "White" ) && (GoBoard.Progress())){};
                       break;
   }
   if (HintU) {ShowHint();}
   SetNowHelpText(); 
};

function sound_mouse_event(obj)
{
   if (cval == "" || cval == "on")
   {
        cval = "off";
        setCookie("gibo_sound", "off", 365);
      document.getElementById("gibo_sound").src  = resourcePreLoader.GetImage('./'+img_folder+'/btn_sound_off.png').src;   
   }
   else
   {
        cval = "on";
        setCookie("gibo_sound", "on", 365);
      document.getElementById("gibo_sound").src  = resourcePreLoader.GetImage('./'+img_folder+'/btn_sound_on.png').src; 
   }
};

function news_visible(visible)
{
   var btn_01, btn_02;
   
   btn_01 = document.getElementById("btn_01");
   btn_02 = document.getElementById("btn_02");
      
   if(visible)
   {
      btn_01.style.visibility = 'visible';         
      btn_02.style.visibility = 'hidden';
      
      document.getElementById("con_p2").style.height = "170px";
      document.getElementById("ta1").style.bottom    = "300px";      
   }
   else
   {
      btn_01.style.visibility = 'hidden';       
      btn_02.style.visibility = 'visible';
      
      document.getElementById("con_p2").style.height = "20px";      
      document.getElementById("ta1").style.bottom    = "150px";
   }
};

function moveBtnClick()
{
   var SeqNum, moveEd;
   

   if (NowMode != "Review")
   {
      alert(string[25]+"\n\n"+string[5]);
      return; 
   }

   moveEd = document.getElementById("moveEd");
   SeqNum = moveEd.value;
   
   if (isNaN(moveEd.value) || moveEd.value == "")
   {
      alert(string[26]);
      moveEd.value = "";
   } 
   else if (SeqNum <= 0)
   {
      alert(string[27]);
      moveEd.value = "";
   }
   else
   {
     if (document.getElementById("btn_stop").style.visibility == "visible")
     {
        autoEndBtnClick();       
     }

     Sound = false;
     while (GoBoard.NowSeqNo() >= 1){GoBoard.Retract();}
     SetNowHelpText();
     
     console.log('InputSystem');
     if (SeqNum < GoBoard.NowMaxSN())
     {
        while (GoBoard.NowSeqNo() < SeqNum){GoBoard.Progress();}
     }
     else
     {
        while (GoBoard.Progress()){};
     }
     SetNowHelpText();
     moveEd.value = GoBoard.NowSeqNo();
   }
};

function numBtnClick() 
{
   var NumBase, PX, PY, PS;
   
   NumBase = new TNumInfo();
   console.log('NumBase: ', NumBase);
      
   if(NowMode == 'MakeVar')
   {
      GoBoard.SetNumTag(false);  
      pbBoard.ClearSeqMark();
      PX = GoBoard.PutSeq.PutSeq[GoBoard.SeqNo].px;
      PY = GoBoard.PutSeq.PutSeq[GoBoard.SeqNo].py;
      PS = GoBoard.Next;
      if (PX > 0){pbBoard.DrawStone(PStone, PX, PY, 501);}
   }
   
   if(isMobile)
   {
      document.getElementById("btn_order").style.display     = "none";
      if(wh == 'aweb'){document.getElementById("btn_order_end").style.display = "inline";}
      else            {document.getElementById("btn_order_end").style.display = "block";}
   }
   else
   {
      if(wh == 'ctab')
      {
           document.getElementById("btn_order").style.display     = "none";
         document.getElementById("btn_order_end").style.display = "block";
      } 
      else
      {
         document.getElementById("btn_order").style.visibility = "hidden";
         document.getElementById("btn_order").style.height     = "0px";
      
         document.getElementById("btn_order_end").style.visibility = "visible";
         document.getElementById("btn_order_end").style.height     = "39px";
      }
   }

   // console.log('GoBoard.NowSeqNo(): ', GoBoard.NowSeqNo());
   if (GoBoard.NowSeqNo() == 0)
   {
      NumBase.NumSV  = 0;
      NumBase.MinSN  = 0;
      NumBase.NumTag = true;
      GoBoard.SetNumBase(NumBase);
      console.log('NumBase: ', NumBase);
   }
   else
   {
      GoBoard.SetNumTag(false);
      PX = GoBoard.PutSeq.PutSeq[GoBoard.SeqNo].px;
      PY = GoBoard.PutSeq.PutSeq[GoBoard.SeqNo].py;
      PS = GoBoard.Next;
      if (PX > 0){pbBoard.DrawStone(PStone, PX, PY, 0);}
      pbBoard.SetSeqMarkB(GoBoard.GetSeqMarkB());
   }   
};

function numEndBtnClick() 
{
   var PX, PY, PS;
   
   if(isMobile)
   {
      if(wh == 'aweb'){document.getElementById("btn_order").style.display = "inline";}
      else            {document.getElementById("btn_order").style.display = "block";}
      document.getElementById("btn_order_end").style.display = "none";      
   }
   else
   {
      if(wh == 'ctab')
      {
           document.getElementById("btn_order").style.display     = "block";
         document.getElementById("btn_order_end").style.display = "none";
      } 
      else
      {
         document.getElementById("btn_order").style.visibility = "visible";
         document.getElementById("btn_order").style.height     = "39px";
      
         document.getElementById("btn_order_end").style.visibility = "hidden";
         document.getElementById("btn_order_end").style.height     = "0px";
      }
   }

   GoBoard.SetNumTag(false);
   pbBoard.ClearSeqMark();
   PX = GoBoard.PutSeq.PutSeq[GoBoard.SeqNo].px;
   PY = GoBoard.PutSeq.PutSeq[GoBoard.SeqNo].py;
   PS = GoBoard.Next;
   if (PX > 0) {pbBoard.DrawStone(PStone, PX, PY, 501);}
};


function autoBtnClick() 
{
   var secondSE;
   
   secondSE = document.getElementById("secondSE");
      
   if (NowMode == 'Review')
   {
        autoIntervalId = setInterval(autoSeq, secondSE.value * 1000);
      AutoMode       = true;

      document.getElementById("btn_auto").style.visibility = "hidden";
      document.getElementById("btn_auto").style.width      = "0px";
      document.getElementById("btn_auto").style.height     = "0px";
      
      document.getElementById("btn_stop").style.visibility = "visible";
      document.getElementById("btn_stop").style.width      = "56px";
      document.getElementById("btn_stop").style.height     = "21px";
   }
};


function autoSeq() 
{
   if (AutoMode)
   {
      Sound = true;
      if (!GoBoard.Progress()){autoEndBtnClick();}
      SetNowHelpText();
   }
   else {clearInterval(autoIntervalId);}     
};

function autoEndBtnClick() 
{
   if (NowMode == 'Review')
   {
      clearInterval(autoIntervalId);
      AutoMode           = false;
      
      document.getElementById("btn_auto").style.visibility = "visible";
      document.getElementById("btn_auto").style.width      = "56px";
      document.getElementById("btn_auto").style.height     = "21px";
      
      document.getElementById("btn_stop").style.visibility = "hidden";
      document.getElementById("btn_stop").style.width      = "0px";
      document.getElementById("btn_stop").style.height     = "0px";
   }
};

function printBtnClick() 
{
   var gibo;
   
   gibo = document.getElementById("gibo").value;   
   window.open('./giboprint.asp?gibo='+gibo+'&nation='+nation+'&wh='+wh, 'print', 'width=793, height=1000, toolbar=no, scrollbars=yes, menubar=no, location=no, diectories=no, status=no, resizable=yes, top=10, left=10').focus();
};

function testBtnClick() 
{
   if (NowMode != 'Review')
   {
      alert(string[4]+"\n\n"+string[5]);     
      return;
   }

   if (AutoMode){autoEndBtnClick();}

   if(isMobile)
   {
      document.getElementById("btn_replay").style.display = "none";     
      if(wh == 'aweb'){document.getElementById("btn_return").style.display = "inline";}
      else            {document.getElementById("btn_return").style.display = "block";}
   }
   else
   {
      if(wh == 'ctab')
      {
           document.getElementById("btn_replay").style.display = "none";
         document.getElementById("btn_return").style.display = "block";
      } 
      else
      {
           document.getElementById("btn_replay").style.visibility = "hidden";
         document.getElementById("btn_replay").style.height     = "0px";
      
         document.getElementById("btn_return").style.visibility = "visible";
         document.getElementById("btn_return").style.height     = "39px";
      }
   }

   SetAssist('MakeVar', GoBoard.GetBasic());
};


function testEndBtnClick() 
{
   if(isMobile)
   {
      if(wh == 'aweb'){document.getElementById("btn_replay").style.display = "inline";}
      else            {document.getElementById("btn_replay").style.display = "block";}
      document.getElementById("btn_return").style.display = "none";      
   }
   else
   {
      if(wh == 'ctab')
      {
           document.getElementById("btn_replay").style.display = "block";
         document.getElementById("btn_return").style.display = "none";
      } 
      else
      {
         document.getElementById("btn_replay").style.visibility = "visible";
         document.getElementById("btn_replay").style.height     = "39px";
      
         document.getElementById("btn_return").style.visibility = "hidden";
         document.getElementById("btn_return").style.height     = "0px";
      }
   }
   
   ReturnBack();
   if (GoBoard.NumTag == true){numEndBtnClick();} 
};

function VBtnClick(BId) 
{
   if ((NowMode == "AnswerB") || (NowMode == "AnswerW") || (NowMode == "AnswerBoth"))
   {
      alert(string[4]+"\n\n"+string[5]);
      return;
   }

   AutoMode = false;

   if ((NowMode == "Review") || (NowMode == "MakeVar"))
   {
        Sound = false;
        
      switch(BId){
         case "control_start"  : while(GoBoard.NowSeqNo() >= 1){GoBoard.Retract();}
                                 break;   

         case "control_rewind" : for(var i = 1; i <= MMoveGap; i++){GoBoard.Retract();}
                                 break;   

         case "control_back"   : GoBoard.Retract();
                                 break;   

         case "control_play"   : Sound = true;
                                 GoBoard.Progress();
                                 break;   

         case "control_ff"     : for(var i = 1; i <= MMoveGap; i++){GoBoard.Progress();}
                                 break;   

         case "control_last"   : while(GoBoard.Progress()){}
                                 break;   
      }
      
      SetNowHelpText(); 
   }
};

function ref_VBtnClick(obj) 
{
   Sound = false;
        
   switch(obj.id){
      case "control_rewind" : for(var i = 1; i <= MMoveGap; i++){GoBoard.Retract();}
                              break;   

      case "control_back"   : GoBoard.Retract();
                              break;   

      case "control_play"   : Sound = true;
                              GoBoard.Progress();
                              break;   

      case "control_ff"     : for(var i = 1; i <= MMoveGap; i++){GoBoard.Progress();}
                              break;   
      }
};


function btn_gibo_Click() 
{
   if (HintUsage){EraserHint();}
   EraserFalseClick();
   NowMode = "Review";
   document.getElementById("btn_gibo").style.visibility = "hidden";

   document.getElementById("btn_bs").src  = resourcePreLoader.GetImage('./'+img_folder+'/btn_bs.png').src;
   document.getElementById("btn_ws").src  = resourcePreLoader.GetImage('./'+img_folder+'/btn_ws.png').src;
   document.getElementById("btn_bws").src = resourcePreLoader.GetImage('./'+img_folder+'/btn_bws.png').src;
};

function btn_hinton_Click() 
{
   console.log('btn_hinton_Click() : ' );
   if ((ULevel == '0') || (ULevel == '2') || (ULevel == '10') || (ULevel == '100'))
   {
      alert(string[30]);
      return;  
   }

   if (GoBoard.NowSeqNo() == GoBoard.NowMaxSN())
   {
      alert(string[1]);
      return;  
   }
   ShowHint();
};

function btn_hintoff_Click() //openhint
{
   EraserHint();
};


function ShowHint() 
{
   console.log('ShowHint(): ');
   var hintCount, seq;
   
   if ((NowMode == "AnswerB") || (NowMode == "AnswerW") || (NowMode == "AnswerBoth"))
   {

      document.getElementById("btn_hinton").style.visibility  = "hidden";
      document.getElementById("btn_hinton").style.height      = "0px";
      document.getElementById("btn_hintoff").style.visibility = "visible";
      document.getElementById("btn_hintoff").style.height     = "29px";
      HintUsage        = true;
      hintCount        = 0;
      seq              = GoBoard.NowSeqNo();
      while ((hintCount < 4) && (seq < GoBoard.NowMaxSN()))
      {
         seq = seq + 1;
         if (((GoBoard.PutSeq.PutSeq[seq].Stone == "Black") || (GoBoard.PutSeq.PutSeq[seq].Stone == "White")) && GoBoard.CanPutXY(GoBoard.PutSeq.PutSeq[seq].px,GoBoard.PutSeq.PutSeq[seq].py)) 
         {
            hintCount = hintCount + 1;
            pbBoard.DrawMark(GoBoard.PutSeq.PutSeq[seq].px,GoBoard.PutSeq.PutSeq[seq].py,691,false);
         }
      }
   }
   else
   {
      alert(string[71]);   
   }
};

function ShowFalseClick(x, y) 
{
   if ((NowMode == "AnswerB") || (NowMode == "AnswerW") || (NowMode == "AnswerBoth"))
   {
        falseClickCnt = falseClickCnt + 1;
        falseClickXY[falseClickCnt].X = x;
        falseClickXY[falseClickCnt].Y = y;
      pbBoard.DrawMark(x,y,694,false);
   }
};


function EraserHint() //openhint
{
   console.log('EraserHint(): ');
   var hintCount, seq;

   document.getElementById("btn_hinton").style.visibility  = "visible";
   document.getElementById("btn_hinton").style.height      = "29px";
   document.getElementById("btn_hintoff").style.visibility = "hidden";
   document.getElementById("btn_hintoff").style.height     = "0px";
   HintUsage        = false;
   hintCount        = 0;
   seq              = GoBoard.NowSeqNo();
   while ((hintCount < 4) && (seq < GoBoard.NowMaxSN()))
   {
      seq = seq + 1;
      if (((GoBoard.PutSeq.PutSeq[seq].Stone == "Black") || (GoBoard.PutSeq.PutSeq[seq].Stone == "White")) && GoBoard.CanPutXY(GoBoard.PutSeq.PutSeq[seq].px,GoBoard.PutSeq.PutSeq[seq].py)) 
      {
         hintCount = hintCount + 1;
         pbBoard.DrawStone("Empty",GoBoard.PutSeq.PutSeq[seq].px,GoBoard.PutSeq.PutSeq[seq].py,0);
      }
   }
};

function EraserFalseClick() 
{
   for(var i = 1; i <= falseClickCnt; i++)
   {
      pbBoard.DrawStone("Empty",falseClickXY[i].X,falseClickXY[i].Y,0);    
   }  
   
   falseClickCnt = 0;   
};

function ref_testBtnClick() 
{
   if (NowMode == "Review")
   {
      SetAssist('MakeVar', GoBoard.GetBasic());    
   }
   else if(NowMode == "MakeVar")
   {
      ReturnBack();
   }  
};

function tab_click(obj) 
{
   document.getElementById(obj+"_title").className    = 'tab_on';
   
   if(obj == 'info')
   {
      document.getElementById("detail_title").className  = 'tab_off_1';
      document.getElementById("explain_title").className = 'tab_off_1';
   }
   else if(obj == 'detail')
   {
      document.getElementById("info_title").className    = 'tab_off_2';    
      document.getElementById("explain_title").className = 'tab_off_1';
   }
   else if(obj == 'explain')
   {
      document.getElementById("info_title").className    = 'tab_off_2';    
      document.getElementById("detail_title").className  = 'tab_off_2';
   }

   document.getElementById("info_tab").style.display    = 'none';    
   document.getElementById("detail_tab").style.display  = 'none';
   document.getElementById("explain_tab").style.display = 'none';
   document.getElementById(obj+"_tab").style.display    = 'block';
};
var inputSystem = new InputSystem();


