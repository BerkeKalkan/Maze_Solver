function solveImage(canvasCtx, image){

}


function drawImage(canvasCtx, imageSrc) {
    var img = new Image();
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        canvasCtx.drawImage(img, 0, 0, img.width, img.height);
        //solveImage(canvasCtx, image);
    };
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