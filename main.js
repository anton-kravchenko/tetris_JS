var ex = document.getElementById("ex");
var ctx = ex.getContext("2d");

var canvasW = 1200;
var canvasH = 700;
ex.width = canvasW;
ex.height = canvasH;


var blockSizeX  = 24;
var blockSizeY  = 24;
var dx = blockSizeX ;
var dy = blockSizeY ;
var startY = 150;
var startX = canvasW/2 ;
var gridSizeX = 10;
var gridSizeY = 20;

var backgroundColor = '#333333';
var borderColor = '#777777';
var borderThickness = 2;

ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvasW, canvasH);

ctx.strokeStyle = borderColor; 
ctx.lineWidth = borderThickness;
ctx.beginPath();
ctx.moveTo(canvasW/2 - gridSizeX/2 * blockSizeX - borderThickness / 2 , startY);
ctx.lineTo(canvasW/2 - gridSizeX/2 * blockSizeX - borderThickness / 2 , gridSizeY * blockSizeY + borderThickness/2 + startY);
ctx.lineTo(canvasW/2 + gridSizeX/2 * blockSizeX + borderThickness / 2, gridSizeY * blockSizeY  + borderThickness/2 + startY);
ctx.lineTo(canvasW/2 + gridSizeX/2 * blockSizeX + borderThickness / 2, startY);

ctx.stroke();
document.onkeydown = function(e) {
    e = e || event; // "real browsers" || IE6/7.
    switch (e.keyCode) {
        case 38: 
        	if(b.y > startY)
        		b.movePlus( 0, -dy); break; //up
        case 40: 
        	if(b.y < gridSizeY * blockSizeY - blockSizeY + startY)
        		b.movePlus( 0, dy); break; // down

        case 37: 
        	if (b.x > canvasW/2 - gridSizeX/2 * blockSizeX)
        		b.movePlus(-dx, 0); break; //left
        case 39: 
        	if (b.x < canvasW/2 + gridSizeX/2 * blockSizeX -blockSizeX)
        		b.movePlus( dx, 0); break; //right
    }
}



function Block (x, y) {
	this.x = x;
	this.y = y;
	color = '#dfef00';
}
Block.prototype = {
	drawMe: function () {
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, blockSizeX , blockSizeY );
	},
	movePlus: function (dx, dy){
		ctx.clearRect(this.x, this.y, blockSizeX , blockSizeY );
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(this.x, this.y, blockSizeX , blockSizeY );
		this.x += dx;
		this.y += dy;
		console.log(" after " + this.x + " " + this.y);
		this.drawMe();
	}
};


i = 0;
var colors = ['#33ffc5', '#00ce0f', '#c00fff'];
var b = new Block(startX, startY);
anim();
function anim()
{
	if(b.y < gridSizeY * blockSizeY - blockSizeY + startY)
	{
		b.movePlus(0, dy);
		b.drawMe();
		i++;
		color = colors[i%3];
		if(i < 30)
		setTimeout(anim, 500);
	}
}
