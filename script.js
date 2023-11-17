function GameBoard() {
    let board = [
        ' ',' ',' ',
        '','','',
        '','',''
    ];

    const getBoard = () => board;

    return{
        getBoard
    }
}
const gameboard = GameBoard(); 

function GameControler(){
    board = gameboard.getBoard();
    const players = [
        {
            name: 'playerOne',
            value: 'X'
        },
        {
            name: 'playerTwo',
            value: 'O'
        }
    ];

    activePlayer = players[0] //PlayerOne by default

    const switchPlayer = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;
    const setMarker = (squere) => {
        marker = activePlayer.value
        board[squere] = marker;
        console.log(board[squere]);
    }

    const winnerCheck = () => {
        const board = gameboard.getBoard();
        console.log(board)
        let stringCheck = '';
        let tieCheck = '';
        for(let i = 0; i < board.length; i++){
            switch(i){
                case 0:
                    tieCheck += board[0] + board[1] + board[2];
                    stringCheck = board[0] + board[1] + board[2];
                    break;
                case 1:
                    tieCheck += board[3] + board[4] + board[5];
                    stringCheck = board[3] + board[4] + board[5];
                    break;
                case 2:
                    tieCheck += board[6] + board[7] + board[8];
                    stringCheck = board[6] + board[7] + board[8];
                    break;
                case 3:
                    tieCheck += board[0] + board[3] + board[6];
                    stringCheck = board[0] + board[3] + board[6];
                    break;
                case 4:
                    tieCheck += board[1] + board[4] + board[7];
                    stringCheck = board[1] + board[4] + board[7];
                    break;
                case 5:
                    tieCheck += board[2] + board[5] + board[8];
                    stringCheck = board[2] + board[5] + board[8];
                    break;
                case 6:
                    tieCheck += board[0] + board[4] + board[8];
                    stringCheck = board[0] + board[4] + board[8];
                    break;
                case 7:
                    tieCheck += board[2] + board[4] + board[6];
                    stringCheck = board[2] + board[4] + board[6];
                    break;
            }
            
            if (stringCheck == "XXX") {
                return "X";
            }
            else if (stringCheck == "OOO") {
                return "O";
            }
            else if(tieCheck.length == 24){
                return "Tie";
            }
        }
    }
    const showWinner = () =>{
        let winner = '';
        winner = winnerCheck();
        console.log(winner);
        if(winner == ''){
            return;
        }
        if(winner == 'X'){
            console.log("Player One Won!")
        }else if(winner == 'O'){
            console.log("Player Two Won!")
        }else if(winner == 'Tie'){
            console.log("It's a Tie!")
        }
    }
    return{
        showWinner,
        switchPlayer,
        setMarker,
        getActivePlayer
    }
}

const gameControl = GameControler();
function DisplayControl(){
    const board = gameboard.getBoard();
    const grid = document.querySelector('.board')

    const updateBoard = () =>{
        grid.textContent = ''; //Clears grid
        for(let i = 0;i < board.length;i++){
            const squere = document.createElement('button')
            squere.classList.add('squere')
            squere.textContent = board[i];
            squere.addEventListener('click',() => clickHandle.click(i));
            grid.appendChild(squere)
        }
    }
    
    return{
        updateBoard
    }
}
const display = DisplayControl();

function clickHandler() {
    
    const click = (i) =>{
        gameControl.setMarker(i);
        display.updateBoard();
        gameControl.showWinner();
        gameControl.switchPlayer();
    }
    return {
        click
    }
}

const clickHandle = clickHandler();

const displayControl = DisplayControl();

displayControl.updateBoard();