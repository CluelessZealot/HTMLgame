position = 1;
player1 = document.getElementById("player1");
player2 = document.getElementById("player2");

player1Count = 0;
player2Count = 0;

player1Location = 1;
player2Location = 1;

grademovePlayer1 = 3;
grademovePlayer2 = 3;

diemovePlayer1 = 2;
diemovePlayer2 = 2;

document.getElementById("die").addEventListener('click', (event) => {
    moves = randomInt(1,3);
    document.getElementById("moveNum").innerText= moves;
    movePiece(moves);
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('load', (event) => {
    player1Turn = true;
    document.getElementById("playerTurn").innerText = "Player 1 starts";
});


document.getElementById("gradebook").addEventListener('click', (event) => {
    player1Num = document.getElementById("player1Grades").innerText;
    player2Num = document.getElementById("player2Grades").innerText;

    if(player1Turn == true && player1Num < 3){
        if(grademovePlayer1 > diemovePlayer1){
            grade = getGrade();
            gradeCount(grade);
            document.getElementById("gradebook").innerText = grade;
        }else{
            document.getElementById("moveNum").innerText = "You have passed this class and need to move";
        }
    }else if(player1Turn == false && player2Num < 3){
        if(grademovePlayer2 > diemovePlayer2){
            grade = getGrade();
            gradeCount(grade);
            document.getElementById("gradebook").innerText = grade;
        }else{
            document.getElementById("moveNum").innerText = "You have passed this class and need to move";
        }
    }else{
        if(player1Turn == true){
            grade = getGrade();
            gradeCount(grade);
            document.getElementById("gradebook").innerText = grade;
        }else{
            grade = getGrade();
            gradeCount(grade);
            document.getElementById("gradebook").innerText = grade;
        }
    }
    playerTurnTracker();
});


function getGrade(){
    grade = "";
    switch(randomInt(0,4)){
        case 0:
            grade = 'A';
            break;
        case 1:
            grade = 'B';
            break;
        case 2:
            grade = 'C';
            break;
        case 3:
            grade = 'D';
            break;
        case 4:
            grade = 'F';
    }
    document.getElementById("moveNum").innerText = "";
    document.getElementById("currentGrade").innerText = grade;
    playerTurnTracker();
    return grade;
}


function gradeCount(grade){
    if (grade == 'A' || grade == 'B' || grade == 'C'){
        if (player1Turn == true){
            player1Count = player1Count + 1;
            document.getElementById("player1Grades").innerText = player1Count;
            grademovePlayer1 -= 1;
            drawCard();
        }else{
            player2Count = player2Count + 1;
            document.getElementById("player2Grades").innerText = player2Count;
            grademovePlayer2 -= 1;
            drawCard();
        }
    }
    capstoneChecker()
    turnChanger();
    playerTurnTracker();
}

function playerTurnTracker(){
    if(player1Turn == true){
        document.getElementById("playerTurn").innerText = "Player 1's turn";
    }else{
        document.getElementById("playerTurn").innerText = "Player 2's turn";
    }
}

function turnChanger(){
    if(player1Turn == true){
        player1Turn = false;
    }else{
        player1Turn = true;
    }
}



class cards {

    constructor(context, movesContext, moves){
        this.context = context;
        this.movesContext = movesContext;
        this.moves = moves;
    }

    intro(){
        console.log(this.context, this.movesContext, this.moves);
    }
}

const card1 = new cards("That test could have gone better", "move backwards: ", -2);
const card2 = new cards("Took a quiz and failed", "move backwards: ", -1);
const card3 = new cards("Its a three day weekend", "do nothing!", 0);
const card4 = new cards("Its spring break! Time to relax", "move forward: ", 0);
const card5 = new cards("completed your assignment", "move forward: ", 1);

let cardsArray = [card1, card2, card3, card4, card5];

function drawCard(){
    var randomItem = cardsArray[Math.floor(Math.random()*cardsArray.length)];
    pasteCard(randomItem);
}

function pasteCard(card){
    document.getElementById('context').innerText = card.context;
    document.getElementById('movesContext').innerText = card.movesContext;
    document.getElementById('moves').innerText = card.moves;
    cardMover(card.moves);
}



function movePiece(num){
    player1Num = document.getElementById("player1Grades").innerText;
    player2Num = document.getElementById("player2Grades").innerText;
    if(player1Turn == true){
        if(player1Num < 3){
            if(diemovePlayer1 == grademovePlayer1){
                piece = document.getElementById('player1');
                newSpace = player1Location += num;
                curMove = document.getElementById(newSpace);
                curMove.append(piece);
                diemovePlayer1 -= 1;
                document.getElementById("currentGrade").innerText = "";
            }else{
                document.getElementById("moveNum").innerText = "Get a passing grade to move on";
            }
        }else{
            document.getElementById("moveNum").innerText = "Pass CIS 260 to win!";
        }
        
    }else{
        if(player2Num < 3){
            if(diemovePlayer2 == grademovePlayer2){
                piece = document.getElementById('player2');
                newSpace = player2Location += num;
                curMove = document.getElementById(newSpace);
                curMove.append(piece);
                diemovePlayer2 -= 1;
                document.getElementById("currentGrade").innerText = "";
            }else{
                document.getElementById("moveNum").innerText = "Get a passing grade to move on";
            }
        }else{
            document.getElementById("moveNum").innerText = "Pass CIS 260 to win!";
        }
    }
}

function capstoneChecker(){
    if(player1Turn == true){
        check = document.getElementById('player1Grades').innerText;
        if(check == 3){
            piece = document.getElementById('player1');
            capstone = document.getElementById('16');
            capstone.append(piece);
        }else if(check == 4){
            document.getElementById("gradebook").src = 'winner-1.png';
            document.getElementById("gradebook").style.pointerEvents = "none";
            document.getElementById("moveNum").src = 'winner-1.png';
            document.getElementById("moveNum").style.pointerEvents = "none";
        }
    }else{
        check = document.getElementById('player2Grades').innerText;
        if(check == 3){
            piece = document.getElementById('player2');
            capstone = document.getElementById('16');
            capstone.append(piece);
        }else if(check == 4){
            document.getElementById("gradebook").src = 'winner-2.png';
            document.getElementById("gradebook").style.pointerEvents = "none";
            document.getElementById("moveNum").src = 'winner-2.png';
            document.getElementById("moveNum").style.pointerEvents = "none";
        }
    }
}

function cardMover(num){
    player1Num = document.getElementById("player1Grades").innerText;
    player2Num = document.getElementById("player2Grades").innerText;
    if(player1Turn == true){
        if(player1Num < 3){
            space = player1Location + num;
            piece = document.getElementById('player1');
            if(space >= 1){
                newSpace = document.getElementById(space);
                newSpace.append(piece);
            }
        }
    }else{
        if(player2Num < 3){
            space = player2Location + num;
            piece = document.getElementById('player2');
            if(space >= 1){
                newSpace = document.getElementById(space);
                newSpace.append(piece);
            }
        }
    }
}