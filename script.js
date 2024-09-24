class Particle {
    constructor() {
        this.x = Math.min(canvas.width, Math.floor(Math.random() * window.innerWidth));
        this.y = Math.min(canvas.height, Math.floor(Math.random() * window.innerHeight));
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.size = Math.max(25,Math.random() * 50);
    }
    draw(){
        ctx.fillStyle = '#f3f3eb';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x >= canvas.width) {
            this.x = canvas.width - this.speedX;
            this.speedX = this.speedX * -1;
            
            if (this.size - 1 <= 0) {
                this.size = 0;
            }
            else {
                this.size -= 1;
            }
        }

        if (this.x <= 0) {
            this.speedX = this.speedX * -1;

            if (this.size - 2 <= 0) {
                // const x = particleObjects.indexOf(this);
                // particleObjects.splice(x, x);
                // return;
                this.size = 0;
            }
            else {
                this.size -= 2;
            }
        }

        if (this.y <= 0) {
            this.speedY = this.speedY * -1;

            if (this.size - 3 <= 0) {
                // const x = particleObjects.indexOf(this);
                // particleObjects.splice(x, x);
                // return;
                this.size = 0;
            }
            else {
                this.size -= 3;
            }
        }

        if (this.y >= canvas.height) {
            this.y = canvas.height - this.speedY;
            this.speedY = this.speedY * -1;

            if (this.size > 10) {
                this.size -= 1;
            }
        }
    }
}


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasParent = document.getElementById('canvasParent');
let rect = canvasParent.getBoundingClientRect();

canvas.width = rect.width;
canvas.height = rect.height;

let numberOfCircles = 0;
let particleObjects = [];


window.addEventListener('resize', function() {
    let parent = canvasParent.getBoundingClientRect();
    canvas.width = parent.width;
    canvas.height = parent.height;

    drawAllParticleObjects();
});

canvas.addEventListener('click', function(event){
    numberOfCircles += 1;
    
    let circle = new Particle();
    circle.x = event.x;
    circle.y = event.y;
    circle.draw();
    particleObjects.push(circle);
})

canvas.addEventListener('mousemove', function(event) {
    updateAllParticleObjects();
});

function drawAllParticleObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
        for (i = 0; i < particleObjects.length; i++) {
            particleObjects[i].draw();
        }
    }
    catch(err) {
        console.log(err);
        return;
    }
}

function updateAllParticleObjects() {
    // console.log(particleObjects.length)
    // console.log(particleObjects);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
        for (i = 0; i < particleObjects.length - 1; i++) {
            // console.log(particleObjects[i]);
            particleObjects[i].update();
            particleObjects[i].draw();
        }
    }
    catch(err) {
        console.log(err);
    }
    
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    updateAllParticleObjects();
    requestAnimationFrame(animate);
}

function init() {
    for (i = 0; i < 10; i++) {
        particleObjects.push(new Particle());
    }
}

init();
animate();