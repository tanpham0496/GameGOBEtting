// function TOrOGoPB(theCanvas, boardImg) //load
function TOrOGoPB(theCanvas, boardImg, FBeBmp) {
  var i, j;

  this.theCanvas = theCanvas;
  this.Context = theCanvas.getContext("2d");

  if (isMobile) {
    this.XYMarkG = 0;
  } else {
    this.XYMarkG = 20;
  }
  this.szBoard = 190;
  this.line = 19;
  this.MaxAS = 9;

  this.szGrid = 1;
  this.hszGrid = 1;

  this.StRect = { top: 0, left: 0, bottom: 0, right: 0 };

  this.DrawOn = false;

  this.boardImg = boardImg;
  this.FBeBmp = FBeBmp;
  this.FGColor = "black";

  this.bdW = boardImg.width;
  this.bdH = boardImg.height;
  this.pat;
  this.Board = [];
  this.MarkB = [];
  for (i = 0; i <= 19; i++) {
    this.Board[i] = [];
  }

  for (i = 0; i <= 19; i++) {
    this.MarkB[i] = [];
  }

  for (i = 0; i <= 19; i++) {
    for (j = 0; j <= 19; j++) {
      this.Board[i][j] = "Empty";
    }
  }

  for (i = 0; i <= 19; i++) {
    for (j = 0; j <= 19; j++) {
      this.MarkB[i][j] = 0;
    }
  }

  this.CCord = false;
}

TOrOGoPB.prototype.resizeCanvas = function() {
  var wpBase, hpBase, sBoard, wBoard, hBoard, dwidth, dheight;

  dwidth = document.getElementById("board_div").offsetWidth;
  // console.log('dwidth: ', dwidth);
  dheight = document.getElementById("board_div").offsetHeight;
  // console.log('dheight: ', dheight);

  wpBase = dwidth - 5;
  hpBase = dheight - 5;
  wBoard = parseInt((wpBase - this.XYMarkG) / this.line);
  hBoard = parseInt((hpBase - this.XYMarkG) / this.line);
  // console.log('hBoard: ', hBoard);

  if (hBoard >= wBoard) {
    sBoard = (wBoard-15) * this.line;
  } else {
    sBoard = (hBoard-12) * this.line;
  }

  if (isMobile) {
    sBoard = (wBoard-15) * this.line;
  }

  if (parseInt(sBoard / this.line) > 60 - this.MaxAS) {
    sBoard = (60 - this.MaxAS) * this.line;
  }

  document.getElementById("board_div2").style.left =
    parseInt((dwidth - sBoard - this.XYMarkG) / 2) + "px";
  document.getElementById("board_div2").style.top =
    parseInt((dheight - sBoard - this.XYMarkG) / 2) + "px";

  if (sBoard != this.szBoard) {
    this.ResetStone(sBoard);
  }
};

TOrOGoPB.prototype.ResetStone = function(BSize) {
  var i, Grid, SStr;

  Grid = parseInt(BSize / this.line);
  if (Grid > 9 && Grid < 60) {
    SStr = Grid;
  }
  this.SetszBoard(BSize);
  // console.log("BSize: ", BSize);
};

TOrOGoPB.prototype.SetszBoard = function(Value) {
  if (Value > 0 && Value != this.szBoard) {
    this.szBoard = Value;
    this.theCanvas.width = Value + this.XYMarkG ;
    this.theCanvas.height = Value + this.XYMarkG ;
    this.szGrid = parseInt(Value / this.line);
    // console.log('this.szGrid: ', this.szGrid);
    this.hszGrid = parseInt(this.szGrid / 2);

    if (Value < this.line) {
      this.szBoard = this.line;
    } else {
      this.szBoard = Value;
    }
    // console.log("szBoard: ", this.szBoard);

    this.StRect = { top: 0, left: 0, bottom: this.szGrid, right: this.szGrid };
    this.DrawGoBoard();
  }
};

