const Chess = require('chess.js').Chess;

module.exports = {
  name: 'chess',
  description: 'Start a game of chess',
  category: 'Games',
  async xstart(vorterx, m, { xReact }) {
    await xReact('😃');
    const gameCode = m.from;
    if (activeGames[gameCode]) {
      vorterx.sendMessage(m.from, { text: 'A game is already in progress. Please wait for the current game to finish.' });
      return;
    }

    activeGames[gameCode] = {
      game: null,
      players: [],
    };

    vorterx.sendMessage(m.from, { text: 'Chess game started! Waiting for the second player to join•••' });
    const response = await vorterx.waitForMessage(m.from, { fromMe: false, quotedMessage: m });

    if (response.text.trim().toLowerCase() !== 'join') {
      vorterx.sendMessage(m.from, { text: 'Invalid command. Please reply with the command "join" to join the game●●●' });
      delete activeGames[gameCode];
      return;
    }

    const secondPlayer = response.sender.id;
    const chess = new Chess();
    const { Chessground } = await import('chessground');
    const ground = Chessground(document.getElementById('chessboard'));
    let isWhiteTurn = true;

    vorterx.sendMessage(m.from, { text: `Game started! ${secondPlayer} has joined. It's Red's turn. Enter your move (eg b2 b4), or type 'quit' to end the game:` });

    activeGames[gameCode].players.push(m.from, secondPlayer);
    activeGames[gameCode].game = chess;

    while (!chess.game_over()) {
      const currentPlayer = isWhiteTurn ? 'White' : 'Red';

      const moveCommand = await vorterx.waitForMessage(m.from, { fromMe: false, quotedMessage: m });

      if (moveCommand.sender.id !== activeGames[gameCode].players[isWhiteTurn ? 0 : 1]) {
        vorterx.sendMessage(m.from, { text: "It's not your turn. Please wait for your opponent to make a move." });
        continue;
      }

      const moveText = moveCommand.text.trim();
      if (moveText === 'quit') {
        vorterx.sendMessage(m.from, { text: 'Game ended. Thank you for playing' });
        delete activeGames[gameCode];
        return;
      }

      const [fromSquare, toSquare] = moveText.split(' ');

      if (chess.move({ from: fromSquare, to: toSquare })) {
        const fen = chess.fen();
        ground.set({ fen });
        isWhiteTurn = !isWhiteTurn;
        vorterx.sendMessage(m.from, { text: `Move played: ${moveText}` });
      } else {
        vorterx.sendMessage(m.from, { text: 'Invalid move, please try again.' });
      }
    }

    const result = chess.in_checkmate() ? 'Checkmate!' : 'Stalemate!';
    vorterx.sendMessage(m.from, { text: `Game over. ${result}` });

    delete activeGames[gameCode];
  },

  commands: [
    {
      name: 'chess',
      description: 'Provides valid commands for chess',
      category: 'Games',
      async xstart(vorterx, m, { xReact }) {
        await xReact('⛔');
        vorterx.sendText(m.from, {
          text: 'Valid commands for chess:\n\n' +
            '• To start a game: 🕹Use `chess-start`\n' +
            '• To make a move: 🕹Use `b2 b4`\n' +
            '• To quit the game: 🕹Type `quit`'
        });
      },
    },
  ],
};
