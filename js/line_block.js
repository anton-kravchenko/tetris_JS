function LineBlock (previewBlock) {
	color = 'Gold';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
	currentRotateState = 0;
	points = new Array	(
						 new Point (0, blockStartPos),
						 new Point (1, blockStartPos),
						 new Point (2, blockStartPos),
						 new Point (3, blockStartPos)
						);
	RStates = new Array(
						new Array							//up - down
							(
							 new Point (0, 1),
							 new Point (1, 0),
							 new Point (2, -1),
							 new Point (3, -2)
							),
						new Array							//right - left
							(
							 new Point (0, -1),
							 new Point (-1, 0),
							 new Point (-2, 1),
							 new Point (-3, 2)
							),
						new Array							//up - down
							(
							 new Point (0, 1),
							 new Point (1, 0),
							 new Point (2, -1),
							 new Point (3, -2)
							),
						new Array							//right - left
							(
							 new Point (0, -1),
							 new Point (-1, 0),
							 new Point (-2, 1),
							 new Point (-3, 2)
							)
						);
	for(var i = 0; i < 4; i++)
		if ( false == grid[ points[i].raw ][ points[i].col ].isEmpty ) LOSS = true;
	
	if(previewBlock == undefined)
		this.draw();
}

LineBlock.prototype = SimpleBlock.prototype;