TOrOGoPB.prototype.DrawGoBoard = function() //draw chat box
{
  var i, j, e, h, w, BI, BP, WI, WP, s, ss, ts;
  this.DrawBoardBitMap();
  this.Context.strokeStyle = "black";

  if (this.szGrid % 2 == 0) {
    e = this.szGrid * this.line - this.hszGrid;
  } else {
    e = this.szGrid * this.line - this.hszGrid - 1;
  }

  this.Context.beginPath();
  for (i = 0; i <= this.line - 1; i++) {
    this.Context.moveTo(this.hszGrid, i * this.szGrid + this.hszGrid + 0.5);
    this.Context.lineTo(e, i * this.szGrid + this.hszGrid + 0.5);
    this.Context.moveTo(i * this.szGrid + this.hszGrid + 0.5, this.hszGrid);
    this.Context.lineTo(i * this.szGrid + this.hszGrid + 0.5, e);
  }

  if (this.szGrid % 2 == 0) {
    this.Context.moveTo(e + 0.5, e);
    this.Context.lineTo(e + 0.5, e + 1);
  }
  this.Context.stroke(); //draw line

  if (this.line == 19) {
    this.DrawSpecialPoint(4, 4);
    this.DrawSpecialPoint(4, 10);
    this.DrawSpecialPoint(4, 16);
    this.DrawSpecialPoint(10, 4);
    this.DrawSpecialPoint(10, 10);
    this.DrawSpecialPoint(10, 16);
    this.DrawSpecialPoint(16, 4);
    this.DrawSpecialPoint(16, 10);
    this.DrawSpecialPoint(16, 16);
  } else if (this.line == 13) {
    this.DrawSpecialPoint(4, 4);
    this.DrawSpecialPoint(10, 4);
    this.DrawSpecialPoint(4, 10);
    this.DrawSpecialPoint(10, 10);
  } else {
    this.DrawSpecialPoint(5, 5);
  }

  for (i = 1; i <= this.line; i++) {
    for (j = 1; j <= this.line; j++) {
      if (this.Board[i][j] == "Empty") {
        if (this.MarkB[i][j] > 0) {
          this.DrawMark(j, i, this.MarkB[i][j], false);
        }
      } else {
        this.DrawStone(this.Board[i][j], j, i, this.MarkB[i][j]);
      }
    }
  }

  this.DrawEdgeXY();
};

TOrOGoPB.prototype.DrawStone = function(Stone, x, y, MarkV) {
  var px, py, lcolor;
  var XY;

  this.Board[y][x] = Stone; //get stone x,y from .sgf
  this.MarkB[y][x] = MarkV;

  if (this.CCord) {
    XY = this.CCordXY(x, y);
    x = XY[0];
    y = XY[1];
  }

  px = (x - 1) * this.szGrid;
  py = (y - 1) * this.szGrid;
  if (x < 1 || x > this.line || y < 0 || y > this.line) {
    return;
  }

  if (Stone == "Empty") {
    this.RemoveReline(x, y);
  } else if (this.szGrid > 9 && this.szGrid < 60) {
    this.CopyStoneImage(Stone, px, py);
  } else {
    if (Stone == "Black") {
      lcolor = "black";
    } else {
      lcolor = "white";
    }

    this.Context.strokeStyle = lcolor;
    this.Context.fillStyle = lcolor;
    this.Ellipse(px, py, px + this.szGrid, py + this.szGrid);
  }

  if (this.CCord) {
    XY = this.CCordXY(x, y);
    x = XY[0];
    y = XY[1];
  }

  this.DrawMark(x, y, MarkV, false);
};

