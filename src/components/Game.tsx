import './game.scss';
import * as React from 'react';
import Board from './Board';
import { Token, Cell } from '../types';

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
    history: Array<Array<Cell>>;

    /**
     * The token for the current "round"
     */
    currentToken: Token;

    /**
     * Whether or not the game has been won
     */
    won: boolean;
}

class Game extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const cells = Array<Cell>(9);

        for (let i = 0; i < 9; i++) { cells[i] = null };

        this.state = {
            currentToken: Token.X,
            history: [cells],
            won: false,
        };
    }

    handleClick(i: number) {
        const history = this.state.history;
        let cells = history[history.length - 1];

        if (this.state.won || cells[i]) { return; }

        cells = cells.slice();

        const token = this.state.currentToken;
        let nextToken = token;
        let won: boolean = this.state.won;

        cells[i] = token;

        if (this.moveWon(cells)) {
            won = true;
        } else {
            nextToken = token === Token.X ? Token.O : Token.X;
        }

        this.setState({ won, history: [...history, cells], currentToken: nextToken });
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
        const history = this.state.history;
        const cells = history[history.length - 1];
        const msg = this.state.won ?
            `${this.state.currentToken} won!` :
            `Next player: ${this.state.currentToken}`;

        return (
            <div className='Game'>
                <h1>tic tac toe</h1>
                <div className='game-board'>
                    <Board cells={cells} onClick={(i: number) => this.handleClick(i)} />
                </div>
                <div className='game-info'>
                    <div className='prompt-message'>{msg}</div>
                    <ol>{/* history */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
