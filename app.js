// Pawn: exact Cburnett/python-chess path (viewBox 0 0 45 45) — head, collar, base
const PAWN_SVG_PATH = 'M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z';

// Back-rank pieces: full SVG <g> from python-chess (Cburnett), fill→currentColor for CSS
const BACK_RANK_SVG = {
    wk: '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="currentColor" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z" fill="currentColor"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g>',
    wq: '<g fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12zM9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/></g>',
    wr: '<g fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23" fill="none" stroke-linejoin="miter"/></g>',
    wb: '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="currentColor" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke-linejoin="miter"/></g>',
    wn: '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" fill="currentColor"/><path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" fill="currentColor"/><path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" fill="currentColor"/><path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill="currentColor"/></g>',
    bk: '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="currentColor" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z" fill="currentColor"/><path d="M20 8h5" stroke-linejoin="miter"/><path d="M32 29.5s8.5-4 6.03-9.65C34.15 14 25 18 22.5 24.5l.01 2.1-.01-2.1C20 18 9.906 14 6.997 19.85c-2.497 5.65 4.853 9 4.853 9M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" stroke="currentColor"/></g>',
    bq: '<g fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26zM9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11 38.5a35 35 1 0 0 23 0" fill="none" stroke-linecap="butt"/><path d="M11 29a35 35 1 0 1 23 0M12.5 31.5h20M11.5 34.5a35 35 1 0 0 22 0M10.5 37.5a35 35 1 0 0 24 0" fill="none" stroke="currentColor"/></g>',
    br: '<g fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" stroke-linecap="butt"/><path d="M14 29.5v-13h17v13H14z" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" stroke-linecap="butt"/><path d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="miter"/></g>',
    bb: '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zm6-4c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" fill="currentColor" stroke-linecap="butt"/><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke-linejoin="miter"/></g>',
    bn: '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" fill="currentColor"/><path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" fill="currentColor"/><path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" fill="currentColor"/><path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill="currentColor"/><path d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z" fill="currentColor"/></g>'
};

let game;
let isFlipped = false;
let selectedPiece = null;
let moveHistory = [];
let bestMove = null; // { from, to, san? }

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

    updateRankFileLabels();
    updateBoardPieces();
}

function updateRankFileLabels() {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = isFlipped ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1'];

    const fileEl = document.getElementById('fileLabels');
    const rankEl = document.getElementById('rankLabels');
    fileEl.innerHTML = '';
    rankEl.innerHTML = '';

    files.forEach(f => {
        const span = document.createElement('span');
        span.textContent = f;
        fileEl.appendChild(span);
    });
    ranks.forEach(r => {
        const span = document.createElement('span');
        span.textContent = r;
        rankEl.appendChild(span);
    });
}

function setBestMoveHint(loading, text) {
    const el = document.getElementById('bestMoveHint');
    const spinner = el.querySelector('.spinner');
    const hintText = el.querySelector('.hint-text');
    if (loading) {
        el.classList.add('loading');
        if (spinner) spinner.style.display = '';
        hintText.textContent = text || 'Loading best move…';
    } else {
        el.classList.remove('loading');
        if (spinner) spinner.style.display = 'none';
        hintText.textContent = text || '—';
    }
}

function updateMoveHistory() {
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

        square.classList.remove('last-move', 'best-move', 'highlight-move', 'place-piece');
        square.dataset.piece = '';

        let pieceEl = square.querySelector('.piece-char');
        if (pieceEl) pieceEl.remove();

        if (piece) {
            const pieceKey = piece.color + piece.type;
            pieceEl = document.createElement('span');
            pieceEl.className = 'piece-char piece-' + (piece.color === 'w' ? 'white' : 'black');
            pieceEl.setAttribute('aria-hidden', 'true');
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 45 45');
            svg.setAttribute('class', 'piece-svg');

            if (piece.type === 'p') {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', PAWN_SVG_PATH);
                path.setAttribute('fill', 'currentColor');
                path.setAttribute('stroke', 'currentColor');
                path.setAttribute('stroke-width', '1.5');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                svg.appendChild(path);
            } else {
                const gStr = BACK_RANK_SVG[pieceKey];
                if (gStr) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg">' + gStr + '</svg>', 'image/svg+xml');
                    const g = doc.documentElement.firstElementChild;
                    if (g) svg.appendChild(svg.ownerDocument.importNode(g, true));
                }
            }
            pieceEl.appendChild(svg);
            square.appendChild(pieceEl);
            square.dataset.piece = pieceKey;
            square.classList.add('place-piece');
            setTimeout(() => square.classList.remove('place-piece'), 280);
        }
    });

    if (moveHistory.length > 0) {
        const lastMove = moveHistory[moveHistory.length - 1];
        const fromSquare = document.querySelector(`[data-square="${lastMove.from}"]`);
        const toSquare = document.querySelector(`[data-square="${lastMove.to}"]`);
        if (fromSquare) fromSquare.classList.add('last-move');
        if (toSquare) toSquare.classList.add('last-move');
    }

    applyBestMoveHighlight();
    highlightBestMove();
}

