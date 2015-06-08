function SquareBlock (previewBlock) {
	color = 'Cyan';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
	points = new Array	(
						 new Point (0, blockStartPos),
						 new Point (0, blockStartPos+1),
						 new Point (1, blockStartPos),
						 new Point (1, blockStartPos+1)
						);

	RStates = new Array(
						new Array							//up
							(
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0)
							),
						new Array							//right
							(
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0)
							),
						new Array							//down
							(
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0)
							),
						new Array							//left
							(
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0),
							 new Point (0, 0)
							)
						);
	for(var i = 0; i < 4; i++)
		if ( false == grid[ points[i].raw ][ points[i].col ].isEmpty ) setLossFlag(true);
		
	if(previewBlock == undefined)
		this.draw();
}

SquareBlock.prototype = SimpleBlock.prototype;