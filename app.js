/**
 * CHEAT CHESS — Ultimate Modern Chess Assistant & AI Engine
 * Full mobile-friendly touch drag & drop, real-time Stockfish engine,
 * local minimax fallback, SVG arrows, evaluation bar, audio synthesizer,
 * and time-travel history.
 */

// ============================================================================
// 1. CONSTANTS & PIECE GRAPHICS (Cburnett standard vectors)
// ============================================================================

const PAWN_SVG_PATH = 'M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z';

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

const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================

let game;
let isFlipped = false;
let selectedSquare = null;
let bestMove = null; // { from, to, san, eval, winChance, pv }
let moveHistory = []; // list of verbose move objects
let currentMoveIndex = -1; // -1 means live latest position, >= 0 means viewing historical step
let gameMode = 'assistant'; // 'assistant' | 'ai' | 'sandbox'
let aiColor = 'b'; // player is White, AI is Black by default
let aiDifficulty = 'medium'; // 'easy' | 'medium' | 'hard'
let engineDepth = 14;
let autoCheat = false;
let isSoundEnabled = true;
let isHapticsEnabled = true;
let showArrow = true;
let autoQueen = false;
let pendingPromotion = null; // { from, to }

// In-flight request controller & Cache
let engineAbortController = null;
const engineCache = new Map();

// Drag state
let isDragging = false;
let dragSourceSquare = null;
let dragElement = null;

// ============================================================================
// 3. SYNTHESIZED WEB AUDIO (No external assets required)
// ============================================================================

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSynthesizedSound(type) {
    if (!isSoundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        switch (type) {
            case 'move':
                // Warm wooden knock
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.09);
                break;
            case 'capture':
                // Snappy impact
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.13);
                break;
            case 'check':
                // Double alert chime
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.setValueAtTime(800, now + 0.08);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.26);
                break;
            case 'castle':
                // Double soft slide
                osc.type = 'sine';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
                osc.start(now);
                osc.stop(now + 0.19);
                break;
            case 'gameover':
                // Triumphant/dramatic cadence
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(261.63, now); // C4
                osc.frequency.setValueAtTime(329.63, now + 0.1); // E4
                osc.frequency.setValueAtTime(392.00, now + 0.2); // G4
                osc.frequency.setValueAtTime(523.25, now + 0.3); // C5
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.62);
                break;
        }
    } catch (e) {
        console.warn('Audio play error:', e);
    }
}

function triggerHaptic(duration = 15) {
    if (isHapticsEnabled && navigator.vibrate) {
        try {
            navigator.vibrate(duration);
        } catch (_) {}
    }
}

// ============================================================================
// 4. BOARD RENDERING & PIECE DOM CREATION
// ============================================================================

function createPieceElement(color, type) {
    const pieceKey = color + type;
    const pieceEl = document.createElement('span');
    pieceEl.className = 'piece-char piece-' + (color === 'w' ? 'white' : 'black');
    pieceEl.setAttribute('aria-hidden', 'true');
    pieceEl.dataset.pieceKey = pieceKey;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 45 45');

    if (type === 'p') {
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
    return pieceEl;
}

function initializeBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');

            const displayRow = isFlipped ? 7 - row : row;
            const displayCol = isFlipped ? 7 - col : col;

            const isLight = (displayRow + displayCol) % 2 === 0;
            square.classList.add(isLight ? 'white' : 'black');

            const algebraicNotation = String.fromCharCode(97 + displayCol) + (8 - displayRow);
            square.dataset.square = algebraicNotation;

            // Pointer event listeners (Touch + Mouse unified)
            square.addEventListener('pointerdown', handleSquarePointerDown);

            boardElement.appendChild(square);
        }
    }

    updateCoordinateLabels();
    renderBoardPieces();
}

function updateCoordinateLabels() {
    const files = isFlipped ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = isFlipped ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1'];

    const fileEl = document.getElementById('fileLabels');
    const rankEl = document.getElementById('rankLabels');
    fileEl.innerHTML = '';
    rankEl.innerHTML = '';

    files.forEach((f, idx) => {
        const span = document.createElement('span');
        span.textContent = f;
        const squareIsLight = (7 + idx) % 2 === 0;
        span.className = squareIsLight ? 'coord-on-light' : 'coord-on-dark';
        fileEl.appendChild(span);
    });

    ranks.forEach((r, idx) => {
        const span = document.createElement('span');
        span.textContent = r;
        const squareIsLight = idx % 2 === 0;
        span.className = squareIsLight ? 'coord-on-light' : 'coord-on-dark';
        rankEl.appendChild(span);
    });
}

