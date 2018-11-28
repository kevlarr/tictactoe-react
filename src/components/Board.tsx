import * as React from 'react';
import Square from './Square';

// FIXME move this to other location
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
    squares: Array<Token | null>;
};

class Board extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const squares = Array<Token | null>(9);

        for (let i = 0; i < 9; i++) { squares[i] = null };

        this.state = { squares };
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = Token.X;
        this.setState({ squares });
    }

    renderSquare(i: number) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const msg = 'Next player: X';

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
