
//Set div for show
function PlayGame() {
    document.querySelector('.gameStart').style.display = "flex"
    document.querySelector('.gameMenu').style.display = "none";
    document.querySelector('.gameScores').style.display = "none"; 
}
function ShowScores() {   
    document.querySelector('.gameScores').style.display = "block"
    document.querySelector('.gameMenu').style.display = "none";
    document.querySelector('.gameStart').style.display = "none"; 
}
function ShowMenu() {
    document.querySelector('.gameMenu').style.display = "block"
    document.querySelector('.gameStart').style.display = "none";
    document.querySelector('.gameScores').style.display = "none"; 
}

document.querySelector('.start').addEventListener('click', PlayGame);
document.querySelector('.scores').addEventListener('click', ShowScores);
document.querySelector('.backHome').addEventListener('click', ShowMenu);
document.querySelector('.backHome2').addEventListener('click', ShowMenu)

//game condition
let turn = 0
    
let p1S = 0
let p2S = 0
    
let Player1Score = document.getElementById('p1-score')
let Player2Score = document.getElementById('p2-score')


const boxes = document.querySelectorAll('.box'),
    playerEcho = document.querySelector('.playerEcho'),
    reSetBtn = document.getElementById('reSet'),
    players = ["X","O"],
    arr = Array.from(Array(3), () => Array(3).fill(-1));

    
const getIndex = (index) => [x = index <= 3 ? 0 : 4 <= index && index <= 6 ? 1 : 2,index - (x * 3) - 1];

boxes.forEach(box => {
    box.addEventListener('click',() => {
        if (box.innerText.trim() != "") return
        box.innerText = players[turn % 2];
        const [x , y] = getIndex(parseInt(box.id))
        arr[x][y] = turn % 2;
        if(checkWinner()) return;
        turn += 1;
        updatePlayer();
    })
});

function updatePlayer(){
    const pIndex = turn % 2;
    playerEcho.innerHTML = `Player ${pIndex + 1} (${players[pIndex]})`;
}

const checkWinner = () => checkRows() || checkCols() || checkDiagonals() || checkDiagonals2();
function checkRows(){
    for (let row = 0; row < 3; row++) {
        const first = arr[row][0];
        let isOk = first != -1;
        for (let col = 0; col < 3; col++) {
            isOk &= arr[row][col] == first;
            if(!isOk) 
                break;         
        }
        if(isOk){
            endGame(first)
            return true;
        }
    }
    return false;
}

function checkCols(){
    for (let col = 0; col < 3; col++) {
        const first = arr[0][col];
        let isOk = first != -1;
        for (let row = 0; row < 3; row++) {
            isOk &= arr[row][col] == first;
            if(!isOk) 
                break;
        }
        if(isOk){
            endGame(first)
            return true;
        }
    }
    return false;
}
function checkDiagonals(){
    const first = arr[0][0];
    let isOk = first != -1;
    for (let daig = 0; daig < 3; daig++) {
        isOk &= arr[daig][daig] == first;
        if(!isOk)
            break;
    }
    if(isOk){
        endGame(first)
        return true;
    }
    return false;
}
function checkDiagonals2(){
    const first = arr[2][0];
    let isOk = first != -1;
    for (let row = 2,col=0; row >= 0; row--,col++) {
        isOk &= arr[row][col] == first;
        if(!isOk)
            break;
    }
    if(isOk){
        endGame(first)
        return true;
    }
    return false;
}
function endGame(index){
    console.log(`Winner is ${players[index]}`)
    alert(`Winner is ${players[index]}`)
    setScores(index)
    turn = 0;
    updatePlayer();
    resetArr()
    boxes.forEach(box => box.innerText = "")
    ShowMenu()

}

function resetArr(){
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {     
            arr[row][col] = -1;   
        }
    }
}


function ReSet() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = ""        
        } 
}

reSetBtn.addEventListener("click", () =>{
    ReSet()
});


function setScores(e){
    if (e  == 0) {
        
        p1S ++;
        localStorage.setItem("PlayerOne", p1S.toString());
        let NOW1 = localStorage.getItem('PlayerOne')
        
        Player1Score.innerText = NOW1;
        console.log(Player1Score);
    }
    else {
        p2S ++;
        localStorage.setItem("PlayerTwo", p2S.toString());
        let NOW2 = localStorage.getItem('PlayerTwo')
        console.log(NOW2);
        Player2Score.innerText = NOW2;
        console.log(Player2Score);
    
    }
}