function renderBoardPieces() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const algebraicSquare = square.dataset.square;
        const piece = game.get(algebraicSquare);

        square.classList.remove('selected', 'last-move', 'best-move', 'in-check');
        square.dataset.piece = '';

        const existingPiece = square.querySelector('.piece-char');
        if (existingPiece) existingPiece.remove();

        if (piece) {
            const pieceKey = piece.color + piece.type;
            const pieceEl = createPieceElement(piece.color, piece.type);
            square.appendChild(pieceEl);
            square.dataset.piece = pieceKey;
        }
    });

    // Check indicator
    if (game.in_check()) {
        const turn = game.turn();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const sq = String.fromCharCode(97 + col) + (row + 1);
                const p = game.get(sq);
                if (p && p.type === 'k' && p.color === turn) {
                    const kingSq = document.querySelector(`[data-square="${sq}"]`);
                    if (kingSq) kingSq.classList.add('in-check');
                    break;
                }
            }
        }
    }

    // Last move highlight
    if (moveHistory.length > 0) {
        const lastMove = currentMoveIndex >= 0 ? moveHistory[currentMoveIndex] : moveHistory[moveHistory.length - 1];
        if (lastMove) {
            const fromSq = document.querySelector(`[data-square="${lastMove.from}"]`);
            const toSq = document.querySelector(`[data-square="${lastMove.to}"]`);
            if (fromSq) fromSq.classList.add('last-move');
            if (toSq) toSq.classList.add('last-move');
        }
    }

    applyBestMoveHighlight();
    updatePlayerStatusBars();
}

function applyBestMoveHighlight() {
    document.querySelectorAll('.square').forEach(sq => sq.classList.remove('best-move'));
    if (bestMove && bestMove.from && bestMove.to) {
        const fromSq = document.querySelector(`[data-square="${bestMove.from}"]`);
        const toSq = document.querySelector(`[data-square="${bestMove.to}"]`);
        if (fromSq) fromSq.classList.add('best-move');
        if (toSq) toSq.classList.add('best-move');
    }
    renderBestMoveArrow();
}

// ============================================================================
// 5. SVG ARROW RENDERING
// ============================================================================

function renderBestMoveArrow() {
    const arrowGroup = document.getElementById('arrowGroup');
    arrowGroup.innerHTML = '';

    if (!showArrow || !bestMove || !bestMove.from || !bestMove.to || game.game_over()) {
        return;
    }

    const fromCoord = squareToCoordinates(bestMove.from);
    const toCoord = squareToCoordinates(bestMove.to);
    if (!fromCoord || !toCoord) return;

    // Center coordinates in 0-100 percentage space
    const x1 = (fromCoord.col + 0.5) * 12.5;
    const y1 = (fromCoord.row + 0.5) * 12.5;
    const x2 = (toCoord.col + 0.5) * 12.5;
    const y2 = (toCoord.row + 0.5) * 12.5;

    // Shorten line slightly at target so arrowhead is prominent
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len === 0) return;

    const shortenDist = 2.0;
    const endX = x2 - (dx / len) * shortenDist;
    const endY = y2 - (dy / len) * shortenDist;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('marker-end', 'url(#arrowHead)');

    arrowGroup.appendChild(line);
}

function squareToCoordinates(algebraic) {
    if (!algebraic || algebraic.length < 2) return null;
    const file = algebraic.charCodeAt(0) - 97; // 0..7
    const rank = parseInt(algebraic[1], 10) - 1; // 0..7

    const col = isFlipped ? 7 - file : file;
    const row = isFlipped ? rank : 7 - rank;
    return { col, row };
}

// ============================================================================
// 6. TOUCH & POINTER DRAG-AND-DROP + TAP-TO-MOVE
// ============================================================================

function handleSquarePointerDown(event) {
    // If viewing history, return to live first
    if (currentMoveIndex >= 0 && currentMoveIndex < moveHistory.length - 1) {
        jumpToMove(-1);
    }

    const clickedSquare = event.currentTarget;
    const algebraicNotation = clickedSquare.dataset.square;
    const pieceOnSquare = game.get(algebraicNotation);
    const currentTurn = game.turn();

    // Tap/Click to move logic
    if (selectedSquare) {
        if (selectedSquare === algebraicNotation) {
            // Unselect
            clearSelection();
            return;
        }

        // Try to move from selected to clicked
        const legalMoves = game.moves({ square: selectedSquare, verbose: true });
        const moveCandidate = legalMoves.find(m => m.to === algebraicNotation);

        if (moveCandidate) {
            executePlayerMove(selectedSquare, algebraicNotation);
            clearSelection();
            return;
        } else if (pieceOnSquare && pieceOnSquare.color === currentTurn) {
            // Switch selection to another own piece
            clearSelection();
            selectSquare(clickedSquare, algebraicNotation);
        } else {
            clearSelection();
            return;
        }
    } else {
        // No piece currently selected
        if (pieceOnSquare && pieceOnSquare.color === currentTurn) {
            // In AI mode, verify it's the human's turn
            if (gameMode === 'ai' && currentTurn === aiColor) {
                return;
            }

            selectSquare(clickedSquare, algebraicNotation);

            // Initiate Drag
            startDrag(event, clickedSquare, algebraicNotation);
        }
    }
}

function selectSquare(squareEl, algebraicNotation) {
    selectedSquare = algebraicNotation;
    squareEl.classList.add('selected');
    highlightPossibleMoves(algebraicNotation);
}

