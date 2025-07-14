let gameSeq = [];
let userSeq = [];

let selectColor = ["left-up", "right-up", "left-down", "right-down"];

let gameStart = false;
let level = 0;

let highScore = document.querySelector('p');
let highestScore = 0;

let h2 = document.querySelector('h2');
document.addEventListener('keypress', function () {
    if (gameStart == false) {
        console.log("game statrted");
        gameStart = true
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColorBox = selectColor[randIdx];
    let randbtn = document.querySelector(`.${randColorBox}`);
    gameSeq.push(randColorBox);
    console.log(gameSeq);
    btnFlash(randbtn);
};

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
};

let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function btnPress() {
    let btn = this;
    userBtnFlash(btn);
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function userBtnFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
};



function checkAns(idx) {
    checkHighScore(level);
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! your score was <b>${level}</b> <br/> press any key to restart Game`;
        document.body.style.backgroundColor = 'red';
        setTimeout(() => {
            document.body.style.backgroundColor = 'white';
        }, 150);
        reset();
    }
}

function checkHighScore(level) {

    if (level > highestScore) {
        highestScore = level;
        highScore.innerHTML = `Your highest score is : <b>${highestScore}</b>`;
    }



}

function reset() {
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

