
let turn = 0;

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
    turn = 0;
    updatePlayer();
    resetArr()
    boxes.forEach(box => box.innerText = "")
    ReSet()
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


