function setupTicTacToe() {
  const boardElem = document.getElementById('ttt-board');
  const statusElem = document.getElementById('ttt-status');
  const resetBtn = document.getElementById('ttt-reset');
  let board = Array(9).fill('');
  let currentPlayer = 'X';
  let gameActive = true;

  function renderBoard() {
    boardElem.innerHTML = '';
    board.forEach((cell, idx) => {
      const cellElem = document.createElement('div');
      cellElem.className = 'ttt-cell';
      cellElem.textContent = cell;
      cellElem.addEventListener('click', () => handleCellClick(idx));
      boardElem.appendChild(cellElem);
    });
  }

  function handleCellClick(idx) {
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    renderBoard();
    const winner = checkWinner();
    if (winner) {
      statusElem.textContent = `Player ${winner} wins!`;
      highlightWinner(winner);
      gameActive = false;
    } else if (board.every(cell => cell)) {
      statusElem.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusElem.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diags
    ];
    for (const pattern of winPatterns) {
      const [a,b,c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function highlightWinner(winner) {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const pattern of winPatterns) {
      const [a,b,c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const cells = boardElem.children;
        [a,b,c].forEach(i => cells[i].classList.add('winner'));
        break;
      }
    }
  }

  function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusElem.textContent = `Player X's turn`;
    renderBoard();
  }

  resetBtn.onclick = resetGame;
  renderBoard();
}