TOrOGoPB.prototype.DrawMark = function(X, Y, MarkV, Clear) {
  var px, py, MarkS;
  var fname, fsize, fweight;

  fweight = "";

  if (Clear && this.MarkB[Y][X] > 0) {
    this.DrawStone(this.Board[Y][X], X, Y, 0);
  } else if (MarkV > 0) {
    this.MarkB[Y][X] = MarkV;
    this.Context.textAlign = "center";
    this.Context.textBaseline = "middle";

    fname = "MS Sans Serif";
    fsize = parseInt(this.szGrid / 2.5);

    if (MarkV <= 500) {
      MarkS = MarkV;
    } else if (MarkV == 501) {
      fsize = 0;
      if (this.CCord) {
        this.DrawNowMark(
          this.Board[Y][X],
          this.line + 1 - X,
          this.line + 1 - Y
        );
      } else {
        this.DrawNowMark(this.Board[Y][X], X, Y);
      }
    } else if (MarkV >= 600 && MarkV <= 625) {
      fsize = parseInt((2 * this.szGrid) / 3);
      MarkS = String.fromCharCode(65 + MarkV - 600);
    } else if (MarkV >= 630 && MarkV <= 643) {
      fname = GOPBFName1;
    } else if (MarkV >= 650 && MarkV <= 675) {
      fname = GOPBFName1;
      MarkS = String.fromCharCode(97 + MarkV - 650);
    } else if (MarkV >= 680 && MarkV <= 688) {
      fname = GOPBFName1;
      MarkS = this.KoreaChr(MarkV);
    } else if (MarkV == 690) {
      fweight = "bold";
      fsize = parseInt((2 * this.szGrid) / 3);
      MarkS = "△";
    } else if (MarkV == 691) {
      fweight = "bold";
      fsize = parseInt((2 * this.szGrid) / 3);
      MarkS = "Ⅹ";
    } else if (MarkV == 692) {
      fweight = "bold";
      fsize = parseInt((2 * this.szGrid) / 3);
      fname = GOPBFName2;
      MarkS = "○";
    } else if (MarkV == 693) {
      fweight = "bold";
      fsize = parseInt((2 * this.szGrid) / 3);
      fname = GOPBFName2;
      MarkS = "□";
    } else if (MarkV == 694) {
      fweight = "bold";
      fsize = parseInt((2 * this.szGrid) / 3);
      MarkS = "Ⅹ";
    }
    if (MarkV < 750 && fsize > 0) {
      switch (this.Board[Y][X]) {
        case "Black":
          this.Context.fillStyle = "white";
          break;
        case "White":
          this.Context.fillStyle = "black";
          break;
        case "Empty":
          if (this.CCord) {
            this.DrawGridBitmap(
              (this.line + 1 - X - 1) * this.szGrid,
              (this.line + 1 - Y - 1) * this.szGrid
            );
          } else {
            this.DrawGridBitmap((X - 1) * this.szGrid, (Y - 1) * this.szGrid);
          }
          if (MarkV == 694) {
            this.Context.fillStyle = "red";
          } else {
            this.Context.fillStyle = "navy";
          }
          break;
      }
      if (this.CCord) {
        px = (this.line + 1 - X - 1) * this.szGrid + parseInt(this.szGrid / 2);
        py = (this.line + 1 - Y - 1) * this.szGrid + parseInt(this.szGrid / 2);
      } else {
        px = (X - 1) * this.szGrid + parseInt(this.szGrid / 2);
        py = (Y - 1) * this.szGrid + parseInt(this.szGrid / 2);
      }
      this.Context.font = fweight + " " + fsize + "px " + fname;
      this.Context.fillText(MarkS, px, py);
    }
  }
};

TOrOGoPB.prototype.KoreaChr = function(MarkV) {
  var str;
  str = string[MarkV - 573];
  return str;
};

TOrOGoPB.prototype.DrawNowMark = function(Stone, x, y) {
  var i, k, lcolor;

  if (this.szGrid % 2 == 1) {
    x = (x - 1) * this.szGrid + this.hszGrid;
  } else {
    x = (x - 1) * this.szGrid + this.hszGrid - 1;
  }

  if (this.szGrid % 2 == 1) {
    y = (y - 1) * this.szGrid + this.hszGrid;
  } else {
    y = (y - 1) * this.szGrid + this.hszGrid - 1;
  }

  if (Stone == "White") {
    lcolor = "navy";
  } else {
    lcolor = "yellow";
  }
  k = parseInt((this.szGrid - 1) / 3);

  this.Context.beginPath();
  for (i = 0; i <= k - 2; i++) {
    this.Context.moveTo(x - i, y - parseInt(k / 2) + i + 0.5);
    this.Context.lineTo(x + i + 1, y - parseInt(k / 2) + i + 0.5);
  }
  this.Context.strokeStyle = lcolor;
  this.Context.stroke();
  this.Context.fillStyle = lcolor;
  this.Context.fill();
};

TOrOGoPB.prototype.CopyStoneImage = function(
  Stone,
  dx,
  dy //draw stone to map
) {
  if (Stone == "Black") {
    this.Context.drawImage(
      resourcePreLoader.GetImage("../image/bs40.png"),
      dx+3,
      dy+2
    );
  } else {
    this.Context.drawImage(
      resourcePreLoader.GetImage("../image/ws40.png"),
      dx+3,
      dy+2
    );
  }
};

TOrOGoPB.prototype.DrawGridBitmap = function(l, t) {
  var a, b, x, y, w, h, dw, dh;
  w = this.bdW;
  h = this.bdH;
  x = l % w;
  y = t % h;
  a = w - x;
  b = h - y;

  if (w - x <= this.szGrid) {
    dw = w - x;
  } else {
    dw = this.szGrid;
  }

  if (h - y <= this.szGrid) {
    dh = h - y;
  } else {
    dh = this.szGrid;
  }

  this.Context.drawImage(this.boardImg, x, y, dw, dh, l, t, dw, dh);

  if (x + this.szGrid > w) {
    this.Context.drawImage(
      this.boardImg,
      0,
      y,
      this.szGrid - a,
      dh,
      l + a,
      t,
      this.szGrid - a,
      dh
    );
  }
  if (y + this.szGrid > h) {
    this.Context.drawImage(
      this.boardImg,
      x,
      0,
      dw,
      this.szGrid - b,
      l,
      t + b,
      dw,
      this.szGrid - b
    );
  }
  if (x + this.szGrid > w && y + this.szGrid > h) {
    this.Context.drawImage(
      this.boardImg,
      0,
      0,
      this.szGrid - a,
      this.szGrid - b,
      l + a,
      t + b,
      this.szGrid - a,
      this.szGrid - b
    );
  }
};

