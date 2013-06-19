//Base Set

var print = function(v){console.log(v)};

function Coord2D(x,y){
    if(x != undefined && y != undefined){
        this.x = x;
        this.y = y;
    }
}

Coord2D.prototype = {
    x:0,
    y:0
}


staticData = {
    leg:{
            size:new Coord2D(3,24)
        }
}

//Model set

function Primitive(){
    //duck typing baseclass
}
Primitive.prototype = {
    pos:new Coord2D(),
    size:new Coord2D(staticData.leg.size.x,staticData.leg.size.y),
    center:new Coord2D(),
    rotate:0 //this parameter is degree,not radian.
}

function Leg(){
    this.moveStatement = 0;
}

function Leg.prototype = new Primitive();

function LegSet(){
    this.upperLeg.
    this.lowerLeg.
}

LegSet.prototype={
    upperLeg:new Leg(),
    lowerLeg:new Leg(),
    procedure:function(obj){},
    listener:function(obj){},
}

function Body(){}
Body.prototype = new Primitive();

function BodySet(){}
BodySet.prototype = {
    legSet = new LegSet()
}

//View Set

function LegV(bmp){
    this.bmp = bmp;
}

LegV.prototype = {
    bmp:null
}

function LegSetV(obje){
    this.upperLeg = new LegV(obje.upperLegBmp),
    this.lowerLeg = new LegV(obje.lowerLegBmp),
}

LegSetV.prototype = {
    upperLeg:null,
    lowerLeg:null,
    procdure:function(obj){},
    listener:function(obj){},
}

function BodyV(obje){
    this.bmp = obje.BodyBmp;
}

BodyV.prototype = {
    bmp:null
}

function BodySetV(obje){
    this.legSetV = new LegSetV(obje);
    this.bodyV   = new BodyV(obje);
}

BodySetV.prototype = {
    legSetV:null,
    bodyV:null
}
