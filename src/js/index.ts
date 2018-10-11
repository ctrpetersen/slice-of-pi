var canvas = <HTMLCanvasElement>document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var isRunning:boolean = false;
var estPi:number = 0;
var thrownDarts:number = 0;
var insideCircle:number = 0;
var difference:number = 0;
const Scaling:number = 390;

document.getElementById("startStopBtn").addEventListener("click", () => startStop());
document.getElementById("resetBtn").addEventListener("click", () => reset());

canvas.width = 800;
canvas.height = 850;

function init():void{
    ctx.font = "14px Raleway";
    ctx.fillStyle = "white";
    ctx.fillText("Estimated pi - " + estPi, 1, 15)
    ctx.fillText("Darts thrown - " + thrownDarts, 1, 30)
    ctx.fillText("Darts inside circle - " + insideCircle, 1, 45)
    ctx.fillText("Actual pi - " + Math.PI, 400, 15)
    ctx.fillText("Difference - " + difference + "%", 400, 30)
    ctx.fillRect(0,50,canvas.width,1)
}

function mainLoop():void{
    window.requestAnimationFrame(mainLoop.bind(this));
    if (!isRunning) {return;}
    ctx.clearRect(0, 0, canvas.width, 50);

    ctx.font = "14px Raleway";
    ctx.fillStyle = "white";
    ctx.fillText("Estimated pi - " + estPi, 1, 15)
    ctx.fillText("Darts thrown - " + thrownDarts, 1, 30)
    ctx.fillText("Darts inside circle - " + insideCircle, 1, 45)
    ctx.fillText("Actual pi - " + Math.PI, 400, 15)
    ctx.fillText("Difference - " + difference + "%", 400, 30)
    ctx.fillRect(0,50,canvas.width,1)
    throwDart();

    if (thrownDarts % 10 == 0){
        estPi = insideCircle * 4 / thrownDarts;
        difference = 100 * Math.PI / estPi - 100;
    }
}

function throwDart():void{
    var x = Math.random() * 2 - 1;
    var y = Math.random() * 2 - 1;
    if (x * x + y * y < 1.0) {
        ctx.beginPath();
        ctx.arc(x * Scaling + canvas.width / 2, y * Scaling + (canvas.height+50) / 2, 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#62dba3';
        ctx.fill();
        insideCircle++;
        thrownDarts++;
    }
    else{
        ctx.beginPath();
        ctx.arc(x * Scaling + canvas.width / 2, y * Scaling + (canvas.height+50) / 2, 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#ce695f";
        ctx.fill();
        thrownDarts++;
    }


}

function startStop():void{
    isRunning = !isRunning;
}

function reset():void{
    ctx.clearRect(0, 0, canvas.width, 49);
    ctx.clearRect(0, 51, canvas.width, canvas.height);
    isRunning = false;
    estPi = 0;
    thrownDarts = 0;
    insideCircle = 0;
    difference = 0;
    init();
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

init();
mainLoop();
