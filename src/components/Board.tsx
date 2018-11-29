import './board.scss';
import * as React from 'react';
import Square from './Square';
import { Token, Cell } from '../types';

interface Props {
    cells: Array<Cell>;
    onClick: (i: number) => void;
};

function renderSquare(props: Props, i: number) {
    return (
        <Square
            value={props.cells[i]}
            onClick={() => props.onClick(i)}
        />
    );
}

export const Board = (props: Props) => {
    const rows = [0, 1, 2].map(i => (
        <div key={i} className='board-row'>
            {renderSquare(props, 3 * i)}
            {renderSquare(props, 3 * i + 1)}
            {renderSquare(props, 3 * i + 2)}
        </div>
    ));

    return (
        <div className='Board'>{...rows}</div>
    );
};

export default Board;
