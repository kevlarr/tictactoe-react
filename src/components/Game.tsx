import './game.scss';
import * as React from 'react';
import Board from './Board';
import { Cell, Token, Round } from '../types';

interface Props {
};

interface State {
    /**
     * The history of the state of cells, including most recent.
     * The "grid" of the game looks like...
     *   0  1  2
     *   3  4  5
     *   6  7  8
     */
    rounds: Array<Round>;

    /**
     * The current round to display.
     */
    roundNumber: number;

    /**
     * Whether or not the game has been won
     */
    won: boolean;
}

class Game extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const cells = Array<Cell>(9);
        const round = { cells, token: Token.X };

        for (let i = 0; i < 9; i++) { cells[i] = null };

        this.state = {
            rounds: [round],
            roundNumber: 0,
            won: false,
        };
    }

    /**
     * Updates game to display given round
     */
    clickMove(roundNumber: number) {
        this.setState({ roundNumber, won: false });
    }

    /**
     * If a cell can be played, adds a Token and checks if won
     */
    clickBoard(i: number) {
        const rounds = this.state.rounds.slice(0, this.state.roundNumber + 1);
        let { token, cells } = rounds[rounds.length - 1];

        if (this.state.won || cells[i]) { return; }

        cells = cells.slice();

        let nextToken = token;
        let won: boolean = this.state.won;

        cells[i] = token;

        if (this.moveWon(cells)) {
            won = true;
        } else {
            nextToken = token === Token.X ? Token.O : Token.X;
        }

        this.setState({
            rounds: [...rounds, { cells, token: nextToken }],
            roundNumber: rounds.length,
            won,
        });
    }

    /**
     * Determines if the set of cells has a winner. Requires passing in the cells
     * to allow for calling this prior to `setState` finishing.
     *
     * For a small 3x3 board, checking every combination on each move is probably
     * a little cleaner (and less breakable) than figuring out which cells to check.
     */
    moveWon(cells: Array<Token | null>): boolean {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
                return true;
            }
        }

        return false;
    }

    render() {
        const rounds = this.state.rounds;
        const { cells, token } = rounds[this.state.roundNumber];
        const msg = this.state.won ?  `${token} won!` : `Next player: ${token}`;

        const moves = rounds.map((round, move) => (
            <li key={`move-${move}`}>
                <button onClick={() => this.clickMove(move)}>
                    {move ? `Go to move #${move}` : 'Go to game start'}
                </button>
            </li>
        )).slice(0, this.state.roundNumber);

        return (
            <div className='Game'>
                <h1>tic tac toe</h1>
                <div className='game-board'>
                    <Board cells={cells} onClick={(i: number) => this.clickBoard(i)} />
                </div>
                <div className='game-info'>
                    <div className='prompt-message'>{msg}</div>
                    <ol>{...moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
