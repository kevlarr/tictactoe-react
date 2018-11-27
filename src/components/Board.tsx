import * as React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() {
        const msg = 'Next player: X';

        const rows = [0, 1, 2].map(i => (
            <div key={i} className='board-row'>
                <Square />
                <Square />
                <Square />
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
