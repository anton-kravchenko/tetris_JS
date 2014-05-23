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
var speed = 250;

var backgroundColor = '#333333';
var borderColor = '#777777';
var borderThickness = 2;
var colors = ['#33ffc5', '#00ce0f', '#c00fff'];

var grid = [];
for (var i = 0; i < gridSizeX * gridSizeY; i++) {
    grid.push({
        isEmpty: true,
        color: backgroundColor
    });
}
for(var i = 100; i < 200; i+=3)
{
	grid[i].color = 'DarkGreen';
	grid[i].isEmpty = false;
}
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
        	} 
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
	color = 'Gold';
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
		if(nextIndex > 190)
		{
			console.log(nextIndex);
		}
		if(true == grid[nextIndex].isEmpty)
		{
			this.x += dx;
			this.y += dy;
			
			prevPos = currentPos;
			currentPos = defineGridIndex(this.x, this.y);

			grid[prevPos].isEmpty = true;
			grid[prevPos].color = backgroundColor;

			grid[currentPos].isEmpty = false;
			grid[currentPos].color = this.color;
			this.drawMe();
		} else {
			this.drawMe();
			clearFullLines();
			delete currentBlock;
			currentBlock = createNewBlock();
		}
		if (nextIndex >= gridSizeX * (gridSizeY -1)) 
		{
			clearFullLines();
		}
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
	setTimeout(anim, speed);
}

function drawGrid()
{

var dx = canvasW /2 - gridSizeX / 2 * blockSizeX;
var dy = startY;

	for(var col = 0; col < gridSizeY; col++)
	{
		for(var raw = 0; raw < gridSizeX; raw++)
		{

		ctx.fillStyle = 'Chartreuse';		
		ctx.clearRect(	dx + raw * blockSizeX, 
						startY + col * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = grid[col * gridSizeX + raw].color;

		ctx.fillRect(	dx + raw * blockSizeX, 
						startY + col * blockSizeY, 
						blockSizeX, blockSizeY );
		}

	}
}

function clearFullLines()
{
	for(var i = gridSizeY - 1; i > 0; i--)
	{
		var fullLine = true;
		for(var j = 0; j < gridSizeX; j++)
		{
			if( true == grid[i * gridSizeX + j].isEmpty) fullLine = false;
		}
		
		if(fullLine)
		{
			var currentLine = i;
			while(currentLine > 0)
			{
				for(var k = 0; k < gridSizeX; k++)
				{
					grid[currentLine * gridSizeX + k].isEmpty = grid[(currentLine - 1) * gridSizeX + k].isEmpty;	
					grid[currentLine * gridSizeX + k].color = grid[(currentLine - 1) * gridSizeX + k].color;
				}
				currentLine--;
			}
			// debugger;
		}
	}
	drawGrid();
}

function checkNextGridPlace(x, y)
{
	var index = defineGridIndex(x, y);
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