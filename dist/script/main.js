const startbtn = document.getElementById('startbtn');
const startmenu = document.getElementById('startmenu');
const music = document.getElementById('music');
const gamecontainer = document.getElementById('gamecontainer');
const customCursor = document.getElementById('custom-cursor');
let inGame = false;
let pojoja = 0
let isDead = false;
var audio = new Audio('./sound/gnome.mp3');
var death = new Audio('./sound/death.mp3');


let bestScore = localStorage.getItem('bestScore') || 0; 
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');


function chooseMusic(e){ // PLAY RANDOM SONG WHEN GAME START AND KEEP PLAYING THE LIST
    const gameMusic = [
        ".mp3",
        ".mp3",
        ".mp3",
        ".mp3"
    ];
    var gameSong = new Audio('./sound/'+gameMusic[getRandomInt(4)]);
    console.log("Chose song: ",gameSong);
    gameSong.play();
    gameSong.addEventListener('ended', function() {
        chooseMusic();
        //console.log("song ended", gameSong.currentSrc)
    });
}

function updateBestScoreElement() {
    bestScoreElement.textContent = bestScore;
}

function updateScore() {
    scoreElement.textContent = pojoja; 
    if (pojoja > bestScore) {
        bestScore = pojoja; 
        updateBestScoreElement(); 
        localStorage.setItem('bestScore', bestScore); 
    }
}
function saveBestScore() {
    localStorage.setItem('bestScore', bestScore);
}







const container = document.getElementById('container');
const image = document.getElementById('source');
const enemy = document.getElementById('enemy');
const grid = [];

let currentPos = 0;

for (let r = 0; r < 4; r++) {
    const row = document.createElement('div');
    row.className = 'flex justify-center';
    container.appendChild(row);
    const gridRow = [];

    for (let c = 0; c < 4; c++) {
        const canv = document.createElement('canvas');
        canv.addEventListener('click', CanvasClicked, false);
        canv.className = 'bg-[#C5DCFF] opacity-80 w-40 h-40 mt-3 ml-3 border-2 rounded-xl shadow-lg'; //grid layout
        row.appendChild(canv); 
        gridRow.push(canv); 
    }

    grid.push(gridRow);
    
}



const canvas = grid[getRandomInt(4)][getRandomInt(4)]; 
function fillCanvases() {
    const fillColor = "#C5DCFF";
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            
            const canvas = grid[r][c]; 
            canvas.id = '';

            const ctx = canvas.getContext('2d'); 
            ctx.fillStyle = fillColor;

            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}


function start() {
    inGame = true;
    fillCanvases();  
    gameLoop();
    //chooseMusic();
    
    //drawPlayer();
    //drawEnemy();
}

function drawPlayer() {
    let animationDelay = 50;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const x = getRandomInt(4);
    const y = getRandomInt(4);

    const canvas = grid[x][y];
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#C5DCFF";
    canvas.id = 'hemul';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //console.log(canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentPos = [x, y];
    async function animate(){
        ctx.drawImage(image, 21, 145, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 21, 90, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 21, 60, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 21, 20, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
}

function drawEnemy(){
    let animationDelay = 50;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const x = getRandomInt(4);
    const y = getRandomInt(4);
    const canvas = grid[x][y];
    const ctx = canvas.getContext('2d');

    canvas.id = 'enemy';
    ctx.fillStyle = "#C5DCFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //ctx.drawImage(enemy, 0, 0, canvas.width, canvas.height);

    currentPos = [x, y];
    async function animate(){
        ctx.drawImage(enemy, 21, 145, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(enemy, 21, 90, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(enemy, 21, 60, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(enemy, 21, 20, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
}


function CanvasClicked(event) {
  // Check if 'event' is defined
  
  if (!event) {
    console.error("Event is undefined");
    return;
  }

  const canvas = event.target;
  const ctx = canvas.getContext("2d");

  if (canvas.id === "hemul") {
    canvas.id = '';
    pojoja = pojoja + 1;
    updateScore();
    console.log('score increased by one\nTotal:',pojoja);
    
    audio.play();
    
    animateCanvasRemoval(canvas);
    
  }
  else if (inGame && canvas.id != "hemul") {
    console.log('l bozo'); // if empty square clicked do this...
  }
  if (canvas.id === "enemy"){
    death.play();
    death.play();
    death.play();
    death.play();
    death.play();
    death.play();

    
    isDead = true;
    alert('game over');
    window.location.reload();
  }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function animateCanvasRemoval(canvas) {
    const ctx = canvas.getContext('2d');



    function animate(currentTime) {


        ctx.clearRect(0, 0, canvas.width, canvas.height);
       // ctx.clearRect(0, 0, canvas.width, canvas.height);
      //  ctx.fillStyle = "#05080D";
      //  ctx.fillRect(0, 0, canvas.width, canvas.height);
        
    }

   
    requestAnimationFrame(animate);
}


async function gameLoop(){

const delay = ms => new Promise(res => setTimeout(res, ms));
 const time = 10
 while (time > 0 && isDead === false && inGame) {
    drawPlayer();
    const enemySpawnerChance = getRandomInt(5);
    const enemySpawnerAmount = getRandomInt(4);
    if (enemySpawnerChance === 2){
        switch (enemySpawnerAmount){
            case 1:
                console.log("drawn enemy amount 1")
                drawEnemy();
                break;
            case 2:
                console.log("drawn enemy amount 2")
                drawEnemy();
                drawEnemy();
                break;
            case 3:
                console.log("drawn enemy amount 3")
                drawEnemy();
                drawEnemy();
                drawEnemy();
                break;
            case 4:
                console.log("drawn enemy amount 4")
                drawEnemy();
                drawEnemy();
                drawEnemy();
                drawEnemy();
        }
        
    }
   // checkForClicks();
    await delay(Math.floor((Math.random() * 1000) + 800)); 
    fillCanvases();
    await delay(500); //blinking delay - can be removed if annoying

    //infinite game loop so continue here with countdown timer or score system...
 }
 // end game

}

function clear() {
    const ctx = canvas.getContext('2d'); 
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const canvas = grid[r][c]; 
            const ctx = canvas.getContext('2d'); 
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        }
    }
    console.log("new game called");
    window.location.reload();
}





document.addEventListener('DOMContentLoaded', function() {
    

    const startButton = document.getElementById("start");
    const newGameButton = document.getElementById("newGame");

    startButton.onclick = function() {
        pojoja = 0;
        updateScore();
        start();
        
    };

    newGameButton.onclick = function() {
        
        pojoja = 0;
        updateScore();
        inGame = false;
        clear();
    };
});



document.addEventListener('click', (e) => {
    
    customCursor.style.animation = 'swing 0.2s ease-in';

    // Reset the animation after it finishes
    customCursor.addEventListener('animationend', () => {
        customCursor.style.animation = '';
    });

    // Set the cursor's position to the click event coordinates
    customCursor.style.left = `${e.clientX - customCursor.clientWidth / 4}px`;
    customCursor.style.top = `${e.clientY - customCursor.clientHeight / 1.5}px`;
});

startbtn.addEventListener('click', () => {
    startmenu.className = 'hidden';
    gamecontainer.className = 'bg-default h-screen items-center pt-32 justify-center';
    document.body.style.backgroundImage = 'url("./img/bg.png")';
    music.src = "";
    
});
document.addEventListener('mousemove', (e) => {
    
    const cursorSize = 132; 
    customCursor.style.left = `${e.clientX - cursorSize / 4}px`; 
    customCursor.style.top = `${e.clientY - cursorSize / 1.5}px`;
});
updateBestScoreElement();
