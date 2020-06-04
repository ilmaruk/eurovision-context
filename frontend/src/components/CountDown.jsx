import React from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownView = ({ expiryTimestamp }) => {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '100px'}}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
        </div>
    );
}

export default CountdownView;
