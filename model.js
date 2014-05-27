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
	//add few block where
	blockNum++;
	if( 0 == blockNum % NUMBER_OF_BLOCKS) return new SquareBlock();
	if( 1 == blockNum % NUMBER_OF_BLOCKS) return new LineBlock();
	if( 2 == blockNum % NUMBER_OF_BLOCKS) return new StairBlock();
	if( 3 == blockNum % NUMBER_OF_BLOCKS) return new ZLeftBlock();
	if( 4 == blockNum % NUMBER_OF_BLOCKS) return new ZRightBlock();
	if( 5 == blockNum % NUMBER_OF_BLOCKS) return new GRightBlock();
	if( 6 == blockNum % NUMBER_OF_BLOCKS) return new GLeftBlock();

	// return new SquareBlock();
	// return new SimpleBlock();
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

	for(var raw = gridSizeY-1; raw > 0; raw--)
	{
		var fullLine = true;
		for(var col = 1; col < gridSizeX + 1; col++)
		{
			if( true == grid[raw][col].isEmpty) fullLine = false;
		}
		
		if(fullLine)
		{
			debugger;
			console.log("line " + raw + " is full");
			var currentLine = raw;
			while(currentLine > 0)
			{
				for(var col = 1; col < gridSizeX+1; col++) /// need to fix to use safty pillow
				{
					grid[currentLine][col].isEmpty 	= 	grid[currentLine - 1][col].isEmpty;	
					grid[currentLine][col].color 	=	grid[currentLine - 1][col].color;	
				}
				currentLine--;
			}
			// debugger;
			raw++;
		}
	}
	drawGrid();
}