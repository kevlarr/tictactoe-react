import * as React from 'react';
import Board from './Board';
import './game.scss';

class Game extends React.Component {
    render() {
        return (
            <div className='Game'>
                <h1>tic tac toe</h1>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{/* status */}</div>
                    <ol>{/* history */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