TOrOGoPB.prototype.RemoveReline = function(x, y) {
  var gx, gy, sx, ex, sy, ey;
  gx = (x - 1) * this.szGrid;
  gy = (y - 1) * this.szGrid;

  this.DrawGridBitmap(gx, gy);
  sx = gx;
  ex = gx + this.szGrid;
  sy = gy;
  ey = gy + this.szGrid;

  if (x == 1) {
    sx = sx + this.hszGrid;
  } else if (x == this.line) {
    ex = ex - this.hszGrid;
  }

  if (y == 1) {
    sy = sy + this.hszGrid;
  } else if (y == this.line) {
    ey = ey - this.hszGrid;
  }

  this.Context.strokeStyle = "black";
  this.Context.beginPath();
  this.Context.moveTo(sx, gy + this.hszGrid + 0.5);
  this.Context.lineTo(ex, gy + this.hszGrid + 0.5);
  this.Context.moveTo(gx + this.hszGrid + 0.5, sy);
  this.Context.lineTo(gx + this.hszGrid + 0.5, ey);
  this.Context.stroke();

  if (this.line == 19) {
    if ((x == 4 || x == 10 || x == 16) && (y == 4 || y == 10 || y == 16)) {
      this.DrawSpecialPoint(x, y);
    }
  } else if (this.line == 13) {
    if ((x == 4 || x == 10) && (y == 4 || y == 10)) {
      this.DrawSpecialPoint(x, y);
    }
  } else {
    if (x == 5 && y == 5) {
      this.DrawSpecialPoint(x, y);
    }
  }
};

TOrOGoPB.prototype.CCordXY = function(X, Y) {
  var XY = [];
  XY[0] = this.line + 1 - X;
  XY[1] = this.line + 1 - Y;

  return XY;
};

TOrOGoPB.prototype.Ellipse = function(sx, sy, ex, ey) {
  this.Context.beginPath();
  this.Context.moveTo(sx, sy + parseInt((ey - sy) / 2));
  this.Context.bezierCurveTo(sx, ey, ex, ey, ex, sy + parseInt((ey - sy) / 2));
  this.Context.moveTo(sx, sy + parseInt((ey - sy) / 2));
  this.Context.bezierCurveTo(sx, sy, ex, sy, ex, sy + parseInt((ey - sy) / 2));
  this.Context.stroke();
  this.Context.fill();
  this.Context.closePath();
};

TOrOGoPB.prototype.DrawSpecialPoint = function(x, y) {
  var k;

  this.Context.strokeStyle = "black";
  this.Context.beginPath();

  x = (x - 1) * this.szGrid + this.hszGrid;
  y = (y - 1) * this.szGrid + this.hszGrid;

  if (this.szGrid < 20) {
    for (k = -1; k <= 1; k++) {
      this.Context.moveTo(x - (2 - Math.abs(k)), y + k + 0.5);
      this.Context.lineTo(x + (3 - Math.abs(k)), y + k + 0.5);
    }
  } else {
    for (k = -2; k <= 2; k++) {
      this.Context.moveTo(x - (3 - Math.abs(k)), y + k + 0.5);
      this.Context.lineTo(x + (4 - Math.abs(k)), y + k + 0.5);
    }
  }
  this.Context.stroke(); //add point(mark)
};

TOrOGoPB.prototype.DrawBoardBitMap = function() {
  var i, j, w, h, x, y;

  if (this.DrawOn) {
    return;
  }

  this.DrawOn = true;

  if (this.bdW > this.szBoard) {
    w = this.szBoard;
  } else {
    w = this.bdW;
  }

  if (this.bdH > this.szBoard) {
    h = this.szBoard;
  } else {
    h = this.bdH;
  }

  x = parseInt(this.szBoard / w);
  y = parseInt(this.szBoard / h);

  this.pat = this.Context.createPattern(this.boardImg, "repeat");
  this.Context.rect(0, 0, this.theCanvas.width, this.theCanvas.height);
  this.Context.fillStyle = this.pat;
  this.Context.fill();
  this.Context.clearRect(
    this.theCanvas.width - this.XYMarkG,
    0,
    this.theCanvas.width,
    this.theCanvas.height
  );
  this.Context.clearRect(
    0,
    this.theCanvas.height - this.XYMarkG,
    this.theCanvas.width,
    this.theCanvas.height
  );

  this.DrawEdge();

  this.DrawOn = false;
};

