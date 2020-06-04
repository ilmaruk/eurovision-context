import React, {useEffect}  from 'react';
import CountDown from '../components/CountDown';

const CountdownView = () => {

    useEffect(() => {
        document.title = 'Countdown';
    }, []);

    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);

    return (
        <>
            <div className="container">
                <CountDown expiryTimestamp={time}/>
            </div>
        </>
    );
};

export default CountdownView;
