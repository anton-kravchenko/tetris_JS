function drawGrid()
{
	if(drawGridDelay > 0){
		drawGridDelay--;
		console.log(drawGridDelay);
		return;
	}
	var dx = canvasW /2 - gridSizeX / 2 * blockSizeX + blockSizeX;			
	var dy = startY;
	for(var raw = 0; raw < gridSizeY; raw++)
	{
		for(var col = 1; col < gridSizeX + 1; col++)				
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
	drawBestScore();
}

function drawBlockPreview(){
	var nextBlock= {};
		if( 0 == nextBlockNumber) nextBlock = new SquareBlock(false);
		if( 1 == nextBlockNumber) nextBlock = new LineBlock(false);
		if( 2 == nextBlockNumber) nextBlock = new StairBlock(false);
		if( 3 == nextBlockNumber) nextBlock = new ZLeftBlock(false);
		if( 4 == nextBlockNumber) nextBlock = new ZRightBlock(false);
		if( 5 == nextBlockNumber) nextBlock = new GRightBlock(false);
		if( 6 == nextBlockNumber) nextBlock = new GLeftBlock(false);

	clearPreviewArea();
	drawPreviewText();
	nextBlock.draw(previewBlockPosition);
}
function drawPreviewText(){
ctx.font="40px Verdana";
	var gradient=ctx.createLinearGradient(0,0,canvasW,canvasH);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	ctx.fillStyle=gradient;
	ctx.fillText("NEXT:", previewBlockPosition.borderX - 50, previewBlockPosition.borderY + 45 );
}

function clearPreviewArea(){
	ctx.clearRect(previewBlockPosition.borderX, previewBlockPosition.borderY, 200, 200);
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(previewBlockPosition.borderX, previewBlockPosition.borderY, 200, 200);	
}
function drawScore()
{

	ctx.clearRect(dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY - 100, 200,150);
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY - 100, 200,150);	
	ctx.font="40px Verdana";
	var gradient=ctx.createLinearGradient(0,0,canvasW,canvasH);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	ctx.fillStyle=gradient;
	ctx.fillText("SCORE:", dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY - 50);
	ctx.fillText(SCORE, dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY +5 );
}
function drawBestScore()
{
	var bestScore = localStorage.getItem('bestScore');
	if(bestScore){
		ctx.clearRect(dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY + 100, 200,150);
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY + 50, 200,150);	
		ctx.font="40px Verdana";
		var gradient=ctx.createLinearGradient(0,0,canvasW,canvasH);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		ctx.fillStyle=gradient;
		ctx.fillText("BEST SCORE:", dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY + 50);
		ctx.fillText(bestScore, dx + gridSizeX*blockSizeX + 100,startY + gridSizeY/2 * blockSizeY +100 );
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

function highlightFullLine(raw){
	// var startX = borderX;
	// var startY = borderY + raw * blockSizeY;
	// var width  = blockSizeX*gridSizeX;
	// var height = blockSizeY;

	// ctx.fillStyle = 'white';
	// ctx.fillRect(startX + blockSizeX, startY, width, height);

	// ctx.fillStyle = 'white';
	// ctx.fillRect(100, 100, 300, 300);

	for(var col = 1; col < gridSizeX+1; col++) 
	{
		grid[raw][col].color 	=	'white';	
	}
	drawGrid();
}