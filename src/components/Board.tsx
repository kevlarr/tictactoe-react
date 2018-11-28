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
};

class Board extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const cells = Array<Token | null>(9);

        for (let i = 0; i < 9; i++) { cells[i] = null };

        this.state = { cells, currentToken: Token.X };
    }

    handleClick(i: number) {
        if (this.state.cells[i]) { return; }

        const token = this.state.currentToken;
        const cells = this.state.cells.slice();
        cells[i] = token;
        this.setState({ cells, currentToken: token === Token.X ? Token.O : Token.X });
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
        const rows = [0, 1, 2].map(i => (
            <div key={i} className='board-row'>
                {this.renderSquare(3 * i)}
                {this.renderSquare(3 * i + 1)}
                {this.renderSquare(3 * i + 2)}
            </div>
        ));

        return (
            <div className='Board'>
                <div className='prompt-message'>Next player: {this.state.currentToken}</div>
                {...rows}
            </div>
        );
    }
}

export default Board;
