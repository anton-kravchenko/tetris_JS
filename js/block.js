function SimpleBlock () {
	color = 'Gold';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
}

SimpleBlock.prototype = {
	draw: function () {
		
		ctx.fillStyle = color;
		ctx.fillRect(	borderX + col * blockSizeX, 
						borderY + raw * blockSizeY, 
						blockSizeX, blockSizeY );
	},
	clear: function () {
		ctx.clearRect(	borderX + col * blockSizeX, 
						borderY + raw * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = backgroundColor;

		ctx.fillRect(	borderX + col * blockSizeX, 
						borderY + raw * blockSizeY, 
						blockSizeX, blockSizeY );
	},
	moveDown: function (){
		this.move(DOWN);
	},
	moveLeft: function (){
		this.move(LEFT);
	},
	moveRight: function (){
		this.move(RIGHT);
	},
	move: function (dir){

	var canMove = false;


	var outOfBounds = false;
	var downMove = false;

	this.clear();
	
	if ( DOWN  == dir) raw++;
	if ( LEFT  == dir) col--;
	if ( RIGHT == dir) col++;


	if(col > -1 && col < gridSizeX && raw < gridSizeY)
	{

		if(true == grid[raw*gridSizeX + col].isEmpty)
		{
			canMove = true;
			this.draw();
		}

	} else outOfBounds = true;

	if(true == outOfBounds)
	{
		if ( DOWN  == dir) raw--;
		if ( LEFT  == dir) col++;
		if ( RIGHT == dir) col--;
		
		gridCell = raw * gridSizeX + col;
		this.draw();
		if((gridSizeY -1) == raw )
		{
			grid[gridCell].isEmpty = false;
			grid[gridCell].color = this.color;
			clearFullLines();

				delete currentBlock;
			currentBlock = nextBlock; nextBlock = createNewBlock();
		}
		console.log("outOfBounds; raw = " + raw + " " + gridCell);
	}	
		if(false == canMove && false == outOfBounds)
		{
			if(DOWN == dir)
			{

				if ( DOWN  == dir) raw--;
				if ( LEFT  == dir) col++;
				if ( RIGHT == dir) col--;

				gridCell = raw * gridSizeX + col;
				this.draw();

				grid[gridCell].isEmpty = false;
				grid[gridCell].color = this.color;
				clearFullLines();

					delete currentBlock;
				currentBlock = nextBlock; nextBlock = createNewBlock();
			} else {
				if ( LEFT  == dir) col++;
				if ( RIGHT == dir) col--;
				this.draw();
			}
		} 
	}
};