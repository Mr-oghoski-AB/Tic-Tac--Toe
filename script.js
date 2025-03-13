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
    let playerTurn;

    function checkPlayerTurn (){

        if (firstPlayerPoint > secondPlayerPoint) {
            playerTurn = player.player2
            secondPlayerPoint++
        }
        else{
            playerTurn = player.player1
            firstPlayerPoint++
        }
    }

    const playRound = () => {
        let winner ;
       

        function gameLoop() {
            checkPlayerTurn();
            console.log(`It's ${playerTurn.name}'s turn!`);

            // Wait for user input
            let row = prompt('Choose row');
            let col = prompt('Choose column');

            gameBoard.placeMarker(row, col, playerTurn.value);
            gameBoard.winnerCheck();
            // console.log(gameBoard.winnerCheck.winner);
            
            // Refresh UI
            gameUI.display();  

            if (player.player1.victory) {
                winner = player.player1.victory;
            } 
            if (player.player2.victory) {
                winner = player.player2.victory;
            }

            if (winner === undefined) {
                setTimeout(gameLoop, 100); // Allow UI to refresh before the next iteration
            } else {
                console.log(`Winner: ${playerTurn.name}`);
            }
        }

        // Start the game loop
        gameLoop();


        if ( winner !== undefined){
            console.log('GAME OVER')
        } 
   
    }

    return {
        playRound
    }
})();

const game = gameControl.playRound


const  gameUI = (function (){

    const contents = {
        board : document.querySelectorAll('.box'),
        start : document.querySelector('#start'),
        reset : document.querySelector('#reset')
        

    }

    function display(){
        gameBoard.getBoard().forEach( (row , index) => {
            for (const key in row) {
                contents.board.forEach((box) => {
                    if (box.dataset.id == key && box.dataset.index == index){
                        box.textContent = row[key]
                        // `console.log(box.textContent);`
                    }
                })   
            }
        })
    }

    return {
        display
    }
}())
