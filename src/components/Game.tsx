import * as React from 'react';
import Board from './Board';

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <h1>Welcome to tix</h1>
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
