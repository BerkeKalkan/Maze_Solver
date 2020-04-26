var nodeQueue = [];
var visitedNodes = [];
var traveledPath = [];

function solveImage(canvasCtx, image){
    var imageData = canvasCtx.getImageData(0, 0, image.width, image.height).data;

    // Depth First Search

    var startPosition = findStartPos(imageData, image.width);
    //console.log(valid(imageData, image.width, 15, 802));

    if(includesArr([startPosition], [-1, -1])){
        // START POSITION ISNT PRESENT
        alert('Start position isn\'t set');
    }
    else{
        checkPossiblePaths(imageData, image.width, image.height, startPosition[0], startPosition[1]);
    }
}

function valid(imageData, width, rowIndex, columnIndex){
    //console.log(rowIndex, columnIndex);
    var currentPixelIndex = 4 * (( columnIndex ) + rowIndex * width);
    //console.log(rowIndex, columnIndex);
    // IF NOT WALL OR ALREADY VISITED
    if( 
        (imageData[currentPixelIndex]     == 0  &&
        imageData[currentPixelIndex + 1] == 0   &&
        imageData[currentPixelIndex + 2] == 0)  ||
        includesArr(visitedNodes, [rowIndex, columnIndex])
    ){
        return false;
    }
    else{
        return true;
    }
}

function checkPossiblePaths(imageData, width, height, rowIndex, columnIndex){
    //console.log(rowIndex, columnIndex);

    //console.log(traveledPath);
    traveledPath.push([rowIndex , columnIndex]);
    visitedNodes.push([rowIndex , columnIndex]);
    // UP - LEFT - DOWN - RIGHT
    // CHANGE THE POSITION OF VALID CALL AND ROWINDEX > 0 FOR PERFORMANCE
    if(valid(imageData, width, rowIndex - 1, columnIndex) && rowIndex > 0){
        // UP IS VALID
        ctx.fillStyle = 'red';
        ctx.fillRect(columnIndex, rowIndex, 3, 3);
        checkPossiblePaths(imageData, width, height, rowIndex - 1, columnIndex);
    }
    else if(valid(imageData, width, rowIndex, columnIndex - 1) && columnIndex > 0){
        // LEFT IS VALID
        ctx.fillStyle = 'red';
        ctx.fillRect(columnIndex, rowIndex, 3, 3);
        checkPossiblePaths(imageData, width, height, rowIndex , columnIndex - 1);
    }
    else if(valid(imageData, width, rowIndex + 1, columnIndex) && rowIndex < height){
        // DOWN IS VALID
        ctx.fillStyle = 'red';
        ctx.fillRect(columnIndex, rowIndex, 3, 3);
        checkPossiblePaths(imageData, width, height, rowIndex + 1 , columnIndex );
    }
    else if(valid(imageData, width, rowIndex, columnIndex + 1) && columnIndex < width){
        // RIGHT IS VALID
        ctx.fillStyle = 'red';
        ctx.fillRect(columnIndex, rowIndex, 3, 3);
        checkPossiblePaths(imageData, width, height, rowIndex , columnIndex + 1);
    }
    else{
        // NO POSSIBLE PATH FOR THIS PIXEL
        // BACKTRACK
        var poppedItem = traveledPath.pop();
        console.log(traveledPath[traveledPath.size - 1]);
        var newPixel = traveledPath[traveledPath.length - 1];
        checkPossiblePaths(imageData, width, height, newPixel[0] , newPixel[1]);
    }
}

// INTENDED TO WORK WITH SAME LENGTH ARRAYS
function includesArr(arr1, arr2){
    //console.log(arr1, arr2);
    for(var i = 0; i < arr1.length;i++){
        var equalElement = 0;
        // first array
        for(var j = 0; j < arr1[i].length; j++){
            //console.log(arr1[i][j], arr2[j]);
            if(arr1[i][j] == arr2[j]){
                equalElement++;
            }
            if(equalElement == arr2.length){
                return true;
            }
        }
    }
    return false;
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