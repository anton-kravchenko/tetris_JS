var canvasW = 1280;
var canvasH = 720;
var blockSizeX  = 24;
var blockSizeY  = 24;
var startY = 150;
var startX = canvasW/2 ;
var gridSizeX = 10;
var gridSizeY = 20;
var speed 	= 250;

var dx = canvasW /2 - gridSizeX / 2 * blockSizeX + blockSizeX;
var dy = startY;

var blockStartPos = gridSizeX / 2;

var borderX = canvasW / 2 - (gridSizeX / 2) * blockSizeX;
var borderY = startY;

var DOWN 	= 0;
var LEFT 	= 1;
var RIGHT 	= 2;

var NUMBER_OF_BLOCKS = 7;
var SCORE = 0;
var LOSS = false;

var backgroundColor = '#222222';
var borderColor = '#777777';
var borderThickness = 2;
var colors = ['#33ffc5', '#00ce0f', '#c00fff'];

var previewBlockPosition = {borderX : 150, borderY : 240};


var drawGridDelay = 0;
