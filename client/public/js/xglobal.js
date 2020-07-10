var nation;
var img_folder;
var addr;
var MyLang;
var DFontName;
var addr = new Array();

function loadXGolbal() //load
{
   nation = document.getElementById("nation").value;
   Mobile = document.getElementById("isMobile").value;
   bimg   = document.getElementById("bimg").value;
   wimg   = document.getElementById("wimg").value;
   wh     = document.getElementById("wh").value;
   MyLang = nation;

   if   (Mobile == 'true'){isMobile = true;}
   else                   {isMobile = false;}
   
   var i;
   
   if(nation == "1")
   {
      img_folder    = "image";
      DFontName     = 'gulimche';
      GOPBFName1    = '굴림체';
      GOPBFName2    = '굴림';
      PhotoDir      = 'http://open.cyberoro.com/etc/gisa/';
   }
   else if(nation == "2")
   {
      img_folder    = "img_chn";
      DFontName     = '宋体';
      GOPBFName1    = '宋体';
      GOPBFName2    = '宋体';
      PhotoDir      = 'http://sinago.com/gsPhoto/';      
   }
   else if(nation == "3")
   {
        img_folder    = "img_jpn";      
      DFontName     = 'ＭＳ ゴシック';
      GOPBFName1    = 'ＭＳ ゴシック';
      GOPBFName2    = 'ＭＳ ゴシック';
      PhotoDir      = '';      
      PhotoDir      = 'http://u-gen.nihonkiin.or.jp/';
   }
   else if(nation == "6")
   {
      img_folder    = "img_eng";
      DFontName     = 'Arial';
      GOPBFName1    = 'Arial';
      GOPBFName2    = 'Arial';
      PhotoDir      = 'http://open.cyberoro.com/etc/gisa/';
   }
};


