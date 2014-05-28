function drawGrid()
{

	var dx = canvasW /2 - gridSizeX / 2 * blockSizeX + blockSizeX;			
	var dy = startY;
	for(var raw = 0; raw < gridSizeY; raw++)
	{
		for(var col = 1; col < gridSizeX + 1; col++)				// col = 1; col < gridsizex + 1; col-1  => 
		{	

		ctx.fillStyle = 'Chartreuse';								
		ctx.clearRect(	dx + (col - 1) * blockSizeX, 				
						startY + raw * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = grid[raw][col].color;

		ctx.fillRect(	dx + (col - 1) * blockSizeX, 
						startY + raw * blockSizeY, 
						blockSizeX, blockSizeY );

		if(false == grid[raw][col].isEmpty)							
		{
		ctx.strokeStyle = 'backgroundColor';
		ctx.beginPath();											// add stroke to each filled tile
			ctx.moveTo(dx + (col - 1) * blockSizeX -1 , startY + raw * blockSizeY);
			ctx.lineTo(dx + (col - 1) * blockSizeX  + blockSizeX -1, startY + raw * blockSizeY);
			ctx.lineTo(dx + (col - 1) * blockSizeX  + blockSizeX -1, startY + raw * blockSizeY + blockSizeY);
			ctx.lineTo(dx + (col - 1) * blockSizeX, startY + raw * blockSizeY + blockSizeY);
			ctx.lineTo(dx + (col - 1) * blockSizeX, startY + raw * blockSizeY);
		ctx.stroke();	
		}
		}

	}
	drawScore();
}
function drawScore()
{

	ctx.clearRect(dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY - 100, 200,150);
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY - 100, 200,150);	
	ctx.font="40px Verdana";
	// Create gradient
	var gradient=ctx.createLinearGradient(0,0,canvasW,canvasH);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	// Fill with gradient
	ctx.fillStyle=gradient;
	ctx.fillText("SCORE:", dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY - 50);
	ctx.fillText(SCORE, dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY +5 );
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