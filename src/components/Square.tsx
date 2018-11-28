import * as React from 'react';

interface Props {
    value: string | null;
    onClick: () => void;
}

class Square extends React.Component<Props, {}> {
    render() {
        return (
            <button className='Square' onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;
