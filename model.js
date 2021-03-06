var ex = document.getElementById("ex");
var ctx = ex.getContext("2d");

ex.width = canvasW;
ex.height = canvasH;

var blockNum = 0;

var grid; 
initGrid();
drawBorder();
drawGrid();

function initGrid()
{
	grid = new Array(gridSizeY + 1);					// +1 - to create safe pillow ( we don't need to handle outOfBounds because of her)
	for(var i = 0; i < (gridSizeY +1 ); i++)
		grid[i] = new Array(gridSizeX+2);
	
	for (var i = 0; i <  (gridSizeY + 1); i++) 			
		for(var j = 0; j < (gridSizeX + 2 ); j++)
		{
				// grid[i][j].color = backgroundColor;
			var isEmpty = true; 
			if( 0 == j | (gridSizeX+1) == j ) isEmpty = false;

			grid[i][j] = new Tile(isEmpty, backgroundColor);

			if( gridSizeY == i)
				grid[i][j].isEmpty = false
		}

}

var currentBlock = createNewBlock();

function createNewBlock()
{
	blockNum = (Math.random() * (NUMBER_OF_BLOCKS - 1)).toFixed();
	if( 0 == blockNum) return new SquareBlock();
	if( 1 == blockNum) return new LineBlock();
	if( 2 == blockNum) return new StairBlock();
	if( 3 == blockNum) return new ZLeftBlock();
	if( 4 == blockNum) return new ZRightBlock();
	if( 5 == blockNum) return new GRightBlock();
	if( 6 == blockNum) return new GLeftBlock();

}

anim();
function anim()
{
	if(!LOSS)
	{
		currentBlock.moveDown(); 
		setTimeout(anim, speed);
	}
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

	var scoreMultiplier = 1;

	for(var raw = gridSizeY-1; raw > 0; raw--)
	{
		var fullLine = true;
		for(var col = 1; col < gridSizeX + 1; col++)
		{
			if( true == grid[raw][col].isEmpty) fullLine = false;
		}
		
		if(fullLine)
		{
			SCORE += gridSizeX * scoreMultiplier++;

			var currentLine = raw;
			while(currentLine > 0)
			{
				for(var col = 1; col < gridSizeX+1; col++) 
				{
					grid[currentLine][col].isEmpty 	= 	grid[currentLine - 1][col].isEmpty;	
					grid[currentLine][col].color 	=	grid[currentLine - 1][col].color;	
				}
				currentLine--;
			}
			raw++;
			speed-=5;
		}
	}
	drawGrid();
}