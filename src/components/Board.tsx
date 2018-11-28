import * as React from 'react';
import Square from './Square';
import './board.scss';

// FIXME move this to other location?
enum Token {
    X = 'X',
    O = 'O',
};

interface Props {
};

interface State {
    /**
     * The "grid" of the game
     *   0  1  2
     *   3  4  5
     *   6  7  8
     */
    cells: Array<Token | null>;
    currentToken: Token;
    won: boolean;
};

class Board extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const cells = Array<Token | null>(9);

        for (let i = 0; i < 9; i++) { cells[i] = null };

        this.state = { cells, won: false, currentToken: Token.X };
    }

    handleClick(i: number) {
        if (this.state.won || this.state.cells[i]) { return; }

        const cells = this.state.cells.slice();
        const token = this.state.currentToken;
        let won: boolean = this.state.won;
        let nextToken = token;

        cells[i] = token;

        if (this.moveWon(cells)) {
            won = true;
        } else {
            nextToken = token === Token.X ? Token.O : Token.X;
        }

        this.setState({ cells, won, currentToken: nextToken });
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

    renderSquare(i: number) {
        return (
            <Square
                value={this.state.cells[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const msg = this.state.won ?
            `${this.state.currentToken} won!` :
            `Next player: ${this.state.currentToken}`;

        const rows = [0, 1, 2].map(i => (
            <div key={i} className='board-row'>
                {this.renderSquare(3 * i)}
                {this.renderSquare(3 * i + 1)}
                {this.renderSquare(3 * i + 2)}
            </div>
        ));

        return (
            <div className='Board'>
                <div className='prompt-message'>{msg}</div>
                {...rows}
            </div>
        );
    }
}

export default Board;
