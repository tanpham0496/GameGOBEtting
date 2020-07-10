var filter = "win16|win32|win64|mac|mac68k|macintel|macppc"; 
 
function setCookie(name, value, expiredays){ 
    if(typeof expiredays == "undefined" || expiredays == null){
        var expiredays = 1; 
    }
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function getCookie(name) {
   var key = name + "=" ;
   var key_len = key.length ;
   var cookie_len = document.cookie.length;
   var i = 0;
   while (i < cookie_len ) {
      var j = i + key_len;
      if ( document.cookie.substring( i, j ) == key ) {
         var cookie_end1 = document.cookie.indexOf(";",j);
         var cookie_end2 = document.cookie.indexOf("&",j);
         
         var cookie_end;
         if      (cookie_end1 == -1 && cookie_end2 == -1){cookie_end = -1;}
         else if (cookie_end1 == -1)                     {cookie_end = cookie_end2;}
         else if (cookie_end2 == -1)                     {cookie_end = cookie_end1;}
         else
         {  
            if(cookie_end1 > cookie_end2){cookie_end = cookie_end2;}
            else{cookie_end = cookie_end1;}
         }
                 
         if (cookie_end == -1) {
            cookie_end = document.cookie.length;
         }
         return unescape(document.cookie.substring(j,cookie_end ));
      }
      i++; 
   }  
   return "";
}

function deepObjCopy (dupeObj) {
    var retObj = new Object();
    if (typeof(dupeObj) == 'object') {
        if (typeof(dupeObj.length) != 'undefined')
            var retObj = new Array();
        for (var objInd in dupeObj) {   
            if (typeof(dupeObj[objInd]) == 'object') {
                retObj[objInd] = deepObjCopy(dupeObj[objInd]);
            } else if (typeof(dupeObj[objInd]) == 'string') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'number') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'boolean') {
                ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
            }
        }
    }
    return retObj;
}

function autoSizePopup(){
    var conW = document.body.scrollWidth; 
    var conH = document.body.scrollHeight;
    
    var winOuterW = window.outerWidth; 
    var winOuterH = window.outerHeight;
        
    var winInnerW = window.innerWidth;
    var winInnerH = window.innerHeight;
        
    var winOffSetW = window.document.body.offsetWidth; 
    var winOffSetH = window.document.body.offsetHeight;
        
    var borderW = winOuterW - winInnerW;
    var borderH = winOuterH - winInnerH;
        
    winResizeW = conW + borderW;
    winResizeH = conH + borderH;
        
    window.resizeTo(winResizeW,winResizeH); 
}; 

function customSizePopup(w,h){
    var winOuterW = window.outerWidth; 
    var winOuterH = window.outerHeight;
        
    var winInnerW = window.innerWidth;
    var winInnerH = window.innerHeight;
        
    var borderW = winOuterW - winInnerW;
    var borderH = winOuterH - winInnerH;
        
    winResizeW = w + borderW;
    winResizeH = h + borderH;
        
    window.resizeTo(winResizeW,winResizeH); 
};

function cutByLen(str, maxByte) { //get player name
//     console.log('str: ', str);
//     console.log('maxByte: ', maxByte);
//    for(b=i=0;c=str.charCodeAt(i);){
//        b+=c>>7?2:1;

//        if (b > maxByte)
//        break;

//        i++;
//    }
//    return str.substring(0,i);
return "Hung"
};

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
};

Number.prototype.format = function(){ 
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};

HashMap = function(){ 
    this.map = new Array(); 
};   
HashMap.prototype = { 
    put : function(key, value){   
        this.map[key] = value; 
    },   
    get : function(key){   
        return this.map[key]; 
    },   
    getAll : function(){   
        return this.map; 
    },   
    clear : function(){   
        this.map = new Array(); 
    },   
    isEmpty : function(){     
         return (this.map.size() == 0); 
    }, 
    remove : function(key){     
         delete this.map[key]; 
    }, 
    toString : function(){ 
        var temp = ''; 
        for(i in this.map){   
            temp = temp + ',' + i + ':' +  this.map[i]; 
        } 
        temp = temp.replace(',',''); 
        return temp; 
    }, 
    keySet : function(){   
        var keys = new Array();   
        for(i in this.map){   
            keys.push(i); 
        }   
        return keys; 
    }, 
    size : function(){
        var count = 0;
        for(i in this.map){
            count++;
        }
        return count;
    }
}; 