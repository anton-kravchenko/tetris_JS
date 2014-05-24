document.onkeydown = function(e) {
    e = e || event; // "real browsers" || IE6/7.
    switch (e.keyCode) {
        case 38: 
			//rotate        			
            //currentBlock Rotate
        case 40: 
            // incapsulate in block class
            // just use currentBlock.movePlus
            // left - right - the same
        	if(currentBlock.y < gridSizeY * blockSizeY - blockSizeY + startY)
        	{
        		currentBlock.movePlus( 0, dy); 
        	} else {
        		delete currentBlock;
        		currentBlock = createNewBlock();
        	}
        	break; // down

        case 37: 
        	if (currentBlock.x > canvasW/2 - gridSizeX/2 * blockSizeX)
        		currentBlock.movePlus(-dx, 0); break; //left
        case 39: 
        	if (currentBlock.x < canvasW/2 + gridSizeX/2 * blockSizeX -blockSizeX)
        		currentBlock.movePlus( dx, 0); break; //right
    }
}

