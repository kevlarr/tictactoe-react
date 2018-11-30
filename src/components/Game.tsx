import './game.scss';
import * as React from 'react';
import Board from './Board';
import { Cell, PlayState, Token, Round } from '../types';

interface Props {
};

interface State {
    rounds: Array<Round>;
    roundNumber: number;
    playState: PlayState;
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
            playState: PlayState.Playing,
        };
    }

    /**
     * Updates round number and play state, but defers updating rounds
     * themselves until it's necessary to
     */
    clickRound(roundNumber: number) {
        this.setState({
            roundNumber,
            playState: PlayState.Playing,
        });
    }

    /**
     * If a cell can be played, adds a Token and updates rounds
     * and play state
     */
    clickBoard(i: number) {
        const rounds = this.state.rounds.slice(0, this.state.roundNumber + 1);
        let { token, cells } = rounds[rounds.length - 1];

        if (this.state.playState === PlayState.Won || cells[i]) { return; }

        cells = cells.slice();
        cells[i] = token;

        const playState = this.newPlayState(cells);
        let nextToken = token;

        if (playState === PlayState.Playing) {
            nextToken = token === Token.X ? Token.O : Token.X;
        }

        this.setState({
            rounds: [...rounds, { cells, token: nextToken }],
            roundNumber: rounds.length,
            playState,
        });
    }

    /**
     * Determines if the board is a win or a draw. Requires passing in the cells
     * to allow for calling this prior to `setState` finishing.
     *
     * For a small 3x3 board, checking every combination on each move is probably
     * a little cleaner (and less breakable) than figuring out which cells to check.
     */
    newPlayState(cells: Array<Token | null>): PlayState {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
                return PlayState.Won;
            }
        }

        if (cells.filter(c => !!c).length === 9) {
            return PlayState.Draw;
        }

        return PlayState.Playing;
    }

    render() {
        const rounds = this.state.rounds;
        const { cells, token } = rounds[this.state.roundNumber];
        let msg;

        switch (this.state.playState) {
            case PlayState.Won:  msg = `${token} won!`; break;
            case PlayState.Draw: msg = 'Draw'; break;
            default: msg = `Place '${token}'`;
        }

        const history = rounds.map((round, move) => (
            <li key={`move-${move}`} className='history-item'>
                <a className='item-link' onClick={() => this.clickRound(move)}>
                    {round.token}
                </a>
            </li>
        )).slice(0, this.state.roundNumber);

        return (
            <div className='Game'>
                <h1 className='play-prompt'>{msg}</h1>

                <Board cells={cells} onClick={(i: number) => this.clickBoard(i)} />

                <div className='game-info'>
                    <div className='game-history'>
                        <span className='history-label'>Go back to...</span>
                        <ol className='history-list'>{...history}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
