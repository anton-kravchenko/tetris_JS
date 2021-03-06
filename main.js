var ex = document.getElementById("ex");
var ctx = ex.getContext("2d");

ex.width = canvasW;
ex.height = canvasH;

var grid = [];
initGrid();
drawGrid();
drawBorder();

function initGrid()
{
	for (var i = 0; i < gridSizeX * gridSizeY; i++) 
	{
	    grid.push({
	        isEmpty: true,
	        color: backgroundColor
	    });
	}

	for(var i = 107; i < 200; i+=3)
	{
		grid[i].color = 'DarkGreen';
		grid[i].isEmpty = false;
	}	
}

var currentBlock = createNewBlock();

function createNewBlock()
{
	//add few block where
	return new Block(startX, startY);
}

anim();
function anim()
{
	currentBlock.movePlus( 0, dy); 
	setTimeout(anim, speed);
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

