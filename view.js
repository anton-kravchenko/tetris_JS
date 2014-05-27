function drawGrid()
{
	var dx = canvasW /2 - gridSizeX / 2 * blockSizeX + blockSizeX;
	var dy = startY;
	for(var raw = 0; raw < gridSizeY; raw++)
	{
		for(var col = 1; col < gridSizeX + 1; col++)				// col = 1; col < gridsizex + 1; col-1  => 
		{	

		ctx.fillStyle = 'Chartreuse';								//change fill color
		ctx.clearRect(	dx + (col - 1) * blockSizeX, 						// need to use color of block	
						startY + raw * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = grid[raw][col].color;

		ctx.fillRect(	dx + (col - 1) * blockSizeX, 
						startY + raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}

	}
}

function drawBorder()
{
	var dx = canvasW /2 - gridSizeX / 2 * blockSizeX + blockSizeX;
	var dy = startY;
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, canvasW, canvasH);

	ctx.strokeStyle = borderColor; 
	ctx.lineWidth = borderThickness;
	ctx.beginPath();
	ctx.moveTo(dx - borderThickness / 2 , startY);
	ctx.lineTo(dx - borderThickness / 2 , gridSizeY * blockSizeY + borderThickness/2 + startY);
	ctx.lineTo(dx + gridSizeX * blockSizeX + borderThickness / 2, gridSizeY * blockSizeY  + borderThickness/2 + startY);
	ctx.lineTo(dx + gridSizeX * blockSizeX + borderThickness / 2, startY);
	ctx.stroke();
}