function Block (x, y) {
	this.x = x;
	this.y = y;
	color = 'Gold';
	currentPos = defineGridIndex(x,y);
	prevPos = -1;
	this.drawMe();
}

Block.prototype = {
	drawMe: function () {
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, blockSizeX , blockSizeY );
	},
	movePlus: function (dx, dy){
		ctx.clearRect(this.x, this.y, blockSizeX , blockSizeY );
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(this.x, this.y, blockSizeX , blockSizeY );

		var nextIndex = defineGridIndex(this.x + dx, this.y + dy);

		if(true == grid[nextIndex].isEmpty)
		{
			this.x += dx;
			this.y += dy;
			
			prevPos = currentPos;
			currentPos = defineGridIndex(this.x, this.y);

			grid[prevPos].isEmpty = true;
			grid[prevPos].color = backgroundColor;

			grid[currentPos].isEmpty = false;
			grid[currentPos].color = this.color;
			this.drawMe();
		} else {
			this.drawMe();
			
			if(0 == dx)
			{
				clearFullLines();
				// delete currentBlock;
				currentBlock = createNewBlock();
			}
		}
		if (nextIndex >= gridSizeX * (gridSizeY -1)) 
		{
			clearFullLines();
		}
	}
};