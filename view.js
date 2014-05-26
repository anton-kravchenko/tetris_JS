function drawGrid()
{
var dx = canvasW /2 - gridSizeX / 2 * blockSizeX;
var dy = startY;

	for(var raw = 0; raw < gridSizeY; raw++)
	{
		for(var col = 0; col < gridSizeX; col++)
		{

		ctx.fillStyle = 'Chartreuse';								//change fill color
		ctx.clearRect(	dx + col * blockSizeX, 						// need to use color of block	
						startY + (raw - 1 )* blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = grid[raw][col + 1].color;

		ctx.fillRect(	dx + col * blockSizeX, 
						startY + (raw - 1) * blockSizeY, 
						blockSizeX, blockSizeY );
		}

	}
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