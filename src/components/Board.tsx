import * as React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() {
        const msg = 'Next player: X';

        const rows = [0, 1, 2].map(i => (
            <div className='board-row'>
                <Square value={(i * 3) + 0} />
                <Square value={(i * 3) + 1} />
                <Square value={(i * 3) + 2} />
            </div>
        ));

        return (
            <div>
                <div className='prompt-message'>{msg}</div>
                {...rows}
            </div>
        );
    }
}

export default Board;
