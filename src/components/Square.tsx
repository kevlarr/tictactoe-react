import './square.scss';
import * as React from 'react';
import { Cell } from '../types';

interface Props {
    value: Cell;
    onClick: () => void;
}

export const Square = (props: Props) => (
    <div className='Square' onClick={props.onClick}>
        <span className='token'>{props.value}</span>
    </div>
);

export default Square;