function applyBestMoveHighlight() {
    document.querySelectorAll('.square').forEach(sq => sq.classList.remove('best-move', 'highlight-move'));
    if (bestMove && bestMove.from && bestMove.to) {
        const fromSq = document.querySelector(`[data-square="${bestMove.from}"]`);
        const toSq = document.querySelector(`[data-square="${bestMove.to}"]`);
        if (fromSq) fromSq.classList.add('best-move');
        if (toSq) toSq.classList.add('best-move');
    }
}

function startNewGame() {
    game = new Chess();
    isFlipped = false;
    bestMove = null;
    moveHistory = [];
    setBestMoveHint(true, 'Loading best move…');
    initializeBoard();
    document.getElementById('gameStatus').textContent = 'Game Started';
}

function flipBoard() {
    isFlipped = !isFlipped;
    initializeBoard();
    applyBestMoveHighlight();
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
            if (move.captured) dot.classList.add('capture');
            targetSquare.appendChild(dot);
        }
    });
}

function clearPossibleMoves() {
    document.querySelectorAll('.possible-move').forEach(dot => dot.remove());
}

function handleSquareClick(event) {
    const clickedSquare = event.target.closest('.square');
    if (!clickedSquare) return;
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
                bestMove = null;
                applyBestMoveHighlight();
                setBestMoveHint(true, 'Loading best move…');
                moveHistory.push(move);
                updateMoveHistory();
                updateBoardPieces();

                if (game.game_over()) {
                    const statusEl = document.getElementById('gameStatus');
                    const isDraw = game.in_draw();
                    statusEl.textContent = game.in_checkmate() ? 'Checkmate!' : isDraw ? 'Draw!' : 'Game Over';
                    document.querySelector('.status-card').classList.add(isDraw ? 'draw' : 'checkmate');
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
        bestMove = null;
        setBestMoveHint(true, 'Loading best move…');
        updateMoveHistory();
        updateBoardPieces();
        document.getElementById('gameStatus').textContent = 'Move undone.';
        document.querySelector('.status-card').classList.remove('checkmate', 'draw');
    }
}

function convertFEN(fen) {
    const fenParts = fen.split(' ');
    fenParts[3] = game.game_over() ? '-' : game.ep_square || '-';
    return fenParts.join(' ');
}

async function highlightBestMove() {
    if (game.game_over()) {
        setBestMoveHint(false, 'Game over.');
        return;
    }
    const fen = convertFEN(game.fen());
    try {
        const response = await fetch('https://chess-api.com/v1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fen, depth: 18 })
        });
        const data = await response.json();

        if (data && (data.move || (data.from && data.to))) {
            const moveStr = typeof data.move === 'string' ? data.move : '';
            const from = data.from || moveStr.slice(0, 2);
            const to = data.to || moveStr.slice(2, 4);
            bestMove = { from, to, san: data.san };
            applyBestMoveHighlight();
            const label = data.san ? `Best: ${data.san}` : `${from} → ${to}`;
            setBestMoveHint(false, label);
        } else {
            setBestMoveHint(false, 'No suggestion.');
            if (data) console.error('No move received from API', data);
        }
    } catch (error) {
        console.error('Error making API call:', error);
        setBestMoveHint(false, 'Could not load suggestion.');
    }
}

startNewGame();
