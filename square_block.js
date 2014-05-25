function SquareBlock () {
	color = 'Gold';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
	// var b = [[1,{х:1. у:2}], [2, {х:3. у:4}]];
	points = [	{col:blockStartPos, raw:0}, 	{col:blockStartPos+1, raw:0},
				{col:blockStartPos, raw:1},		{col:blockStartPos+1, raw:1}	]; 	
	this.draw();
}

SquareBlock.prototype = {
	draw: function () {
		for(var i = 0; i < 4; i++)
		{

		ctx.fillStyle = color;
		ctx.fillRect(	borderX + points[i].col * blockSizeX, 
						borderY + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}
	},
	clear: function () {
		for(var i = 0; i < 4; i++)
		{
		ctx.clearRect(	borderX + points[i].col * blockSizeX, 
						borderY + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = backgroundColor;

		ctx.fillRect(	borderX + points[i].col * blockSizeX, 
						borderY + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}
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
	
	if ( DOWN  == dir) 
		for(var i = 0; i < 4; i++)
			points[i].raw++;

	if ( LEFT  == dir) 
		for(var i = 0; i < 4; i++)
			points[i].col--;

	if ( RIGHT == dir) 
		for(var i = 0; i < 4; i++)
			points[i].col++;

	var start = 0;
	var step  = 2;
	if(RIGHT == dir)  start = 1;
	if(LEFT  == dir)  start = 0;
	if(DOWN  == dir) {start = 2; step = 1};

	var c = 0;
	for(var i = start; i < 4; i+=step)
	if (points[i].col > -1 && points[i].col < gridSizeX && points[i].raw < gridSizeY)
	{

		if(true == grid[points[i].raw*gridSizeX + points[i].col].isEmpty)
		{
			c++;
			this.draw();
		}

	} else outOfBounds = true;

	if(c > 1)	canMove = true;
	console.log("start "+ start + ", step "+step + ", c ="+c);
	if(true == outOfBounds)
	{
		if ( DOWN  == dir)
			for(var i = 0; i < 4; i++)
				points[i].raw--;

		if ( LEFT  == dir)
			for(var i = 0; i < 4; i++)
				points[i].col++;

		if ( RIGHT == dir)
			for(var i = 0; i < 4; i++)
				points[i].col--;
		
		gridCell = raw * gridSizeX + col;
		this.draw();

		var lastMove = false;
		for(var i = start; i < 4; i += step)
			if((gridSizeY -1) == points[i].raw ) 
				lastMove = true;
			else lastMove = false;

		if(lastMove)
		{
			for(var i = 0; i < 4; i++)
			{
				grid[points[i].raw * gridSizeX + points[i].col].isEmpty = false;	
				grid[points[i].raw * gridSizeX + points[i].col].color = this.color;	
			}

			clearFullLines();

				delete currentBlock;
			currentBlock = createNewBlock();
		}
	}	
		if(false == canMove && false == outOfBounds)
		{
			if(DOWN == dir)
			{
				console.log("DOWN");
				if ( DOWN  == dir) 
					for(var i = 0; i < 4; i++)
						points[i].raw--;

				if ( LEFT  == dir) 
					for(var i = 0; i < 4; i++)
						points[i].col++;

				if ( RIGHT == dir) 
					for(var i = 0; i < 4; i++)
						points[i].col--;

				gridCell = raw * gridSizeX + col;
				this.draw();

				for(var i = 0; i < 4; i++)
				{
					grid[points[i].raw * gridSizeX + points[i].col].isEmpty = false;	
					grid[points[i].raw * gridSizeX + points[i].col].color = this.color;	
				}
				clearFullLines();

					delete currentBlock;
				currentBlock = createNewBlock();
			} else	{

				console.log("else 155, canMove "+canMove + ", outOfBounds "+outOfBounds);
				debugger;
				if ( LEFT  == dir)
					for(var i = 0; i < 4; i++)
						points[i].col++;

				if ( RIGHT == dir)
					for(var i = 0; i < 4; i++)
						points[i].col--;
				this.draw();
				debugger;
			}
		} 
	}
};