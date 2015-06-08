function SimpleBlock () {
	color = 'Gold';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
}

SimpleBlock.prototype = {
	draw: function (position) {
		var xPos, yPos;
		if(position){
			xPos = position.borderX;
			yPos = position.borderY;
		} else {
			xPos = borderX;
			yPos = borderY;
		}

		for(var i = 0; i < 4; i++)
		{

		ctx.fillStyle = color;
		ctx.fillRect(	xPos + points[i].col * blockSizeX, 
						yPos + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}
	},
	clear: function (position) {
		var xPos, yPos;
		if(position){
			xPos = position.borderX;
			yPos = position.borderY;
		} else {
			xPos = borderX;
			yPos = borderY;
		}

		for(var i = 0; i < 4; i++)
		{
		ctx.clearRect(	xPos + points[i].col * blockSizeX, 
						yPos + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = backgroundColor;

		ctx.fillRect(	xPos + points[i].col * blockSizeX, 
						yPos + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}
	},
	rotate: function(){
		currentRotateState++;
		if(4 == currentRotateState) currentRotateState = 0;
		
		this.clear();
		var newAngle = new Array();
		for(var i = 0; i < 4; i++)
		{
			try{

			newAngle.push( new Point(points[i].raw + RStates[currentRotateState][i].raw, points[i].col + RStates[currentRotateState][i].col));
		} catch (e){
			console.log(e);
		}
		}
		var c = 0;
		for(var i = 0; i < 4; i++)
			if ( true == grid[ newAngle[i].raw ][ newAngle[i].col].isEmpty ) c++;

		if( 4 == c )
		{
			for(var i = 0; i < 4; i++)
			{
				points[i].raw = newAngle[i].raw;
				points[i].col = newAngle[i].col;
			}	
		} else currentRotateState--;	
		this.draw();
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

		this.clear();
		
		var newPos = new Array();
		if ( DOWN  == dir) 
			for(var i = 0; i < 4; i++)
				newPos.push(new Point(points[i].raw + 1, points[i].col));

		if ( LEFT  == dir) 
			for(var i = 0; i < 4; i++)
				newPos.push( new Point(points[i].raw, points[i].col - 1));			

		if ( RIGHT == dir) 
			for(var i = 0; i < 4; i++)
				newPos.push( new Point(points[i].raw, points[i].col + 1));

		var c = 0;
		for(var i = 0; i < 4; i++)
			if ( true == grid[ newPos[i].raw ][ newPos[i].col ].isEmpty ) c++;		

		if ( 4 == c ) canMove = true;

		if( canMove )
		{
			for(var i = 0; i < 4; i++)
			{
				points[i].raw = newPos[i].raw;
				points[i].col = newPos[i].col;
			}
		} else if( DOWN == dir)
			{
				for(var i = 0; i < 4; i++)
					newPos[i].raw--;  		

				for(var i = 0; i < 4; i++)
				{
					grid[ newPos[i].raw ][ newPos[i].col ].isEmpty = false;	
					grid[ newPos[i].raw ][ newPos[i].col ].color = color;	
				}

				clearFullLines();

					delete currentBlock;
				SCORE++;
				
				currentBlock = createNewBlock();		
				drawGrid();		
			}
			this.draw();
	}
};