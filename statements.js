var canvasW = 1200;
var canvasH = 700;
var blockSizeX  = 24;
var blockSizeY  = 24;
var dx = blockSizeX ;
var dy = blockSizeY ;
var startY = 150;
var startX = canvasW/2 ;
var gridSizeX = 10;
var gridSizeY = 20;
var speed 	= 250;

var blockStartPos = gridSizeX / 2;

var borderX = canvasW / 2 - (gridSizeX / 2) * blockSizeX;
var borderY = startY;

var DOWN 	= 0;
var LEFT 	= 1;
var RIGHT 	= 2;

var backgroundColor = '#333333';
var borderColor = '#777777';
var borderThickness = 2;
var colors = ['#33ffc5', '#00ce0f', '#c00fff'];