TOrOGoPB.prototype.ClearSeqMark = function() {
  var i, j;

  for (i = 0; i <= 19; i++) {
    for (j = 0; j <= 19; j++) {
      this.MarkB[i][j] = 0;
    }
  }

  for (i = 0; i <= 19; i++) {
    for (j = 0; j <= 19; j++) {
      if (this.Board[i][j] != "Empty") {
        this.DrawStone(this.Board[i][j], j, i, 0);
      }
    }
  }
};

TOrOGoPB.prototype.SetSeqMarkB = function(SeqMB) {
  var i, j;

  this.MarkB = SeqMB;

  for (i = 1; i <= 19; i++) {
    for (j = 1; j <= 19; j++) {
      if (this.MarkB[i][j] > 0) {
        this.DrawMark(j, i, this.MarkB[i][j], false);
      }
    }
  }
};

TOrOGoPB.prototype.SetBoard = function(IniBoard, Lines) {
  var i, j;

  this.Board = IniBoard;
  for (i = 1; i <= 19; i++) {
    for (j = 1; j <= 19; j++) {
      this.MarkB[i][j] = 0;
    }
  }
  this.line = Lines;
  this.DrawGoBoard();
};

TOrOGoPB.prototype.SetEdge = function(BeBmp, GColor) {
  var x, y;
  this.FBeBmp = BeBmp;
  this.FGColor = GColor;
  this.DrawEdge();
  this.DrawEdgeXY();
};

TOrOGoPB.prototype.DrawEdge = function() //make border(shadow), maybe remove it
{
  var x, y;

  x = this.szBoard;
  y = this.szBoard;
  this.Context.drawImage(this.FBeBmp, 3, 0, 7, 5, x, 0, 7, 5);
  for (i = 5; i <= y - 1; i++) {
    this.Context.drawImage(this.FBeBmp, 3, 4, 7, 1, x, i, 7, 1);
  }

  this.Context.drawImage(this.FBeBmp, 3, 5, 3, 7, 0, y, 3, 7);
  for (i = 3; i <= x - 1; i++) {
    this.Context.drawImage(this.FBeBmp, 2, 5, 1, 7, i, y, 1, 7);
  }
  this.Context.drawImage(this.FBeBmp, 3, 5, 7, 7, x, y, 7, 7);
};

TOrOGoPB.prototype.DrawEdgeXY = function() {
  var i, j, e, h, w, BI, BP, WI, WP, s, ss, ts;
  var fname, fsize;

  if (this.szGrid < 20) {
    fname = "MS Serif";
  } else {
    fname = "Times New Roman";
  }

  if (this.szGrid < 15) {
    fsize = "8";
  } else if (this.szGrid > 40) {
    fsize = "13";
  } else {
    fsize = parseInt(this.szGrid / 3);
  }

  this.Context.font = fsize + "px " + fname;
  this.Context.fillStyle = this.FGColor;

  if (this.XYMarkG > 10) {
    //add text of point(1-19, A-S)
    for (i = 0; i <= this.line - 1; i++) {
      s = i + 1;
      s = s.toString();
      if (s.length == 1) {
        s = " " + s;
      }

      ss = this.line - 1;
      ss = ss.toString();
      if (s.length == 1) {
        ss = " " + ss;
      }

      if (this.CCord) {
        ts = s;
        s = ss;
        ss = ts;
      }

      w = 4;
      this.Context.textAlign = "left";
      this.Context.textBaseline = "middle";
      this.Context.fillText(
        s,
        this.szBoard + w,
        this.szGrid * i + parseInt(this.szGrid / 2)
      );

      s = String.fromCharCode(65 + i);
      ss = String.fromCharCode(65 + 18 - i);
      w = parseInt((this.szGrid - this.Context.measureText(s).width) / 2) + 3;
      h = 6;
      if (this.CCord) {
        ts = s;
        s = ss;
        ss = ts;
      }
      this.Context.textAlign = "center";
      this.Context.textBaseline = "top";
      this.Context.fillText(s, this.szGrid * i + w, this.szBoard + h);
    }
  }
};

TOrOGoPB.prototype.SetXYMarkG = function(Value) {
  if (Value >= 0 && Value != this.XYMarkG) {
    this.XYMarkG = Value;
  }
};
