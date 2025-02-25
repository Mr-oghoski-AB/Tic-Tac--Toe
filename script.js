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
    
    return {
        getBoard,
        printBoard,
        placeMarker
    }
})();



const player = (function () {
        const player1 = {
            name : 'player1',
            value : 'X',
          
        }
        const player2 = {
            name : 'player2',
            value : 'O',
        
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
        checkPlayerTurn();
        console.log(`its ${ playerTurn.name}'s turn !`);
        let row = prompt('choose row');
        let col = prompt('choose column')
        gameBoard.placeMarker(row,col,playerTurn.value)
        
   
    }

    return {
        playRound
    }
})();

const game = gameControl.playRound