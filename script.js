const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

var circleArray = [];
const circleAmount = 800;
let mouse = {
    x: undefined,
    y: undefined
}

let cw = window.innerWidth;
let ch = window.innerHeight;

window.addEventListener("resize", resize)
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cw = canvas.width;
    ch = canvas.height;
    redo()
}

function Circle(x, y, dx, dy, radius, maxRadius, minRadius, increaseRate) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
    this.increaseRate = increaseRate;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "#18181c";
        c.stroke();
        c.fillStyle = "rgba(80, 81, 88, 0.5)";
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius >= cw || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius >= ch || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //Interaction
        if (mouse.x - this.x < 80 && mouse.x - this.x > -80 && mouse.y - this.y < 80 && mouse.y - this.y > -80) {
            if (this.radius < maxRadius) {
                this.radius += increaseRate;
            }
        } else if (this.radius > minRadius) {
            this.radius -= increaseRate;
        }

        this.draw()
    }
}


function redo() {
    c.clearRect(0, 0, cw, ch)
    circleArray = [];

    for (var i = 0; i < circleAmount; i++) {
        let radius = Math.random() * 20 + 20; 
        let x = Math.random() * (cw - radius * 2) + radius;
        let y = Math.random() * (ch - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 8;
        let dy = (Math.random() - 0.5) * 8;
        let maxRadius = radius * 2;
        let minRadius = radius / 2;
        let increaseRate = (Math.random() * 1.5) + 1.5;
        circleArray.push(new Circle(x, y, dx, dy, radius, maxRadius, minRadius, increaseRate));

    }   
}


function draw() {
    requestAnimationFrame(draw);
    c.clearRect(0, 0, cw, ch);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}



resize()
draw()