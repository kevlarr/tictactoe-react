import * as React from 'react';
import './square.scss';

interface Props {
    value: string | null;
    onClick: () => void;
}

const Square = (props: Props) => (
    <div className='Square' onClick={props.onClick}>
        <span className='token'>{props.value}</span>
    </div>
);

export default Square;
