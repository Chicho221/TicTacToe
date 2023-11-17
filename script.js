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
    const players = [
        {
            name: 'playerOne',
            marker: 'X'
        },
        {
            name: 'playerTwo',
            marker: 'O'
        }
    ];

    activePlayer = players[0] //Player one by default

    const switchPlayer = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;
    const setMarker = (marker, squere) => {
        board[squere].textContent = marker;
    }
    return{
        switchPlayer,
        getActivePlayer
    }
}

const gameControl = GameControler();
function DisplayControl(){
    const board = gameboard.getBoard();
    const grid = document.querySelector('.board')

    const updateBoard = () =>{
        for(let i = 0;i < board.length;i++){
            const squere = document.createElement('button')
            squere.classList.add('squere')
            squere.textContent = '';
            squere.addEventListener('click',() => clickHandle.click());
            grid.appendChild(squere)
        }
    }
    return{
        updateBoard
    }
}
const display = DisplayControl();

function clickHandler() {
    
    const click = () =>{
        setMarker();
    }
    return {
        click
    }
}

const clickHandle = clickHandler();

const displayControl = DisplayControl();

displayControl.updateBoard();