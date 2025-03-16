const gameBoard = (function (){
    let board = [
        { col1: '', col2: '', col3: '' },
        { col1: '', col2: '', col3: '' },
        { col1: '', col2: '', col3: '' }
    ]

    const getBoard = () => board;

    const printBoard = () => {
        console.table(board)
    }

    function placeMarker(rowIndex, colKey, marker) {
        if (board[rowIndex][colKey] === '') {
            board[rowIndex][colKey] = marker;
        } else {
            console.log("Cell is already occupied!");
            alert("Cell is already occupied!");
            gameControl.switchPlayer()
        }
        printBoard();
    }

    function winnerCheck () {
        let column1  = [];
        let column2 = [];
        let column3 = [];
        let row1 = [];
        let row2 = [];
        let row3 = [];
        let leftRightCross  = [board[0].col1, board[1].col2 , board[2].col3];
        let rightLeftCross = [board[0].col3, board[1].col2 , board[2].col1];

       board.forEach((row, index) => {
        if (index == 1){
            row2.push(row.col1, row.col2,row.col3)
            column1.push(row.col1)
            column2.push(row.col2)
            column3.push(row.col3)
        }
        if (index == 2){
            row3.push(row.col1,row.col2,row.col3)
            column1.push(row.col1)
            column2.push(row.col2)
            column3.push(row.col3)
        }
        if (index == 0){
            column1.push(row.col1)
            column2.push(row.col2)
            column3.push(row.col3)
            row1.push(row.col1, row.col2,row.col3)
        }
       })
       let possibleOutcomes = [column1,column2,column3,row1,row2,row3,leftRightCross,rightLeftCross]
  

        possibleOutcomes.forEach((outcome) => {
            // console.log(outcome);
            if (outcome.every(item => item === player.player1.value)){
                console.log('player 1 wins');
                player.player1.victory = true
               
                
                
            }
            else if (outcome.every((item) => item === player.player2.value)){
                console.log('player 2 wins');
                player.player2.victory = true
            }
        })

        
    }
    
    return {
        getBoard,
        printBoard,
        placeMarker,
        winnerCheck,
        
    }
})();



const player = (function () {
        const player1 = {
            name : 'player1',
            value : 'X',
            victory : false
          
        }
        const player2 = {
            name : 'player2',
            value : 'O',
            victory : false
        
        }
        return {
            player1,
            player2,
            
        }
    
})();




const gameControl = (function () {
    
    let firstPlayerPoint = 0
    let secondPlayerPoint = 0
    let playerTurn = player.player1;

    function switchPlayer() {
        if (playerTurn === player.player1) {
            playerTurn = player.player2;
            secondPlayerPoint;
        } else {
            playerTurn = player.player1;
            firstPlayerPoint++;
        }
    }

    function getPlayerTurn() {
        return playerTurn
    }

   

    const playRound = () => {

        function gameLoop() {
            gameUI.getBoardContent().turn.textContent = `It's ${gameControl.getPlayerTurn().name}'s turn!`;
            console.log(`It's ${playerTurn.name}'s turn!`);
            gameUI.interact();
        }

        // Start the game loop
        gameLoop();
    }

    return {
        playRound,
        switchPlayer,
        getPlayerTurn,
        
    }
})();

const game = gameControl.playRound


const  gameUI = (function (){

    const contents = {
        board : document.querySelectorAll('.box'),
        start : document.querySelector('#start'),
        reset : document.querySelector('#reset'),
        dialog : document.querySelector('dialog'),
        firstPlayer : document.querySelector('.player1'),
        secondPlayer : document.querySelector('.player2'),
        winner : document.querySelector('.winner'),
        inputNames : document.querySelector('dialog button'),
        firstPlayerInput : document.querySelector('.firstPLayerInput'),
        secondPlayerInput : document.querySelector('.secondPlayerInput'),
        turn : document.querySelector('.turn'),
        winner : document.querySelector('.winner')

    }
    board = Array.from(contents.board)
    contents.reset.addEventListener('click' , (reset))
    contents.start.addEventListener('click', () => {
        game();
        document.getElementById('start').style.display = 'none'
    })

    
    function display(){
        gameBoard.getBoard().forEach( (row , index) => {
            for (const key in row) {
                board.forEach((box) => {
                    if (box.dataset.id == key && box.dataset.index == index){
                        box.textContent = row[key]
                    }
                })   
            }
        })
    }
    let winner = undefined ;
    function interact (){
        board.forEach((box) => {
            box.addEventListener('click' , (e) => {
                let col = box.dataset.id
                let row = box.dataset.row
                gameBoard.placeMarker(row,col,gameControl.getPlayerTurn().value);
                // Refresh UI
                display(); 
                gameBoard.winnerCheck();
                if (player.player1.victory) {
                    winner = player.player1.victory;
                    
                    
                } 
                if (player.player2.victory) {
                    winner = player.player2.victory;
                  
                }
    
                if (winner === undefined) {
                    gameControl.switchPlayer();  // Only switch player after a valid move
                    contents.turn.textContent = `It's ${gameControl.getPlayerTurn().name}'s turn!`;
                    console.log(`It's ${gameControl.getPlayerTurn().name}'s turn!`);
                    
                    // game();  // Restart the loop
                } else {
                    contents.winner.textContent = `Winner: ${gameControl.getPlayerTurn().name}`
                    console.log(`Winner: ${gameControl.getPlayerTurn().name} !!!`);
                    console.log('GAME OVER');
                    
                }  
               
            })
        })
    }

    function reset(){
        gameBoard.getBoard().forEach((row) => {
            for (const key in row) {
                row[key] = ''
            }
            display();

        })
        if (gameControl.getPlayerTurn() == player.player2){
            gameControl.getPlayerTurn().victory = false;
            gameControl.switchPlayer()
        }
        gameControl.getPlayerTurn().victory = false;
        contents.turn.textContent =  `It's ${gameControl.getPlayerTurn().name}'s turn!`;
        console.log(`It's ${gameControl.getPlayerTurn().name}'s turn!`);
        winner = undefined
        contents.winner.textContent = '';
    }

    document.addEventListener('DOMContentLoaded' , () => {
        contents.dialog.showModal()
    })

    contents.inputNames.addEventListener('click', (e) => {
        e.preventDefault();
        contents.firstPlayer.textContent +=  contents.firstPlayerInput.value 
        contents.secondPlayer.textContent += contents.secondPlayerInput.value 
        player.player1.name = contents.firstPlayerInput.value
        player.player2.name = contents.secondPlayerInput.value
        contents.dialog.close()
    })

    const getBoardContent = () => contents;
    const getWinner = () => winner;

    return {
        display,
        interact,
        getBoardContent,
        getWinner
    }
}())

