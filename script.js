
console.log("JS connected");

let gameMode = "AI"; // "AI" or "2P"

let boxes = document.querySelectorAll('.box');


let turn = "X";
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;

const scoreXEl = document.querySelector("#score-x");
const scoreOEl = document.querySelector("#score-o");


boxes.forEach(box => {
    box.addEventListener("click", () => {

        // Block invalid clicks
        if (box.innerHTML !== "" || isGameOver) return;

        // AI mode: human is always X
        if (gameMode === "AI" && turn !== "X") return;

        box.innerHTML = turn;
        checkWin();
        checkDraw();

        if (isGameOver) return;

        if (gameMode === "AI") {
            turn = "O";
            document.querySelector('.bg').style.left = "85px";
            setTimeout(aiMove, 500);
        } else {
            changeTurn();
        }
    });
});



const onePlayerBtn = document.querySelector("#one-player");
const twoPlayerBtn = document.querySelector("#two-player");

onePlayerBtn.classList.add("active");

onePlayerBtn.addEventListener("click", () => {
    gameMode = "AI";
    resetGame();
    onePlayerBtn.classList.add("active");
    twoPlayerBtn.classList.remove("active");
});

twoPlayerBtn.addEventListener("click", () => {
    gameMode = "2P";
    resetGame();
    twoPlayerBtn.classList.add("active");
    onePlayerBtn.classList.remove("active");
});



 function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector('.bg').style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector('.bg').style.left = "0px";
    }
 }     

function checkWin(){
    let winConditions = [
        [0,1,2],    
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i = 0; i < winConditions.length; i++){
        let vo = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML; 

        if (vo !== "" && vo === v1 && vo === v2) {

            isGameOver = true;
            document.querySelector("#results").innerHTML = vo + " Wins!";

if (vo === "X") {
    scoreX++;
    scoreXEl.innerText = scoreX;
} else {
    scoreO++;
    scoreOEl.innerText = scoreO;
}


            document.querySelector("#play-again").style.display = "inline";

            for(j =0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
        }
}
    }
}

function checkDraw(){
    let isDraw = true;

    boxes.forEach(e => {
        if (e.innerHTML === "") {
            isDraw = false;
        }
    });

    if (isDraw && !isGameOver) {
        isGameOver = true;
        document.querySelector("#results").innerHTML = "Draw";
        document.querySelector("#play-again").style.display = "inline";
    }
}

function aiMove() {
    let emptyBoxes = [];

    boxes.forEach((box, index) => {
        if (box.innerHTML === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerHTML = "O";

    checkWin();
    checkDraw();
    turn = "X";

    document.querySelector('.bg').style.left = "0px";



}

function resetGame() {
    isGameOver = false;
    turn = "X";
    document.querySelector('.bg').style.left = "0px";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXEl.innerText = scoreX;
    scoreOEl.innerText = scoreO;
}


onePlayerBtn.addEventListener("click", () => {
    gameMode = "AI";
    resetScores();   // <-- Reset scores when switching mode
    resetGame();
    onePlayerBtn.classList.add("active");
    twoPlayerBtn.classList.remove("active");
});

twoPlayerBtn.addEventListener("click", () => {
    gameMode = "2P";
    resetScores();   // <-- Reset scores when switching mode
    resetGame();
    twoPlayerBtn.classList.add("active");
    onePlayerBtn.classList.remove("active");
});





document.querySelector("#play-again").addEventListener('click', resetGame);
    isGameOver = false;
    turn = "X";
    document.querySelector('.bg').style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";

    }
    );
