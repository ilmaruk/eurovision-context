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
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            {/*<button onClick={() => {*/}
            {/*    // Restarts to 5 minutes timer*/}
            {/*    const time = new Date();*/}
            {/*    time.setSeconds(time.getSeconds() + 180);*/}
            {/*    restart(time)*/}
            {/*}}>Restart</button>*/}
        </div>
    );
}

export default CountdownView;
