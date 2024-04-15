import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
    const { bgcolor, experience } = props;

    const containerStyles = {
        height: '20px',
        width: '200px', // Adjust this width as needed to make the bar longer or whatever
        backgroundColor: '#e0e0de',
        borderRadius: '50px',
        margin: '0 10px',
    };

    return (
        <div style={containerStyles}>
            <div className="filler" style={{ width: `${completed}%`, backgroundColor: bgcolor }}>
                {/*<span className="label">{`${completed}`}</span>*/}
            </div>
        </div>
    );
};

export default ProgressBar;
