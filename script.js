function GameBoard() {
    let board = [
        '','','',
        '','','',
        '','',''
    ];

    const getBoard = () => board;
    const newBoard = () => {
        board = [
            '','','',
            '','','',
            '','',''
        ];
    }

    return{
        newBoard,
        getBoard
    }
}
const gameboard = GameBoard(); 

function GameControler(){
    const players = [
        {
            name: 'Player X',
            value: 'X'
        },
        {
            name: 'Player O',
            value: 'O'
        }
    ];

    activePlayer = players[0] //PlayerOne by default

    const switchPlayer = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const setMarker = (squere) => {
        const board = gameboard.getBoard();
        if(board[squere] == ''){ //Checks if squere is occupied
            marker = activePlayer.value
            board[squere] = marker;
        }else{
           return false;  
        }
    }
    const setDefault = () => {
        winner = '';
        activePlayer = players[0]
        
    }
    const winnerCheck = () => {
        const board = gameboard.getBoard();
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
        if(winner == ''){
            return;
        }
        if(winner == 'X'){
            return 'X'
        }else if(winner == 'O'){
            return 'O'
        }else if(winner == 'Tie'){
            return 'Tie'
        }
    }
    return{
        setDefault,
        showWinner,
        switchPlayer,
        setMarker,
        getActivePlayer
    }
}
const gameControl = GameControler();

function DisplayControl(){
    const grid = document.querySelector('.board');
    const clearBoard = () =>{
        grid.textContent = '';
    } 
    const updateBoard = () =>{
        const board = gameboard.getBoard();
        const winner = gameControl.showWinner();
        clearBoard();
        if(!winner == ''){
            const blur = document.createElement('div');
            blur.classList.add('blur');
            blur.setAttribute('disabled', '');

            const message = document.createElement('div');
            message.classList.add('popmessage');
            const tipMessage = document.createElement('div');
            tipMessage.classList.add('tip');
            tipMessage.textContent = 'Click on the board to play again!';
                if(winner == 'X'){
                    blur.removeAttribute('disabled', '');
                    message.textContent = 'Player X Won!'
                }else if(winner == 'O'){
                    message.textContent = 'Player O Won!'
                }else if(winner == 'Tie'){
                    message.textContent = "It's a Tie!"
                }
            message.appendChild(tipMessage);
            blur.appendChild(message);
            blur.addEventListener('click',() => clickHandle.clickNewRound());
            grid.appendChild(blur);
        }
        
        for(let i = 0;i < board.length;i++){
            const squere = document.createElement('button')
            squere.classList.add('squere')
            if(i == 0 || i == 1 || i == 2){
                squere.classList.add('b-top')
            }
            if(i == 2 || i == 5 || i == 8){
                squere.classList.add('b-right')
            }
            if(i == 6 || i == 7 || i == 8){
                squere.classList.add('b-bot')
            }
            if(i == 0 || i == 3 || i == 6){
                squere.classList.add('b-left')
            }
            squere.textContent = board[i];
            squere.addEventListener('click',() => clickHandle.clickPlay(i));
            grid.appendChild(squere)
        }
    }
    const checkTurn = () =>{
        const active = gameControl.getActivePlayer()
        const p1 = document.querySelector('.p1');
        const p2 = document.querySelector('.p2');
        const name = document.querySelector('.activeName')
        if(active.value == 'X'){
            name.textContent = active.name + ' Turn'
            p1.classList.add('activeTurn');
            p2.classList.remove('activeTurn')
        }else if(active.value == 'O'){
            name.textContent = active.name + ' Turn'
            p2.classList.add('activeTurn');
            p1.classList.remove('activeTurn')
        }
    }
    return{
        checkTurn,
        updateBoard
    }
}
const display = DisplayControl();

function clickHandler() {
    
    const clickPlay = (i) =>{
        if(gameControl.setMarker(i) === false){
            return;
        }else{
            gameControl.setMarker(i)
        }
        display.updateBoard();
        gameControl.switchPlayer();
        display.checkTurn();
    }
    const clickNewRound = () =>{
        gameControl.setDefault(); //Sets player and winner values to default
        gameboard.newBoard();//Clears board array
        display.updateBoard();
        display.checkTurn();
    }
    return {
        clickNewRound,
        clickPlay
    }
}
const clickHandle = clickHandler();

display.updateBoard();