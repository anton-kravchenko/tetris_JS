function drawGrid()
{

var dx = canvasW /2 - gridSizeX / 2 * blockSizeX;
var dy = startY;

	for(var col = 0; col < gridSizeY; col++)
	{
		for(var raw = 0; raw < gridSizeX; raw++)
		{

		ctx.fillStyle = 'Chartreuse';								//change fill color
		ctx.clearRect(	dx + raw * blockSizeX, 						// need to use color of block	
						startY + col * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = grid[col * gridSizeX + raw].color;

		ctx.fillRect(	dx + raw * blockSizeX, 
						startY + col * blockSizeY, 
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