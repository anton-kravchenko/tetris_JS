document.onkeydown = function(e) {
    e = e || event; // "real browsers" || IE6/7.
    switch (e.keyCode) {
        case 38: 
            currentBlock.rotate();
            break;
        case 40: 
        if(!LOSS)
            currentBlock.moveDown();
        	break; // down
        case 37:
        if(!LOSS)
            currentBlock.moveLeft();
            break; 
        case 39:
        if(!LOSS)
            currentBlock.moveRight();
            break; 
    }
}

