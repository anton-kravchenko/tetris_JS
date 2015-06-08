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


var currentBlockNumber = generateRandomBlockIndex();
var nextBlockNumber    = generateRandomBlockIndex();

var firstBlock = true;
drawBlockPreview();
var currentBlock = createNewBlock();


function createNewBlock()
{
	if(firstBlock){
		firstBlock = false;
	} else {
		currentBlockNumber = nextBlockNumber;
		nextBlockNumber = generateRandomBlockIndex();
		drawBlockPreview();
	}
	
	if( 0 == currentBlockNumber) return new SquareBlock();
	if( 1 == currentBlockNumber) return new LineBlock();
	if( 2 == currentBlockNumber) return new StairBlock();
	if( 3 == currentBlockNumber) return new ZLeftBlock();
	if( 4 == currentBlockNumber) return new ZRightBlock();
	if( 5 == currentBlockNumber) return new GRightBlock();
	if( 6 == currentBlockNumber) return new GLeftBlock();

}

function generateRandomBlockIndex(){
	return (Math.random() * (NUMBER_OF_BLOCKS - 1)).toFixed();
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

function setLossFlag(flag)
{
	LOSS = flag;
	if(LOSS){
		var bestScore = localStorage.getItem('bestScore');
		if(bestScore){
			if(bestScore < SCORE){
				localStorage.setItem('bestScore', SCORE);
			}
		} else {
			localStorage.setItem('bestScore', SCORE);
		}
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
			highlightFullLine(raw);
			drawGridDelay = 1;
			setTimeout(drawGrid, 200);

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
	// drawGrid();
}