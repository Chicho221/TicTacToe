function GameBoard() {
    let board = [
        0,0,0,
        0,0,0,
        0,0,0
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

    activePlayer = players[0] //Player one by default

    const switchPlayer = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;
    const setMarker = (squere) => {
        marker = activePlayer.value
        board[squere] = marker;
        console.log(board[squere]);
    }

    const playRound = () => {
        player = getActivePlayer();
        setMarker(player.value,squere);
    }
    return{
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
    }
    return {
        click
    }
}

const clickHandle = clickHandler();

const displayControl = DisplayControl();

displayControl.updateBoard();