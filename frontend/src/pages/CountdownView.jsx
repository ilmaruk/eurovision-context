import React, {useEffect}  from 'react';
import CountDown from '../components/CountDown';

const CountdownView = () => {

    useEffect(() => {
        document.title = 'Countdown';
    }, []);

    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);

    return (
        <>
            <div className="container">
                <h1 className="title">Countdown</h1>
                <CountDown expiryTimestamp={time}/>
            </div>
        </>
    );
};

export default CountdownView;
