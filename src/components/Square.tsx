import * as React from 'react';

interface Props {
    value: string | null;
    onClick: () => void;
}

const Square = (props: Props) => (
    <button className='Square' onClick={props.onClick}>
        {props.value}
    </button>
);

export default Square;
