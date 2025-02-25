const PIECE_SYMBOLS = {
    'wp': '♙', 'wn': '♘', 'wb': '♗', 'wr': '♖', 'wq': '♕', 'wk': '♔',
    'bp': '♟', 'bn': '♞', 'bb': '♝', 'br': '♜', 'bq': '♛', 'bk': '♚'
};

let board;
let game;
let isFlipped = false;
let selectedPiece = null;
let moveHistory = [];

function initializeBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');

            const displayRow = isFlipped ? 7 - row : row;
            const displayCol = isFlipped ? 7 - col : col;

            square.classList.add((displayRow + displayCol) % 2 === 0 ? 'white' : 'black');

            const algebraicNotation = String.fromCharCode(97 + displayCol) + (8 - displayRow);
            square.dataset.square = algebraicNotation;

            square.addEventListener('click', handleSquareClick);
            boardElement.appendChild(square);
        }
    }

    updateBoardPieces();
}

function updateMoveHistory(move) {
    const moveHistoryElement = document.getElementById('moveHistory');
    moveHistoryElement.innerHTML = '';
    moveHistory.forEach((move, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${move.san}`;
        moveHistoryElement.appendChild(li);
    });
    moveHistoryElement.scrollTop = moveHistoryElement.scrollHeight;
}

function updateBoardPieces() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const algebraicSquare = square.dataset.square;
        const piece = game.get(algebraicSquare);

        square.textContent = '';
        square.dataset.piece = '';
        square.classList.remove('last-move');

        if (piece) {
            const pieceKey = piece.color + piece.type;
            const pieceSymbol = PIECE_SYMBOLS[pieceKey];

            if (pieceSymbol) {
                square.textContent = pieceSymbol;
                square.dataset.piece = pieceKey;
            }
        }
    });

    if (moveHistory.length > 0) {
        const lastMove = moveHistory[moveHistory.length - 1];
        const fromSquare = document.querySelector(`[data-square="${lastMove.from}"]`);
        const toSquare = document.querySelector(`[data-square="${lastMove.to}"]`);

        if (fromSquare) fromSquare.classList.add('last-move');
        if (toSquare) toSquare.classList.add('last-move');
    }
    highlightBestMove();
}

function startNewGame() {
    game = new Chess();
    isFlipped = false;
    initializeBoard();
    document.getElementById('gameStatus').textContent = 'Game Started';
}

function flipBoard() {
    isFlipped = !isFlipped;
    initializeBoard();
}

function highlightPossibleMoves(square) {
    clearPossibleMoves();

    const algebraicSquare = square.dataset.square;
    const moves = game.moves({ square: algebraicSquare, verbose: true });

    moves.forEach(move => {
        const targetSquare = document.querySelector(`[data-square="${move.to}"]`);
        if (targetSquare) {
            const dot = document.createElement('div');
            dot.classList.add('possible-move');
            targetSquare.appendChild(dot);
        }
    });
}

function clearPossibleMoves() {
    document.querySelectorAll('.possible-move').forEach(dot => dot.remove());
}

function highlightLastMove(from, to) {
    document.querySelectorAll('.square').forEach(square => square.classList.remove('highlight-move'));

    const fromSquare = document.querySelector(`[data-square="${from}"]`);
    const toSquare = document.querySelector(`[data-square="${to}"]`);

    if (fromSquare) fromSquare.classList.add('highlight-move');
    if (toSquare) toSquare.classList.add('highlight-move');
}

function handleSquareClick(event) {
    const clickedSquare = event.target;
    const algebraicNotation = clickedSquare.dataset.square;

    if (!selectedPiece) {
        const piece = game.get(algebraicNotation);
        if (piece && piece.color === (game.turn() === 'w' ? 'w' : 'b')) {
            selectedPiece = algebraicNotation;
            clickedSquare.classList.add('selected');
            highlightPossibleMoves(clickedSquare);
        }
    } else {
        try {
            const move = game.move({
                from: selectedPiece,
                to: algebraicNotation,
                promotion: 'q'
            });

            if (move) {
                moveHistory.push(move);
                updateMoveHistory(move);
                highlightLastMove(move.from, move.to);
                updateBoardPieces();

                if (game.game_over()) {
                    document.getElementById('gameStatus').textContent =
                        game.in_checkmate() ? 'Checkmate!' :
                        game.in_draw() ? 'Draw!' : 'Game Over';
                }
            }
        } catch (error) {
            console.log('Invalid move', error);
        }

        clearPossibleMoves();
        document.querySelectorAll('.square').forEach(sq => sq.classList.remove('selected'));
        selectedPiece = null;
    }
}

function undoMove() {
    if (moveHistory.length > 0) {
        game.undo();
        moveHistory.pop();
        updateMoveHistory();
        updateBoardPieces();
        document.getElementById('gameStatus').textContent = 'Move undone.';
    }
}

function convertFEN(fen) {
    const fenParts = fen.split(' ');
    fenParts[3] = game.game_over() ? '-' : game.ep_square || '-';
    return fenParts.join(' ');
}

async function highlightBestMove() {
    const fen = convertFEN(game.fen());
    try {
        const response = await fetch('https://chess-api.com/v1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fen, depth: 18 })
        });
        const data = await response.json();

        if (data && data.move) {
            const { from, to } = data;
            highlightLastMove(from, to);
        } else {
            console.error('No move received from API', data);
        }
    } catch (error) {
        console.error('Error making API call:', error);
    }
}

startNewGame();