function clearSelection() {
    selectedSquare = null;
    document.querySelectorAll('.square').forEach(sq => sq.classList.remove('selected'));
    clearPossibleMoves();
}

function highlightPossibleMoves(algebraicSquare) {
    clearPossibleMoves();
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

function startDrag(event, squareEl, algebraicSquare) {
    isDragging = true;
    dragSourceSquare = algebraicSquare;

    const piece = game.get(algebraicSquare);
    if (!piece) return;

    dragElement = document.getElementById('dragGhost');
    dragElement.innerHTML = '';
    const pieceEl = createPieceElement(piece.color, piece.type);
    dragElement.appendChild(pieceEl);
    dragElement.classList.remove('hidden');

    moveDragGhost(event.clientX, event.clientY);

    // Dim source piece
    const srcPiece = squareEl.querySelector('.piece-char');
    if (srcPiece) srcPiece.style.opacity = '0.3';

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
}

function moveDragGhost(clientX, clientY) {
    if (dragElement) {
        dragElement.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%) scale(1.15)`;
    }
}

function onPointerMove(event) {
    if (!isDragging) return;
    moveDragGhost(event.clientX, event.clientY);
}

function onPointerUp(event) {
    if (!isDragging) return;
    cleanupDrag();

    // Determine target square under drop pointer
    const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
    const targetSquare = dropTarget ? dropTarget.closest('.square') : null;

    if (targetSquare && dragSourceSquare) {
        const targetAlgebraic = targetSquare.dataset.square;
        if (targetAlgebraic && targetAlgebraic !== dragSourceSquare) {
            const legalMoves = game.moves({ square: dragSourceSquare, verbose: true });
            const moveCandidate = legalMoves.find(m => m.to === targetAlgebraic);

            if (moveCandidate) {
                executePlayerMove(dragSourceSquare, targetAlgebraic);
                clearSelection();
                return;
            }
        }
    }
}

function onPointerCancel() {
    cleanupDrag();
}

function cleanupDrag() {
    isDragging = false;
    if (dragElement) {
        dragElement.classList.add('hidden');
        dragElement.innerHTML = '';
    }
    if (dragSourceSquare) {
        const srcSquareEl = document.querySelector(`[data-square="${dragSourceSquare}"]`);
        if (srcSquareEl) {
            const srcPiece = srcSquareEl.querySelector('.piece-char');
            if (srcPiece) srcPiece.style.opacity = '1';
        }
    }
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerCancel);
}

// ============================================================================
// 7. MOVE EXECUTION & PROMOTION DIALOG
// ============================================================================

function executePlayerMove(from, to) {
    const piece = game.get(from);
    if (!piece) return;

    // Pawn promotion detection
    const isPawn = piece.type === 'p';
    const isPromoting = isPawn && ((piece.color === 'w' && to[1] === '8') || (piece.color === 'b' && to[1] === '1'));

    if (isPromoting) {
        if (autoQueen) {
            commitMove({ from, to, promotion: 'q' });
        } else {
            pendingPromotion = { from, to, color: piece.color };
            showPromotionModal(piece.color);
        }
    } else {
        commitMove({ from, to });
    }
}

function showPromotionModal(color) {
    const modal = document.getElementById('promotionModal');
    const choices = document.getElementById('promotionChoices');
    choices.innerHTML = '';

    const promoPieces = ['q', 'n', 'r', 'b'];
    promoPieces.forEach(type => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'promo-btn';
        btn.dataset.piece = type;
        btn.appendChild(createPieceElement(color, type));
        btn.onclick = () => {
            modal.classList.add('hidden');
            if (pendingPromotion) {
                commitMove({
                    from: pendingPromotion.from,
                    to: pendingPromotion.to,
                    promotion: type
                });
                pendingPromotion = null;
            }
        };
        choices.appendChild(btn);
    });

    modal.classList.remove('hidden');
}

function commitMove(moveData) {
    try {
        const move = game.move(moveData);
        if (!move) return;

        // Sound & Haptics
        if (game.in_check()) {
            playSynthesizedSound('check');
            triggerHaptic(30);
        } else if (move.captured) {
            playSynthesizedSound('capture');
            triggerHaptic(20);
        } else if (move.flags.includes('k') || move.flags.includes('q')) {
            playSynthesizedSound('castle');
            triggerHaptic(15);
        } else {
            playSynthesizedSound('move');
            triggerHaptic(12);
        }

        // If move was made after navigating past, truncate history
        if (currentMoveIndex >= 0 && currentMoveIndex < moveHistory.length - 1) {
            moveHistory = moveHistory.slice(0, currentMoveIndex + 1);
        }
        currentMoveIndex = -1;

        moveHistory.push(move);
        bestMove = null;

        renderBoardPieces();
        updateMoveHistoryTable();
        updateCapturedPieces();
        updateGameStatus();

        if (game.game_over()) {
            playSynthesizedSound('gameover');
            setBestMoveHint(false, 'Game Over');
            return;
        }

        // Fetch engine analysis for new state
        fetchBestMove();

        // Handle AI response if in AI mode
        if (gameMode === 'ai' && game.turn() === aiColor && !game.game_over()) {
            scheduleAiMove();
        }
    } catch (err) {
        console.error('Move error:', err);
    }
}

// ============================================================================
// 8. ENGINE & BEST MOVE INTELLIGENCE (Stockfish API + Local Minimax Fallback)
// ============================================================================

async function fetchBestMove() {
    if (game.game_over()) return;

    const currentFen = game.fen();
    setBestMoveHint(true, 'Computing…');

    // Abort pending previous request
    if (engineAbortController) {
        engineAbortController.abort();
    }
    engineAbortController = new AbortController();

    // Check Cache
    if (engineCache.has(currentFen)) {
        const cached = engineCache.get(currentFen);
        applyEngineResult(cached);
        return;
    }

    // Local instant heuristic first (Zero-latency fallback)
    const localEval = computeLocalMinimaxBestMove(game, 2);
    if (localEval && localEval.from && localEval.to) {
        bestMove = localEval;
        applyBestMoveHighlight();
        updateEvalBar(localEval.eval, localEval.winChance);
    }

    // Online Deep Stockfish API
    try {
        const fenSanitized = convertFEN(currentFen);
        const response = await fetch('https://chess-api.com/v1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fen: fenSanitized, depth: engineDepth }),
            signal: engineAbortController.signal
        });

        if (!response.ok) throw new Error(`API HTTP ${response.status}`);
        const data = await response.json();

        if (data && (data.move || (data.from && data.to))) {
            const moveStr = typeof data.move === 'string' ? data.move : '';
            const from = data.from || moveStr.slice(0, 2);
            const to = data.to || moveStr.slice(2, 4);

            const result = {
                from,
                to,
                san: data.san || `${from}→${to}`,
                eval: typeof data.eval === 'number' ? data.eval : 0,
                winChance: typeof data.winChance === 'number' ? data.winChance : 50,
                mate: data.mate,
                continuation: data.continuationArr || []
            };

            engineCache.set(currentFen, result);
            applyEngineResult(result);
        } else {
            throw new Error('Malformed engine response');
        }
    } catch (err) {
        if (err.name === 'AbortError') return;
        console.warn('Online engine request failed, using local minimax:', err);
        // Fallback already set via localEval
        if (localEval) {
            setBestMoveHint(false, `Best: ${localEval.san} (Local)`);
            updateEvalBar(localEval.eval, localEval.winChance);
        } else {
            setBestMoveHint(false, 'Analysis unavailable');
        }
    }
}

function applyEngineResult(res) {
    bestMove = res;
    applyBestMoveHighlight();

    const evalText = res.mate ? `Mate in ${res.mate}` : (res.eval >= 0 ? `+${res.eval.toFixed(2)}` : res.eval.toFixed(2));
    const label = `Best: ${res.san}`;
    setBestMoveHint(false, label, evalText, Math.round(res.winChance));

    updateEvalBar(res.eval, res.winChance, res.mate);
    updateEngineIntelTab(res);

    // Auto Cheat feature
    if (autoCheat && gameMode === 'assistant' && !game.game_over()) {
        setTimeout(() => {
            if (bestMove && bestMove.from && bestMove.to) {
                commitMove({ from: bestMove.from, to: bestMove.to, promotion: 'q' });
            }
        }, 350);
    }
}

function setBestMoveHint(loading, sanText, evalScore = '0.0', winChance = 50) {
    const spinner = document.getElementById('bestMoveSpinner');
    const textEl = document.getElementById('bestMoveSanText');
    const evalBadge = document.getElementById('evalPawnBadge');
    const winBadge = document.getElementById('winChanceBadge');

    if (loading) {
        if (spinner) spinner.style.display = 'inline-block';
        if (textEl) textEl.textContent = sanText || 'Analyzing…';
    } else {
        if (spinner) spinner.style.display = 'none';
        if (textEl) textEl.textContent = sanText || '—';
        if (evalBadge) evalBadge.textContent = `Eval: ${evalScore}`;
        if (winBadge) winBadge.textContent = `Win: ${winChance}%`;
    }
}

function updateEvalBar(evalNum, winChance, mate) {
    const fillEl = document.getElementById('evalBarFill');
    const scoreEl = document.getElementById('evalScoreText');
    const horizontalFill = document.getElementById('horizontalEvalFill');

    let whitePercent = 50;
    let scoreDisplay = '0.0';

    if (mate !== null && mate !== undefined) {
        whitePercent = mate > 0 ? 100 : 0;
        scoreDisplay = `M${Math.abs(mate)}`;
    } else if (typeof winChance === 'number') {
        whitePercent = Math.min(Math.max(winChance, 3), 97);
        scoreDisplay = evalNum >= 0 ? `+${evalNum.toFixed(1)}` : `${evalNum.toFixed(1)}`;
    } else if (typeof evalNum === 'number') {
        whitePercent = 50 + 50 * (2 / (1 + Math.exp(-0.004 * (evalNum * 100))) - 1);
        scoreDisplay = evalNum >= 0 ? `+${evalNum.toFixed(1)}` : `${evalNum.toFixed(1)}`;
    }

    if (fillEl) fillEl.style.height = `${whitePercent}%`;
    if (horizontalFill) horizontalFill.style.width = `${whitePercent}%`;
    if (scoreEl) scoreEl.textContent = scoreDisplay;

    const intelLabel = document.getElementById('intelEvalLabel');
    const intelWin = document.getElementById('intelWinRate');
    if (intelLabel) intelLabel.textContent = `Eval: ${scoreDisplay}`;
    if (intelWin) intelWin.textContent = `${Math.round(whitePercent)}% White`;
}

function updateEngineIntelTab(res) {
    const continuationEl = document.getElementById('engineContinuation');
    if (continuationEl) {
        if (res.continuation && res.continuation.length > 0) {
            continuationEl.textContent = res.continuation.slice(0, 8).join(' ');
        } else {
            continuationEl.textContent = res.san || 'No line available';
        }
    }
}

function convertFEN(fen) {
    const fenParts = fen.split(' ');
    fenParts[3] = game.game_over() ? '-' : game.ep_square || '-';
    return fenParts.join(' ');
}

// ============================================================================
// 9. LOCAL MINIMAX & EVALUATION ENGINE (Fast Resilient Fallback)
// ============================================================================

const PST_PAWN = [
    0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0
];

const PST_KNIGHT = [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50
];

function evaluateBoardState(chessInstance) {
    let totalScore = 0;
    const board = chessInstance.board();

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            const baseVal = PIECE_VALUES[piece.type] * 100;
            let pstVal = 0;
            const idx = r * 8 + c;

            if (piece.type === 'p') {
                pstVal = piece.color === 'w' ? PST_PAWN[idx] : PST_PAWN[63 - idx];
            } else if (piece.type === 'n') {
                pstVal = piece.color === 'w' ? PST_KNIGHT[idx] : PST_KNIGHT[63 - idx];
            }

            const val = baseVal + pstVal;
            totalScore += piece.color === 'w' ? val : -val;
        }
    }
    return totalScore;
}

function computeLocalMinimaxBestMove(chessInstance, depth) {
    const legalMoves = chessInstance.moves({ verbose: true });
    if (legalMoves.length === 0) return null;

    const isWhite = chessInstance.turn() === 'w';
    let bestVal = isWhite ? -Infinity : Infinity;
    let bestCandidate = legalMoves[0];

    for (const move of legalMoves) {
        chessInstance.move(move);
        const score = minimax(chessInstance, depth - 1, -Infinity, Infinity, !isWhite);
        chessInstance.undo();

        if (isWhite) {
            if (score > bestVal) {
                bestVal = score;
                bestCandidate = move;
            }
        } else {
            if (score < bestVal) {
                bestVal = score;
                bestCandidate = move;
            }
        }
    }

    const evalInPawns = bestVal / 100;
    const winChance = 50 + 50 * (2 / (1 + Math.exp(-0.004 * bestVal)) - 1);

    return {
        from: bestCandidate.from,
        to: bestCandidate.to,
        san: bestCandidate.san,
        eval: evalInPawns,
        winChance: Math.round(winChance),
        continuation: [bestCandidate.san]
    };
}

function minimax(chessInstance, depth, alpha, beta, isMaximizing) {
    if (depth === 0 || chessInstance.game_over()) {
        return evaluateBoardState(chessInstance);
    }

    const moves = chessInstance.moves();
    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const m of moves) {
            chessInstance.move(m);
            const val = minimax(chessInstance, depth - 1, alpha, beta, false);
            chessInstance.undo();
            maxEval = Math.max(maxEval, val);
            alpha = Math.max(alpha, val);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const m of moves) {
            chessInstance.move(m);
            const val = minimax(chessInstance, depth - 1, alpha, beta, true);
            chessInstance.undo();
            minEval = Math.min(minEval, val);
            beta = Math.min(beta, val);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

// ============================================================================
// 10. AI OPPONENT MODE
// ============================================================================

function scheduleAiMove() {
    setBestMoveHint(true, 'AI is thinking…');
    const delay = Math.floor(Math.random() * 300) + 400;

    setTimeout(() => {
        if (game.game_over() || game.turn() !== aiColor) return;

        if (bestMove && bestMove.from && bestMove.to) {
            commitMove({ from: bestMove.from, to: bestMove.to, promotion: 'q' });
        } else {
            // Local move fallback
            const legalMoves = game.moves({ verbose: true });
            if (legalMoves.length > 0) {
                const choice = legalMoves[Math.floor(Math.random() * legalMoves.length)];
                commitMove({ from: choice.from, to: choice.to, promotion: 'q' });
            }
        }
    }, delay);
}

// ============================================================================
// 11. TIME TRAVEL & MOVE HISTORY NAVIGATION
// ============================================================================

function updateMoveHistoryTable() {
    const tbody = document.getElementById('moveHistoryBody');
    tbody.innerHTML = '';

    if (moveHistory.length === 0) {
        tbody.innerHTML = '<div class="empty-history-notice">No moves yet. Make a move!</div>';
        return;
    }

    for (let i = 0; i < moveHistory.length; i += 2) {
        const row = document.createElement('div');
        row.className = 'history-row';

        const moveNum = document.createElement('span');
        moveNum.className = 'move-num';
        moveNum.textContent = `${Math.floor(i / 2) + 1}.`;
        row.appendChild(moveNum);

        // White move
        const whiteCell = document.createElement('span');
        whiteCell.className = 'move-cell';
        whiteCell.textContent = moveHistory[i].san;
        if (currentMoveIndex === i) whiteCell.classList.add('active-history-move');
        whiteCell.onclick = () => jumpToMove(i);
        row.appendChild(whiteCell);

        // Black move
        const blackCell = document.createElement('span');
        blackCell.className = 'move-cell';
        if (i + 1 < moveHistory.length) {
            blackCell.textContent = moveHistory[i + 1].san;
            if (currentMoveIndex === i + 1) blackCell.classList.add('active-history-move');
            blackCell.onclick = () => jumpToMove(i + 1);
        }
        row.appendChild(blackCell);

        tbody.appendChild(row);
    }

    // Auto-scroll to bottom of moves table
    const scrollPane = document.getElementById('moveHistoryContainer');
    if (scrollPane) scrollPane.scrollTop = scrollPane.scrollHeight;
}

function jumpToMove(index) {
    if (moveHistory.length === 0) return;

    if (index < -1 || index >= moveHistory.length) return;

    currentMoveIndex = index;
    const tempGame = new Chess();

    const targetMoves = index === -1 ? moveHistory : moveHistory.slice(0, index + 1);
    targetMoves.forEach(m => tempGame.move(m));

    // Update board with historical state without mutating live game
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
        const notation = sq.dataset.square;
        const p = tempGame.get(notation);
        const existing = sq.querySelector('.piece-char');
        if (existing) existing.remove();
        if (p) {
            sq.appendChild(createPieceElement(p.color, p.type));
        }
    });

    updateMoveHistoryTable();
    showToast(index === -1 ? 'Returned to live position' : `Viewing move ${index + 1}`);
}

// ============================================================================
// 12. CAPTURED PIECES & MATERIAL ADVANTAGE
// ============================================================================

function updateCapturedPieces() {
    const fullSet = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const currentCounts = { w: { p: 0, n: 0, b: 0, r: 0, q: 0 }, b: { p: 0, n: 0, b: 0, r: 0, q: 0 } };

    const board = game.board();
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece.type !== 'k') {
                currentCounts[piece.color][piece.type]++;
            }
        }
    }

    const whiteCaptured = []; // Black pieces taken by White
    const blackCaptured = []; // White pieces taken by Black

    let whiteMaterial = 0;
    let blackMaterial = 0;

    ['q', 'r', 'b', 'n', 'p'].forEach(t => {
        const whiteLost = fullSet[t] - currentCounts.w[t];
        const blackLost = fullSet[t] - currentCounts.b[t];

        for (let i = 0; i < blackLost; i++) whiteCaptured.push(t);
        for (let i = 0; i < whiteLost; i++) blackCaptured.push(t);

        whiteMaterial += currentCounts.w[t] * PIECE_VALUES[t];
        blackMaterial += currentCounts.b[t] * PIECE_VALUES[t];
    });

    const diff = whiteMaterial - blackMaterial;

    // Render trays
    const topCapturedEl = document.getElementById('topCaptured');
    const bottomCapturedEl = document.getElementById('bottomCaptured');
    const topAdvantageEl = document.getElementById('topAdvantage');
    const bottomAdvantageEl = document.getElementById('bottomAdvantage');

    // If board is normal (White at bottom), top is Black and bottom is White
    const bottomPieces = isFlipped ? blackCaptured : whiteCaptured;
    const topPieces = isFlipped ? whiteCaptured : blackCaptured;
    const bottomAdv = isFlipped ? -diff : diff;
    const topAdv = isFlipped ? diff : -diff;

    renderCapturedTray(topCapturedEl, topPieces, isFlipped ? 'w' : 'b');
    renderCapturedTray(bottomCapturedEl, bottomPieces, isFlipped ? 'b' : 'w');

    if (topAdvantageEl) topAdvantageEl.textContent = topAdv > 0 ? `+${topAdv}` : '';
    if (bottomAdvantageEl) bottomAdvantageEl.textContent = bottomAdv > 0 ? `+${bottomAdv}` : '';
}

function renderCapturedTray(container, piecesList, pieceColor) {
    if (!container) return;
    container.innerHTML = '';
    piecesList.forEach(t => {
        const span = document.createElement('span');
        span.appendChild(createPieceElement(pieceColor, t));
        container.appendChild(span);
    });
}

function updatePlayerStatusBars() {
    const topBar = document.getElementById('topPlayerBar');
    const bottomBar = document.getElementById('bottomPlayerBar');
    const currentTurn = game.turn();

    const topColor = isFlipped ? 'w' : 'b';
    const bottomColor = isFlipped ? 'b' : 'w';

    if (topBar) topBar.classList.toggle('active-turn', currentTurn === topColor);
    if (bottomBar) bottomBar.classList.toggle('active-turn', currentTurn === bottomColor);

    const topName = document.getElementById('topPlayerName');
    const topSub = document.getElementById('topPlayerSub');
    const topAvatar = document.getElementById('topAvatar');
    const bottomName = document.getElementById('bottomPlayerName');
    const bottomSub = document.getElementById('bottomPlayerSub');
    const bottomAvatar = document.getElementById('bottomAvatar');

    if (topName) topName.textContent = topColor === 'w' ? 'White' : 'Black';
    if (bottomName) bottomName.textContent = bottomColor === 'w' ? 'White' : 'Black';
    if (topAvatar) topAvatar.textContent = topColor === 'w' ? '♙' : '♟';
    if (bottomAvatar) bottomAvatar.textContent = bottomColor === 'w' ? '♙' : '♟';

    if (gameMode === 'ai') {
        if (topSub) topSub.textContent = topColor === aiColor ? 'Stockfish AI' : 'You';
        if (bottomSub) bottomSub.textContent = bottomColor === aiColor ? 'Stockfish AI' : 'You';
    } else {
        if (topSub) topSub.textContent = isFlipped ? 'Opponent' : 'Opponent';
        if (bottomSub) bottomSub.textContent = isFlipped ? 'You (Flipped)' : 'You';
    }
}

function updateGameStatus() {
    const statusEl = document.getElementById('gameStatusText');
    if (game.in_checkmate()) {
        const winner = game.turn() === 'w' ? 'Black' : 'White';
        statusEl.textContent = `Checkmate! ${winner} wins.`;
    } else if (game.in_draw()) {
        statusEl.textContent = 'Draw!';
    } else if (game.in_check()) {
        statusEl.textContent = `Check! ${game.turn() === 'w' ? 'White' : 'Black'} to move.`;
    } else {
        statusEl.textContent = `${game.turn() === 'w' ? 'White' : 'Black'} to move.`;
    }
}

// ============================================================================
// 13. UI CONTROLS & EVENT LISTENERS
// ============================================================================

function startNewGame() {
    game = new Chess();
    moveHistory = [];
    currentMoveIndex = -1;
    bestMove = null;
    clearSelection();
    initializeBoard();
    updateMoveHistoryTable();
    updateCapturedPieces();
    updateGameStatus();
    updateEvalBar(0, 50, null);
    fetchBestMove();
    showToast('New game started');

    if (gameMode === 'ai' && game.turn() === aiColor && !game.game_over()) {
        scheduleAiMove();
    }
}

function flipBoard() {
    isFlipped = !isFlipped;
    initializeBoard();
    updateCapturedPieces();
    updatePlayerStatusBars();
    showToast(`Board flipped: ${isFlipped ? 'Black' : 'White'} at bottom`);
}

function undoMove() {
    if (moveHistory.length === 0) return;

    if (gameMode === 'ai' && moveHistory.length >= 2) {
        // In AI mode, undo both AI and player moves
        game.undo();
        game.undo();
        moveHistory.pop();
        moveHistory.pop();
    } else {
        game.undo();
        moveHistory.pop();
    }

    currentMoveIndex = -1;
    bestMove = null;
    clearSelection();
    renderBoardPieces();
    updateMoveHistoryTable();
    updateCapturedPieces();
    updateGameStatus();
    fetchBestMove();
    showToast('Move undone');
}

function playBestMove() {
    if (game.game_over()) return;

    if (bestMove && bestMove.from && bestMove.to) {
        commitMove({ from: bestMove.from, to: bestMove.to, promotion: 'q' });
        showToast(`Cheat move played: ${bestMove.san}`);
    } else {
        showToast('Engine still thinking…');
    }
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 250);
    }, 2200);
}

// Setup Header & Button Event Listeners
function setupEventListeners() {
    // Mode Switcher
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameMode = btn.dataset.mode;

            const topSub = document.getElementById('topPlayerSub');
            if (topSub) {
                topSub.textContent = gameMode === 'ai' ? 'Stockfish AI' : 'Opponent';
            }
            showToast(`Mode switched to ${btn.textContent.trim()}`);

            if (gameMode === 'ai' && game.turn() === aiColor && !game.game_over()) {
                scheduleAiMove();
            }
        });
    });

    // Sound toggle
    const soundBtn = document.getElementById('soundToggleBtn');
    soundBtn.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        document.getElementById('soundOnIcon').classList.toggle('hidden', !isSoundEnabled);
        document.getElementById('soundOffIcon').classList.toggle('hidden', isSoundEnabled);
        showToast(isSoundEnabled ? 'Sound enabled' : 'Sound muted');
    });

    // Flip button
    document.getElementById('flipBtn').addEventListener('click', flipBoard);

    // Primary action buttons
    document.getElementById('newGameBtn').addEventListener('click', startNewGame);
    document.getElementById('undoBtn').addEventListener('click', undoMove);
    document.getElementById('autoPlayBestMoveBtn').addEventListener('click', playBestMove);

    // Auto cheat toggle
    const autoCheatBtn = document.getElementById('autoCheatToggleBtn');
    autoCheatBtn.addEventListener('click', () => {
        autoCheat = !autoCheat;
        document.getElementById('autoCheatLabel').textContent = autoCheat ? 'Auto: ON' : 'Auto: Off';
        autoCheatBtn.classList.toggle('btn-primary', autoCheat);
        autoCheatBtn.classList.toggle('btn-secondary', !autoCheat);
        showToast(`Auto-Cheat: ${autoCheat ? 'Enabled' : 'Disabled'}`);
        if (autoCheat && bestMove) {
            playBestMove();
        }
    });

    // History Stepper Buttons
    document.getElementById('stepStartBtn').addEventListener('click', () => jumpToMove(0));
    document.getElementById('stepPrevBtn').addEventListener('click', () => {
        const cur = currentMoveIndex === -1 ? moveHistory.length - 1 : currentMoveIndex;
        if (cur > 0) jumpToMove(cur - 1);
    });
    document.getElementById('stepNextBtn').addEventListener('click', () => {
        if (currentMoveIndex >= 0 && currentMoveIndex < moveHistory.length - 1) {
            jumpToMove(currentMoveIndex + 1);
        } else {
            jumpToMove(-1);
        }
    });
    document.getElementById('stepEndBtn').addEventListener('click', () => jumpToMove(-1));

    // Tabs
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            link.classList.add('active');
            const target = document.getElementById(link.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    // Engine Depth Chips
    document.querySelectorAll('.chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            engineDepth = parseInt(btn.dataset.depth, 10);
            const statusLbl = document.getElementById('engineStatusLabel');
            if (statusLbl) statusLbl.textContent = `Depth ${engineDepth}`;
            showToast(`Engine depth set to ${engineDepth}`);
            fetchBestMove();
        });
    });

    // Settings
    document.getElementById('settingShowArrow').addEventListener('change', (e) => {
        showArrow = e.target.checked;
        renderBestMoveArrow();
    });
    document.getElementById('settingAutoQueen').addEventListener('change', (e) => {
        autoQueen = e.target.checked;
    });
    document.getElementById('settingHaptics').addEventListener('change', (e) => {
        isHapticsEnabled = e.target.checked;
    });
    document.getElementById('settingAiDifficulty').addEventListener('change', (e) => {
        aiDifficulty = e.target.value;
        showToast(`AI difficulty: ${aiDifficulty}`);
    });
    document.getElementById('settingPlayerColor').addEventListener('change', (e) => {
        const val = e.target.value;
        const chosen = val === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : val;
        aiColor = chosen === 'w' ? 'b' : 'w';
        isFlipped = chosen === 'b';
        initializeBoard();
        showToast(`Playing as ${chosen === 'w' ? 'White' : 'Black'}`);
    });

    // FEN / PGN Modal
    const fenModal = document.getElementById('fenModal');
    document.getElementById('fenModalBtn').addEventListener('click', () => {
        document.getElementById('fenInput').value = game.fen();
        document.getElementById('pgnTextarea').value = game.pgn();
        fenModal.classList.remove('hidden');
    });
    document.getElementById('closeFenModalBtn').addEventListener('click', () => {
        fenModal.classList.add('hidden');
    });
    document.getElementById('copyFenBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(game.fen());
        showToast('FEN copied to clipboard');
    });
    document.getElementById('copyPgnBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(game.pgn());
        showToast('PGN copied to clipboard');
    });
    document.getElementById('loadFenBtn').addEventListener('click', () => {
        const fenStr = document.getElementById('fenInput').value.trim();
        const valid = game.load(fenStr);
        if (valid) {
            fenModal.classList.add('hidden');
            moveHistory = [];
            currentMoveIndex = -1;
            bestMove = null;
            clearSelection();
            renderBoardPieces();
            updateMoveHistoryTable();
            updateCapturedPieces();
            updateGameStatus();
            fetchBestMove();
            showToast('Position loaded successfully');
        } else {
            showToast('Invalid FEN string!');
        }
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        // Do not intercept if typing in an input or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key.toLowerCase()) {
            case 'b':
                playBestMove();
                break;
            case 'f':
                flipBoard();
                break;
            case 'z':
            case 'u':
                undoMove();
                break;
            case 'n':
                startNewGame();
                break;
            case 'arrowleft':
                const cur = currentMoveIndex === -1 ? moveHistory.length - 1 : currentMoveIndex;
                if (cur > 0) jumpToMove(cur - 1);
                break;
            case 'arrowright':
                if (currentMoveIndex >= 0 && currentMoveIndex < moveHistory.length - 1) {
                    jumpToMove(currentMoveIndex + 1);
                } else {
                    jumpToMove(-1);
                }
                break;
        }
    });

    // Window resize handler to reposition arrows correctly
    window.addEventListener('resize', () => {
        renderBestMoveArrow();
    });
}

// ============================================================================
// 14. BOOTSTRAP
// ============================================================================

setupEventListeners();
startNewGame();
