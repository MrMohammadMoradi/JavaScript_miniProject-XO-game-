var S_PlayerOne = 0;
var S_PlayerTwo = 0;

localStorage.setItem("S_p1", S_PlayerOne);
localStorage.setItem("S_p2", S_PlayerTwo);


let Turn = 1;

let boxes = document.querySelectorAll('.box');
boxes = Array.from(boxes)


const WinningList = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function checkForWinner() {
    for (let i = 4; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            console.log(WinningList[j]);
            if (WinningList[j] == "X") {
                alert("X is Wainner")
            }
            else if (WinningList[j] == "O") {
                alert("O is Wainner")
            }
            
        }
        
    }

}


boxes.forEach(function(box) {
    box.addEventListener('click', function() {
        
        if (box.innerText.trim() != "") return
        if (Turn%2 == 0) {
            box.innerText = "O"
        }
        else {
            box.innerText = "X"
        }

        
        if (Turn == 9) {
            alert("Ouch, You are homo")
        }

        checkForWinner()
        
        Turn +=1 ;
        let PlayerEcho = document.querySelector('.playerEcho')
        if (Turn%2 == 0) {
            PlayerEcho.innerHTML = "Player 2 (O)"
        }
        else{
            PlayerEcho.innerHTML = "Player 1 (X)"
        }


    })
})

