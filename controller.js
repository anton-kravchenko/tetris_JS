document.onkeydown = function(e) {
    e = e || event; // "real browsers" || IE6/7.
    switch (e.keyCode) {
        case 38: 
            currentBlock.rotate();
            break;
        case 40: 
            currentBlock.moveDown();
        	break; // down
        case 37:
            currentBlock.moveLeft();
            break; 
        case 39:
            currentBlock.moveRight();
            break; 
    }
}

