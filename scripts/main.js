function solveImage(canvasCtx, image){
    var imageData = canvasCtx.getImageData(0, 0, image.width, image.height).data;


    // Breadth first search
    var nodeQueue = [];
    var visitedNodes = [];
    var traveledPath = [];

    var startPosition = findStartPos(imageData, image.width);

    /*
    for(var rowIndex = 0; rowIndex < image.width; rowIndex++){
        for(var columnIndex = 0; columnIndex < image.columnIndex; columnIndex++){
            var currentPixelIndex = 4 * (( columnIndex ) + rowIndex * image.width);
            
            //imageData[currentPixelIndex]     Red
            //imageData[currentPixelIndex + 1] Green
            //imageData[currentPixelIndex + 2] Blue
            //imageData[currentPixelIndex + 3] ALPHA

        }
    }
    */
}


function findStartPos(imageData, width){
    for(var rowIndex = 0; rowIndex < width; rowIndex++){
        for(var columnIndex = 0; columnIndex < width; columnIndex++){
            var currentPixelIndex = 4 * (( columnIndex ) + rowIndex * width);
            // START ZONE IS GREEN
            if( imageData[currentPixelIndex]     == 0   &&    
                imageData[currentPixelIndex + 1] == 255 &&
                imageData[currentPixelIndex + 2] == 0   &&
                imageData[currentPixelIndex + 3] == 255    
                ){
                    console.log('found starting zone');
                   return [rowIndex, columnIndex]; 
            }
        }
    }
    return [-1, -1];
} 

function drawImage(canvasCtx, imageSrc) {
    var img = new Image();
    var button = document.getElementById('button');
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        canvasCtx.drawImage(img, 0, 0, img.width, img.height);
    };
    button.onclick = function(){
        solveImage(canvasCtx, img);
    }
    img.src = imageSrc;
}

/*
Use this function to get start and finish of the maze
function drawPoint(canvasCtx, x, y) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = 'black';
    canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
    canvasCtx.fill();
}
*/

function loadFile(canvasCtx, files) {
    if (files && files[0]) {
        var reader = new FileReader();
        reader.onload = function() {
            drawImage(canvasCtx, reader.result);
        };
        reader.readAsDataURL(files[0]);
    }
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fileUpload = document.getElementById('fileUpload');

fileUpload.onchange = function fileUploadChanged() {
    loadFile(ctx, this.files);
}

/*
canvas.onclick = function canvasClicked(event) {
    drawPoint(ctx, event.offsetX, event.offsetY);
};
*/