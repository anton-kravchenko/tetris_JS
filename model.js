var ex = document.getElementById("ex");
var ctx = ex.getContext("2d");

ex.width = canvasW;
ex.height = canvasH;

var grid; 
initGrid();
drawBorder();
drawGrid();

function initGrid()
{
	grid = new Array(gridSizeY + 1);					// +1 - to create safe pillow ( we don't need to handle outOfBounds because of her)
	for(var i = 0; i < (gridSizeY +1 ); i++)
		grid[i] = new Array(gridSizeX+1);
	
	for (var i = 0; i <  (gridSizeY + 1); i++) 			
		for(var j = 0; j < (gridSizeX +1 ); j++)
		{
				// grid[i][j].color = backgroundColor;
			var isEmpty = true; 
			if( 0 == j | gridSizeX == j ) isEmpty = false;

			grid[i][j] = new Tile(isEmpty, backgroundColor);

			if( gridSizeY == i)
				grid[i][j].isEmpty = false
		}

}

var currentBlock = createNewBlock();

function createNewBlock()
{
	//add few block where
	return new SquareBlock();
	return new SimpleBlock();
}

// anim();
function anim()
{
	currentBlock.movePlus( 0, dy); 
	setTimeout(anim, speed);
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

function clearFullLines()
{

	for(var raw = gridSizeY ; i > 0; i--)
	{
		var fullLine = true;
		for(var col = 1; j < gridSizeX + 1; j++)
		{
			if( true == grid[raw][col].isEmpty) fullLine = false;
		}
		
		if(fullLine)
		{
			console.log("line " + i + " is full");
			var currentLine = i;
			while(currentLine > 0)
			{
				for(var k = 1; k < gridSizeX + 1; k++) /// need to fix to use safty pillow
				{
					grid[currentLine * gridSizeX + k].isEmpty = grid[(currentLine - 1) * gridSizeX + k].isEmpty;	
					grid[currentLine * gridSizeX + k].color = grid[(currentLine - 1) * gridSizeX + k].color;
				}
				currentLine--;
			}
			// debugger;
			i++;
		}
	}
	drawGrid();
}