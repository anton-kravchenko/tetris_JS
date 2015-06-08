function ZLeftBlock (previewBlock) {
	color = 'Chartreuse';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
	currentRotateState = 0;
	points = new Array	(
						 new Point (0, blockStartPos),
						 new Point (0, blockStartPos + 1),
						 new Point (1, blockStartPos + 1),
						 new Point (1, blockStartPos + 2)
						);
	RStates = new Array(
						new Array							//up
							(
							 new Point (-2, 0),
							 new Point (-1, 1),
							 new Point (0, 0),
							 new Point (1, 1)
							),
						new Array							//right
							(
							 new Point (0, 2),
							 new Point (1, 1),
							 new Point (0, 0),
							 new Point (1, -1)
							),
						new Array							//down
							(
							 new Point (2, 0),
							 new Point (1, -1),
							 new Point (0, 0),
							 new Point (-1, -1)
							),
						new Array							//left
							(
							 new Point (0, -2),
							 new Point (-1, -1),
							 new Point (0, 0),
							 new Point (-1, 1)
							)
						);
	for(var i = 0; i < 4; i++)
		if ( false == grid[ points[i].raw ][ points[i].col ].isEmpty ) setLossFlag(true);
		
	if(previewBlock == undefined)
		this.draw();
}

ZLeftBlock.prototype = SimpleBlock.prototype;