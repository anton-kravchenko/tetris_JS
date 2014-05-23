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
var colors = ['#33ffc5', '#00ce0f', '#c00fff'];


var grid = new Array(gridSizeX * gridSizeY);
for(var i = 0; i < gridSizeX * gridSizeY; i++)	grid[i] = 0;

drawBorder();

document.onkeydown = function(e) {
    e = e || event; // "real browsers" || IE6/7.
    switch (e.keyCode) {
        case 38: 
        	if(currentBlock.y > startY)
        		currentBlock.movePlus( 0, -dy); break; //up
        			
        case 40: 
        	if(currentBlock.y < gridSizeY * blockSizeY - blockSizeY + startY)
        	{
        		currentBlock.movePlus( 0, dy); 
        	} else currentBlock = createNewBlock(startX, startY);

        	break; // down

        case 37: 
        	if (currentBlock.x > canvasW/2 - gridSizeX/2 * blockSizeX)
        		currentBlock.movePlus(-dx, 0); break; //left
        case 39: 
        	if (currentBlock.x < canvasW/2 + gridSizeX/2 * blockSizeX -blockSizeX)
        		currentBlock.movePlus( dx, 0); break; //right
    }
}


function Block (x, y) {
	this.x = x;
	this.y = y;
	color = '#33ffc5';
	currentPos = defineGridIndex(x,y);
	prevPos = -1;
	this.drawMe();
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

		var nextIndex = defineGridIndex(this.x + dx, this.y + dy);
		console.log("cur = " + currentPos + "; grid["+nextIndex+"] = " + grid[nextIndex]);
		// if(true == nextIndex)
		if(0 == grid[nextIndex])
		{
			console.log("move");
			this.x += dx;
			this.y += dy;
			
			prevPos = currentPos;
			currentPos = defineGridIndex(this.x, this.y);

			grid[prevPos] = 0;
			grid[currentPos] = 1;
		} else {
			// debugger;
			console.log("new block");
			currentBlock = createNewBlock();
		}
			this.drawMe();
	}
};

var currentBlock = createNewBlock();

function createNewBlock()
{
	//add few block where
	return new Block(startX, startY);
}

anim();
function anim()
{
	if(currentBlock.y < gridSizeY * blockSizeY - blockSizeY + startY)
	{
		currentBlock.movePlus( 0, dy); 
	} else currentBlock = createNewBlock(startX, startY);
	// setTimeout(anim, 500);
}

function checkNextGridPlace(x, y)
{
	var index = defineGridIndex(x, y);
	console.log("next = " + index);
	if(0 == grid[index]) return true;
	return false;
}

function defineGridIndex(x, y)
{

	var dx = (((x-canvasW/2+gridSizeX/2 * blockSizeX) / blockSizeX) % gridSizeX);
	var dy = ((y - startY) / blockSizeY);
	var pos = dy * gridSizeX + dx;
	return dy * gridSizeX + dx;
}

function drawBorder()
{
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
}